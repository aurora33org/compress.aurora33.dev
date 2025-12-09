# Plan Futuro: Migración a Next.js 14 con Sistema MicroSaaS

**Objetivo**: Documento de roadmap para migrar la aplicación a Next.js 14 con capacidades completas de microSaaS, autenticación, tiers de suscripción, y pagos.

**Estado Actual**: Express.js + Vanilla JS + En-memory state
**Estado Futuro**: Next.js 14 + React + PostgreSQL + NextAuth + Stripe

**Estimación Total**: 15-20 horas
**Prioridad**: FASE 2 (después de consolidar la arquitectura actual)

---

## Stack Final Propuesto

- **Frontend**: Next.js 14 (App Router) + React 18 + TypeScript
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL (Neon/Supabase recomendado)
- **Auth**: NextAuth.js v5 (Auth.js)
- **Payments**: Stripe
- **Storage**: Uploadthing o S3 (para backups)
- **Styling**: Tailwind CSS 3 (mantener config actual)
- **Processing**: Sharp (mantener lógica actual)

---

## Sistema de Tiers Propuesto

| Feature | Free | Pro ($9/mo) | Enterprise ($49/mo) |
|---------|------|-------------|---------------------|
| Jobs simultáneos | 1 | 3 | 10 |
| Imágenes/job | 5 | 20 | 100 |
| Tamaño máx/imagen | 5MB | 25MB | 100MB |
| Velocidad compresión | Normal (5s) | Fast (3s) | Fast/Maximum |
| Backup | No | 7 días | 30 días |
| Historial jobs | 7 días | 30 días | Ilimitado |
| API access | No | No | Sí |

### Configuraciones de Compresión por Modo

```typescript
// NORMAL (Free tier - máxima compresión)
{
  webp: { quality: 80, effort: 4 },       // ~5-7 segundos
  jpeg: { quality: 80, mozjpeg: true },
  png: { compressionLevel: 9, quality: 80 }
}

// FAST (Pro tier - balance)
{
  webp: { quality: 85, effort: 2 },       // ~2-3 segundos
  jpeg: { quality: 85, mozjpeg: false },
  png: { compressionLevel: 6, quality: 85 }
}

// MAXIMUM (Enterprise - máxima calidad)
{
  webp: { quality: 75, effort: 6 },       // ~10-15 segundos
  jpeg: { quality: 75, mozjpeg: true },
  png: { compressionLevel: 9, quality: 75 }
}
```

---

## Arquitectura de Archivos Propuesta

```
nextjs-compressor/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── billing/page.tsx
│   │   └── layout.tsx (protected)
│   ├── pricing/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── jobs/
│   │   │   ├── route.ts (POST create)
│   │   │   └── [jobId]/
│   │   │       ├── upload/route.ts
│   │   │       ├── process/route.ts
│   │   │       ├── status/route.ts
│   │   │       └── download/route.ts
│   │   ├── stripe/
│   │   │   ├── create-checkout/route.ts
│   │   │   ├── create-portal/route.ts
│   │   │   └── webhook/route.ts
│   │   └── health/route.ts
│   ├── page.tsx (Home)
│   ├── layout.tsx (Root)
│   └── globals.css
├── components/
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ImageUploader.tsx (client)
│   │   ├── CompressionSettings.tsx (client)
│   │   ├── ProcessingView.tsx (client)
│   │   ├── DownloadView.tsx (client)
│   │   ├── FormatGuide.tsx
│   │   └── FAQ.tsx
│   ├── dashboard/
│   │   ├── JobHistory.tsx
│   │   ├── UsageStats.tsx
│   │   └── QuickCompress.tsx
│   ├── pricing/
│   │   └── PricingCards.tsx
│   ├── ui/ (shadcn/ui)
│   ├── Navigation.tsx
│   └── Footer.tsx
├── lib/
│   ├── services/
│   │   ├── image-processor.ts (migrado de Sharp actual)
│   │   ├── storage-service.ts (NUEVO - S3/Uploadthing)
│   │   ├── job-processor.ts (NUEVO - background jobs)
│   │   └── zip-service.ts (migrado de archiver actual)
│   ├── auth.ts (NextAuth config)
│   ├── db.ts (Prisma client)
│   ├── stripe.ts (Stripe client)
│   ├── compression-config.ts
│   ├── tier-limits.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── middleware.ts
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  password      String?   // bcrypt hash
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  subscription  Subscription?
  jobs          Job[]
  usage         Usage[]

  @@index([email])
}

model Subscription {
  id                   String   @id @default(cuid())
  userId               String   @unique
  tier                 String   @default("free") // free, pro, enterprise
  status               String   @default("active")
  stripeCustomerId     String?  @unique
  stripeSubscriptionId String?  @unique
  stripeCurrentPeriodEnd DateTime?
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

enum JobStatus {
  CREATED
  UPLOADING
  UPLOADED
  PROCESSING
  COMPLETED
  FAILED
}

model Job {
  id              String    @id @default(cuid())
  userId          String
  status          JobStatus @default(CREATED)

  // Settings
  format          String    // webp, jpeg, png
  quality         Int       @default(80)
  resizeWidth     Int?
  resizeHeight    Int?
  compressionMode String    @default("normal")

  // Stats
  totalFiles      Int       @default(0)
  processedCount  Int       @default(0)
  originalSize    BigInt    @default(0)
  compressedSize  BigInt    @default(0)
  progress        Int       @default(0)

  // Metadata
  error           String?
  zipUrl          String?
  expiresAt       DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  completedAt     DateTime?

  user  User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  files File[]

  @@index([userId, createdAt])
  @@index([status])
  @@index([expiresAt])
}

model File {
  id               String   @id @default(cuid())
  jobId            String

  originalName     String
  originalSize     BigInt
  originalUrl      String?

  processedName    String?
  processedSize    BigInt?
  processedUrl     String?
  reduction        Int?

  createdAt        DateTime @default(now())
  job              Job      @relation(fields: [jobId], references: [id], onDelete: Cascade)

  @@index([jobId])
}

model Usage {
  id                String   @id @default(cuid())
  userId            String
  date              DateTime @default(now())
  jobsCreated       Int      @default(0)
  imagesProcessed   Int      @default(0)
  bytesProcessed    BigInt   @default(0)

  @@unique([userId, date])
  @@index([userId])
}

// NextAuth tables (generadas por PrismaAdapter)
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

---

## Plan de Migración: 6 Fases

### Fase 1: Setup Base (2-3 horas)

```bash
# Crear proyecto Next.js
npx create-next-app@latest nextjs-compressor --typescript --tailwind --app

