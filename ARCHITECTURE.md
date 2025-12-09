# Architecture Documentation

## Bulk Image Compressor - Technical Architecture

This document describes the structure and design of the Bulk Image Compressor application.

---

## Project Structure

```
redux/
├── src/
│   ├── config/
│   │   └── config.js              # Configuration from environment variables
│   ├── services/
│   │   ├── jobManager.js          # In-memory job state management
│   │   ├── imageProcessor.js      # Sharp image compression logic
│   │   ├── storageService.js      # File system operations
│   │   ├── zipService.js          # ZIP file creation (Archiver)
│   │   └── cleanupService.js      # Scheduled cleanup with node-cron
│   ├── middleware/
│   │   ├── uploadMiddleware.js    # Multer file upload configuration
│   │   ├── validateSettings.js    # Compression settings validation
│   │   └── errorHandler.js        # Global error handling
│   ├── utils/
│   │   ├── logger.js              # Colored console logging
│   │   └── errors.js              # Custom error classes
│   ├── routes/
│   │   ├── index.js               # Route aggregator
│   │   ├── jobs.js                # Job management endpoints
│   │   ├── health.js              # Health check endpoint
│   │   └── newsletter.js          # Newsletter subscription endpoint
│   └── server.js                  # Express application setup
├── public/
│   ├── index.html                 # Single-page HTML
│   ├── js/
│   │   └── app.js                 # Vanilla JavaScript frontend
│   ├── css/
│   │   ├── input.css              # Tailwind CSS source
│   │   └── output.css             # Compiled CSS
│   ├── fonts/                     # Custom fonts
│   └── images/                    # Static images
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── Dockerfile
```

---

## Service Layer Architecture

### 1. JobManager (`src/services/jobManager.js`)

**Responsibility**: In-memory job state management using Map data structure

**Methods**:
- `createJob()` - Create a new job with UUID
- `getJob(jobId)` - Retrieve job by ID
- `updateJob(jobId, updates)` - Update job properties
- `updateProgress(jobId, processed, total)` - Update progress percentage
- `addUploadedFile(jobId, filename, size)` - Track uploaded files
- `addProcessedFile(jobId, filename, originalSize, compressedSize)` - Track processed files
- `setJobSettings(jobId, settings)` - Store compression settings
- `setJobStatus(jobId, status, error)` - Update job status
- `deleteJob(jobId)` - Remove job from memory

**Job States**:
```
created → uploading → uploaded → processing → completed/failed
```

**Limitations**:
- State lost on server restart (in-memory only)
- Not horizontally scalable (single instance)
- Good for ephemeral, short-lived jobs

---

### 2. ImageProcessor (`src/services/imageProcessor.js`)

**Responsibility**: Image compression using Sharp library

**Methods**:
- `processImage(inputPath, outputPath, settings)` - Process a single image
- `processImages(inputFiles, outputDir, settings, progressCallback)` - Batch processing
- `validateImage(filePath)` - Validate image format and dimensions

**Compression Configurations**:
```javascript
{
  webp: { quality: 80, effort: 4 },
  jpeg: { quality: 80, mozjpeg: true },
  png: { compressionLevel: 9, quality: 80 }
}
```

