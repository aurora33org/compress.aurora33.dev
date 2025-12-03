FROM node:20-alpine

# Install dependencies for Sharp
RUN apk add --no-cache \
    libc6-compat \
    vips-dev \
    fftw-dev \
    gcc \
    g++ \
    make \
    libc-dev

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Create temp directory for jobs
RUN mkdir -p /tmp/jobs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1); })"

# Start the application
CMD ["node", "src/server.js"]