# Instalar dependencias
npm install @prisma/client @auth/prisma-adapter next-auth bcryptjs stripe uploadthing
npm install sharp archiver uuid
npm install -D prisma @types/bcryptjs

# Setup Prisma
npx prisma init
# Copiar schema.prisma y correr:
npx prisma migrate dev --name init
npx prisma generate
```

**Archivos a crear:**
- `prisma/schema.prisma` (schema completo)
- `.env.local` (variables de entorno)
- `lib/db.ts` (Prisma client singleton)

---

### Fase 2: Autenticación (1-2 horas)

**Archivos a crear:**
- `lib/auth.ts` (NextAuth configuration)
- `app/(auth)/login/page.tsx`
- `app/(auth)/register/page.tsx`
- `middleware.ts` (protección de rutas)

**Funcionalidades:**
- Email/Password auth con bcrypt
- Google OAuth
- Sesiones con JWT
- Subscription tier en session

---

### Fase 3: Servicios & Database (2-3 horas)

**Archivos a migrar:**
- `src/services/imageProcessor.js` → `lib/services/image-processor.ts`
- `src/services/zipService.js` → `lib/services/zip-service.ts`

**Archivos a crear:**
- `lib/services/storage-service.ts` (Uploadthing/S3)
- `lib/services/job-processor.ts` (background job processor)
- `lib/compression-config.ts` (Sharp modes)
- `lib/tier-limits.ts` (tier enforcement)

---

### Fase 4: API Routes (3-4 horas)

**Endpoints a implementar:**
```
POST   /api/jobs                      // Create job
POST   /api/jobs/[jobId]/upload       // Upload files
POST   /api/jobs/[jobId]/process      // Start processing
GET    /api/jobs/[jobId]/status       // Check status
GET    /api/jobs/[jobId]/download     // Download ZIP

POST   /api/stripe/create-checkout    // Create Stripe session
POST   /api/stripe/create-portal      // Billing portal
POST   /api/stripe/webhook            // Handle events

GET    /api/health                    // Health check
```

**Implementar:**
- Tier validation middleware
- Error handling
- Rate limiting
- Stripe webhook handling

---

### Fase 5: Frontend Components (4-5 horas)

**Migrar de HTML/JS a React:**
1. `components/home/Hero.tsx` - Static marketing content
2. `components/home/ImageUploader.tsx` - Drop zone, file handling (client)
3. `components/home/CompressionSettings.tsx` - Format, quality, resize (client)
4. `components/home/ProcessingView.tsx` - Progress, tips, status (client)
5. `components/home/DownloadView.tsx` - Stats, download, reset (client)
6. `components/home/FormatGuide.tsx` - Format comparison
7. `components/home/FAQ.tsx` - FAQ section

**Dashboard:**
1. `components/dashboard/JobHistory.tsx` - List of past jobs
2. `components/dashboard/UsageStats.tsx` - Monthly usage, quota
3. `components/dashboard/QuickCompress.tsx` - Quick access uploader

**Pages:**
- `app/page.tsx` - Home (solo componentes)
- `app/pricing/page.tsx` - Pricing + Stripe Checkout buttons
- `app/(dashboard)/dashboard/page.tsx` - User dashboard
- `app/(dashboard)/settings/page.tsx` - Account settings
- `app/(dashboard)/billing/page.tsx` - Stripe portal

---

### Fase 6: Deployment (1-2 horas)

**Dockerfile actualizado para Next.js:**
```dockerfile
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat vips-dev fftw-dev
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