**Resize Options**:
- width/height: pixels (1-10000)
- fit: 'inside' (maintain aspect ratio)
- withoutEnlargement: true (don't upscale)

---

### 3. StorageService (`src/services/storageService.js`)

**Responsibility**: File system operations for job directories

**Directory Structure**:
```
/tmp/jobs/{jobId}/
├── uploads/       (original images)
├── processed/     (compressed images)
└── metadata.json  (job metadata)
```

**Methods**:
- `initialize()` - Create base directory
- `createJobDirectories(jobId)` - Create job subdirectories
- `saveMetadata(jobId, metadata)` - Write JSON metadata
- `listFiles(directory)` - List directory contents
- `deleteJob(jobId)` - Recursively delete job directory

**File Lifecycle**:
1. Upload → `uploads/` directory
2. Process → `processed/` directory
3. Archive → `processed.zip`
4. Delete → Auto-cleanup after TTL (default 1 hour)

---

### 4. ZipService (`src/services/zipService.js`)

**Responsibility**: ZIP archive creation using Archiver

**Methods**:
- `createZip(sourceDir, outputPath)` - Archive directory with max compression

**Compression**:
- Level 9 (maximum compression)
- Flat structure (no parent folder)

---

### 5. CleanupService (`src/services/cleanupService.js`)

**Responsibility**: Scheduled cleanup of old files and jobs

**Methods**:
- `start()` - Start cron scheduler
- `cleanup()` - Manual cleanup execution
- `stop()` - Stop cron scheduler

**Schedule**:
- Runs every `CLEANUP_INTERVAL` minutes (default: 15)
- Deletes jobs older than `FILE_TTL` seconds (default: 3600 = 1 hour)
- Cleans both file system and in-memory state

---

## API Workflow

### Complete Compression Workflow

```
1. Create Job
   POST /api/jobs
   ↓
   Response: { jobId }

2. Upload Files
   POST /api/jobs/{jobId}/upload
   Headers: Content-Type: multipart/form-data
   Body: images[] (file list)
   ↓
   Multer validates and stores files in /tmp/jobs/{jobId}/uploads/
   ↓
   Response: { filesUploaded, totalSize }

3. Start Processing
   POST /api/jobs/{jobId}/process
   Body: { format, quality, resize }
   ↓
   Validation middleware checks settings
   ↓
   setImmediate() starts async processing
   ↓
   Response: { message: "Processing started" } (immediate)

4. Poll Status
   GET /api/jobs/{jobId}/status
   ↓
   Client polls every 1000ms
   ↓
   Response: { progress, originalSize, compressedSize, status }

5. Download Results
   GET /api/jobs/{jobId}/download
   ↓
   Express res.download() streams ZIP file
   ↓
   Response: Binary ZIP file
```

---

## Error Handling

### Custom Error Classes (`src/utils/errors.js`)

```javascript
- AppError (base class, HTTP 500)
- ValidationError (HTTP 400)
- NotFoundError (HTTP 404)
- ConflictError (HTTP 409)
- BadRequestError (HTTP 400)
- ProcessingError (HTTP 500)
```

### Error Handling Flow

1. **Middleware-level**: Multer errors caught by `uploadMiddleware.js`
2. **Route-level**: Try/catch blocks throw errors to global handler
3. **Global handler**: `errorHandler.js` middleware formats response

### Error Response Format

```json
{
  "success": false,
  "error": "User-friendly error message",
  "details": { /* optional */ },
  "stack": "..." // only in development
}
```

---

## Configuration Management

### Environment Variables (`.env`)

**Server**:
- `PORT` (default: 3000)
- `NODE_ENV` (development/production)

**Upload Limits**:
- `MAX_FILE_SIZE` (default: 10MB = 10485760 bytes)
- `MAX_FILES` (default: 20 files per job)

**Cleanup**:
- `CLEANUP_INTERVAL` (default: 15 minutes)
- `FILE_TTL` (default: 3600 seconds = 1 hour)

**Optional: Listmonk Integration**:
- `LISTMONK_ENABLED` (true/false)
- `LISTMONK_URL`, `LISTMONK_API_KEY`, `LISTMONK_LIST_ID`

---

## Frontend Architecture

### State Management

```javascript
state = {
  jobId: null,
  files: [],
  settings: {
    format: 'webp',
    quality: 80,
    resize: null
  }
}
```

### UI Sections

1. **Hero** - Marketing content
2. **Upload Zone** - Drag-and-drop file upload
3. **Settings** - Format, quality, resize controls
4. **Processing** - Progress bar and rotating tips
5. **Download** - Results and stats display
6. **FAQ** - Frequently asked questions
7. **Format Guide** - Format comparison cards

### Client-Server Communication

```javascript
// Create Job
POST /api/jobs

// Upload Files
POST /api/jobs/{jobId}/upload (multipart/form-data)

// Start Processing
POST /api/jobs/{jobId}/process (JSON)

// Poll Status (every 1000ms)
GET /api/jobs/{jobId}/status

// Download
GET /api/jobs/{jobId}/download
```

---

## Security Considerations

### Input Validation

- ✅ MIME type validation (not extension-based)
- ✅ File size limits enforced by Multer
- ✅ Filename sanitization (prevents path traversal)
- ✅ Settings validation (format, quality, dimensions)

### Missing/Future

- ❌ Rate limiting (no current implementation)
- ❌ Authentication (public endpoints)
- ❌ Magic byte validation (only MIME)
- ❌ CSRF protection (not needed for API-only)

---

## Performance Characteristics

### Processing Speed

**Single Image (12MB)**:
- Sharp default: ~5-7 seconds
- Resize: +1-2 seconds
- ZIP creation: ~2-3 seconds

**Batch (50 × 12MB = 600MB)**:
- Sequential processing: ~25-50 seconds total
- Memory: ~512MB+ (Node heap)
- Storage: 1.2GB+ (original + processed + temp)

### Limitations

- Single-instance only (not horizontally scalable)
- In-memory state limits concurrent jobs
- `/tmp` storage is ephemeral (no persistence)
- Sequential image processing (no parallelization)

---

## Deployment

### Docker

**Base Image**: `node:20-alpine`
**Build Stages**:
1. Dependencies: Install production modules
2. Builder: Copy source and build
3. Runner: Final image with static files

**Health Check**: `GET /api/health`

### Environment Requirements

- Node.js 20+
- 512MB RAM minimum
- 1GB storage minimum (for temp files)
- /tmp directory with write access

---

## Future Roadmap

See `future-implementation.md` for:
- Migration to Next.js 14
- PostgreSQL database integration
- Authentication system (NextAuth)
- Tier-based rate limiting
- S3/Uploadthing storage
- Stripe payment integration

---

## Development

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build CSS
```bash
npm run build:css
```

### Docker
```bash
npm run docker:build
npm run docker:run
```

---

## Logging

All logs are color-coded and timestamped:

```
[INFO]    - Cyan
[SUCCESS] - Green
[WARN]    - Yellow
[ERROR]   - Red
[DEBUG]   - Magenta (development only)
```

---

## References

- [Express.js Documentation](https://expressjs.com/)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Multer Documentation](https://github.com/expressjs/multer)
- [Archiver Documentation](https://github.com/archiverjs/node-archiver)
- [node-cron Documentation](https://github.com/kelektiv/node-cron)
