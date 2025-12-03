# Image Compressor - Bulk Image Compression MicroSaaS

A powerful web-based tool for bulk image compression and format conversion. Compress 5-20 images at once with customizable quality settings and automatic format conversion to WebP, JPEG, or PNG.

## Features

- **Bulk Processing**: Upload and process up to 20 images simultaneously
- **Format Conversion**: Convert images to WebP, JPEG, or PNG
- **Quality Control**: Adjustable compression quality (1-100%)
- **Image Resizing**: Optional width/height resizing with aspect ratio preservation
- **Drag & Drop**: Intuitive drag-and-drop interface
- **Real-time Progress**: Live progress tracking during processing
- **Auto Cleanup**: Temporary files automatically deleted after 1 hour
- **Docker Ready**: Fully containerized for easy deployment

## Tech Stack

- **Backend**: Node.js 20, Express.js
- **Image Processing**: Sharp (native, ultra-fast)
- **Frontend**: Vanilla JavaScript, TailwindCSS
- **Containerization**: Docker
- **Deployment**: Dokploy/Railpack ready

## Quick Start

### Local Development

1. **Install dependencies**:
```bash
npm install
```

2. **Create environment file**:
```bash
cp .env.example .env
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open in browser**:
```
http://localhost:3000
```

### Docker Development

1. **Build and run with Docker Compose**:
```bash
docker-compose up --build
```

2. **Access the application**:
```
http://localhost:3000
```

## Deployment

### Deploying to Dokploy

1. **Push your code to a Git repository**

2. **In Dokploy**:
   - Create a new project
   - Connect your repository
   - Set build method to "Dockerfile"
   - Configure environment variables (see below)
   - Deploy

3. **Environment Variables** (set in Dokploy):
```bash
PORT=3000
NODE_ENV=production
MAX_FILE_SIZE=10485760
MAX_FILES=20
CLEANUP_INTERVAL=15
FILE_TTL=3600
```

### Manual Docker Deployment

1. **Build the image**:
```bash
docker build -t image-compressor .
```

2. **Run the container**:
```bash
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  --name image-compressor \
  image-compressor
```

## API Documentation

### Base URL
```
/api
```

### Endpoints

#### 1. Create Job
```http
POST /api/jobs
```

**Response**:
```json
{
  "success": true,
  "jobId": "uuid-v4",
  "message": "Job created successfully"
}
```

#### 2. Upload Images
```http
POST /api/jobs/:jobId/upload
Content-Type: multipart/form-data
```

**Body**: Form data with `images` field (array of files)

**Response**:
```json
{
  "success": true,
  "filesUploaded": 10,
  "totalSize": 45000000,
  "files": [...]
}
```

#### 3. Process Images
```http
POST /api/jobs/:jobId/process
Content-Type: application/json
```

**Body**:
```json
{
  "format": "webp",
  "quality": 80,
  "resize": {
    "width": 1920,
    "height": null,
    "fit": "inside"
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Processing started",
  "jobId": "uuid-v4"
}
```

#### 4. Check Status
```http
GET /api/jobs/:jobId/status
```

**Response**:
```json
{
  "success": true,
  "id": "uuid-v4",
  "status": "completed",
  "progress": 100,
  "totalFiles": 10,
  "processedCount": 10,
  "originalSize": 45000000,
  "compressedSize": 18000000,
  "reduction": 60
}
```

#### 5. Download ZIP
```http
GET /api/jobs/:jobId/download
```

Returns a ZIP file with all processed images.

#### 6. Health Check
```http
GET /api/health
```

**Response**:
```json
{
  "status": "ok",
  "uptime": 12345,
  "timestamp": 1234567890,
  "memoryUsage": {...}
}
```

## Configuration

All configuration is done via environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment mode |
| `MAX_FILE_SIZE` | `10485760` | Max file size in bytes (10MB) |
| `MAX_FILES` | `20` | Max files per job |
| `CLEANUP_INTERVAL` | `15` | Cleanup interval in minutes |
| `FILE_TTL` | `3600` | File time-to-live in seconds (1 hour) |

### Future: Listmonk Integration

For email capture and marketing integration:

```bash
LISTMONK_ENABLED=true
LISTMONK_URL=https://your-listmonk.com
LISTMONK_API_KEY=your-api-key
LISTMONK_LIST_ID=1
```

## Project Structure

```
/home/strykerux/aurora33.dev/redux/
├── src/
│   ├── server.js                 # Main entry point
│   ├── config/
│   │   └── config.js             # Configuration management
│   ├── routes/
│   │   ├── index.js              # Route aggregator
│   │   ├── jobs.js               # Job endpoints
│   │   └── health.js             # Health check
│   ├── services/
│   │   ├── imageProcessor.js     # Sharp processing
│   │   ├── jobManager.js         # Job state management
│   │   ├── storageService.js     # File operations
│   │   ├── zipService.js         # ZIP creation
│   │   └── cleanupService.js     # Cleanup scheduler
│   ├── middleware/
│   │   ├── errorHandler.js       # Error handling
│   │   ├── uploadMiddleware.js   # Multer config
│   │   └── validateSettings.js   # Input validation
│   └── utils/
│       └── logger.js             # Logging utility
├── public/
│   ├── index.html                # Main UI
│   ├── css/
│   │   └── styles.css            # Custom CSS
│   └── js/
│       └── app.js                # Frontend logic
├── package.json                  # Dependencies
├── Dockerfile                    # Docker configuration
├── docker-compose.yml            # Docker Compose config
└── README.md                     # This file
```

## Usage Guide

### For End Users

1. **Upload Images**:
   - Drag and drop images or click to browse
   - Supports JPG, PNG, WebP, GIF (max 20 files, 10MB each)

2. **Configure Settings**:
   - Choose output format (WebP recommended)
   - Adjust quality slider (1-100%)
   - Optionally set resize dimensions

3. **Compress**:
   - Click "Compress Images"
   - Watch real-time progress

4. **Download**:
   - Download ZIP file with compressed images
   - View compression statistics

### Supported Formats

**Input**: JPG, PNG, WebP, GIF
**Output**: WebP, JPEG, PNG

## Performance

- **Upload**: 2-5 seconds (network dependent)
- **Processing**: ~0.5-2 seconds per image
- **Download**: 1-3 seconds
- **Total for 20 images**: 30-60 seconds

## Security

- File type validation (images only)
- Size limits enforced (10MB per file, 20 files max)
- Automatic file cleanup after 1 hour
- No permanent storage of user files
- Input sanitization and validation

## Troubleshooting

### Sharp Installation Issues

If Sharp fails to install, ensure you have the required build tools:

**Alpine Linux**:
```bash
apk add vips-dev fftw-dev gcc g++ make libc-dev
```

**Ubuntu/Debian**:
```bash
apt-get install libvips-dev
```

### Port Already in Use

Change the port in `.env`:
```bash
PORT=3001
```

### Memory Issues

For large batches, increase Node.js memory:
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm start
```

## Development

### Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
npm run docker:build  # Build Docker image
npm run docker:run    # Run Docker container
```

### Adding New Features

1. **New Format Support**: Edit `src/services/imageProcessor.js`
2. **New API Endpoint**: Add to `src/routes/`
3. **UI Changes**: Edit `public/index.html` and `public/js/app.js`

## Contributing

This is a private project, but suggestions are welcome!

## License

MIT

## Support

For issues or questions, please contact the development team.

---

**Built with**: Node.js, Sharp, Express, TailwindCSS
**Deployed on**: Dokploy using Railpack
**Version**: 1.0.0