**Environment variables necesarias:**
```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://yourdomain.com"

# OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Stripe
STRIPE_SECRET_KEY="..."
STRIPE_WEBHOOK_SECRET="..."

# Storage
UPLOADTHING_SECRET="..."
UPLOADTHING_APP_ID="..."

# Optional: Rate limiting
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."
```

---

## Archivos del Proyecto Actual a Mantener

Estos servicios se pueden reutilizar con mínimas adaptaciones:

### ✅ Mantener lógica de Sharp
- `src/services/imageProcessor.js` - La lógica de Sharp es válida, solo adaptar a TypeScript
- Las configuraciones de quality/effort se pueden reutilizar directamente

### ✅ Mantener lógica de ZIP
- `src/services/zipService.js` - Archiver sigue siendo válido

### ✅ Mantener Tailwind config
- `tailwind.config.js` - Copiar directamente, Next.js lo procesará automáticamente
- Colores personalizados (background, primary, text, etc.)
- Fuentes (Syne, Kangge)

### ✅ Copiar assets
- `public/fonts/` - Fuentes personalizadas
- `public/images/` - Logos, imágenes estáticas

---

## Cambios Estructurales Principales

### 1. Estado (In-Memory → Database)
**Actual:**
```javascript
// In-memory Map
jobManager.jobs = new Map()
```

**Futuro:**
```typescript
// PostgreSQL via Prisma
await db.job.create({ data: {...} })
await db.job.update({ where: { id }, data: {...} })
```

**Ventajas:**
- Persistencia después de restart
- Escalabilidad horizontal
- Historial completo
- Backups automáticos

---

### 2. File Storage (/tmp → S3/Uploadthing)
**Actual:**
```
/tmp/jobs/{jobId}/
├── uploads/
├── processed/
└── processed.zip
```

**Futuro:**
```
S3/Uploadthing (URLs presignadas)
- Original files: archivados por X días según tier
- Processed files: URL directa para descarga
- ZIP: URL directa, expira según tier
```

**Ventajas:**
- Sin límite de almacenamiento local
- CDN automático (rápido)
- Backups según tier
- Escalable infinitamente

---

### 3. Job Processing (setImmediate → Background Jobs)
**Actual:**
```javascript
// Async en la mismo instancia
setImmediate(() => {
  imageProcessor.processImages(...)
})
```

**Futuro:**
```typescript
// Vercel Cron / Bull Queue / externa
export async function processJobAsync(jobId: string) {
  // Puede correr en otra instancia
  // Puede tener retry automático
  // Puede tener timeout management
}
```

---

### 4. Autenticación (None → NextAuth)
**Actual:**
- Sin autenticación
- Endpoints públicos
- Sin historial

**Futuro:**
- Email/Password + Google OAuth
- Rutas protegidas
- Historial por usuario
- Tier-based access control

---

## Roadmap Recomendado

### Etapa Actual (Phase 1)
✅ Mantener Express + Vanilla JS
✅ Mejorar UI/UX del hero
✅ Limpiar código, documentar

### Etapa 2 (Next)
- [ ] Migrar a Next.js 14
- [ ] Setup Prisma + PostgreSQL
- [ ] Implementar autenticación

### Etapa 3 (Después)
- [ ] Integrar Stripe
- [ ] Implementar tiers
- [ ] Dashboard con historial

### Etapa 4 (Escala)
- [ ] API público (Enterprise)
- [ ] Webhooks
- [ ] Rate limiting avanzado
- [ ] Analytics dashboard

---

## Notas Importantes

### Performance Expectations
- **Actual:** ~5-7 segundos por imagen (Sharp effort=4)
- **Con FAST mode:** ~2-3 segundos (Pro/Enterprise)
- **Con MAXIMUM mode:** ~10-15 segundos (Enterprise option)

### Cost Estimation (Primera envergadura)
- PostgreSQL: $5-15/mes (Neon free tier available)
- Uploadthing: Free tier hasta 32GB/mes
- Stripe: 2.9% + $0.30 por transacción
- Vercel: Free tier o ~20/mes escalado

### Security Considerations
- Validación MIME + magic bytes
- Rate limiting por user/IP
- CORS configurado (solo dominio propio)
- Stripe webhook signature verification
- Password hashing con bcrypt
- CSRF protection via NextAuth

### Data Privacy
- User data separated by tier
- Job data auto-delete según TTL
- No guardar archivos originales para free tier
- GDPR compliance ready (delete account)

---

## Referencias & Recursos

- [Next.js App Router](https://nextjs.org/docs/app)
- [NextAuth v5](https://authjs.dev/)
- [Prisma ORM](https://www.prisma.io/docs/)
- [Stripe Documentation](https://stripe.com/docs)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Uploadthing](https://uploadthing.com/)

---

## Checklist para cuando implementar

- [ ] Crear repo de Next.js nuevo
- [ ] Setup Prisma + PostgreSQL
- [ ] Migrar Sharp services
- [ ] Implementar NextAuth
- [ ] Crear API routes con tier limits
- [ ] Migrar componentes HTML → React
- [ ] Setup Stripe
- [ ] Implementar storage (Uploadthing/S3)
- [ ] Testing completo
- [ ] Deploy + monitoring
- [ ] Migration de usuarios actuales (si aplica)
