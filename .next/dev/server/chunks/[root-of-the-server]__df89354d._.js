module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/lib/config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config
]);
const config = {
    server: {
        port: parseInt(process.env.PORT || '3000', 10),
        nodeEnv: ("TURBOPACK compile-time value", "development") || 'development'
    },
    // Upload limits
    upload: {
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
        maxFiles: parseInt(process.env.MAX_FILES || '20', 10),
        allowedMimeTypes: [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp'
        ]
    },
    // Cleanup configuration
    cleanup: {
        interval: parseInt(process.env.CLEANUP_INTERVAL || '15', 10),
        fileTTL: parseInt(process.env.FILE_TTL || '3600', 10) // seconds (1 hour)
    },
    // Listmonk (optional)
    listmonk: {
        enabled: process.env.LISTMONK_ENABLED === 'true',
        url: process.env.LISTMONK_URL || '',
        apiKey: process.env.LISTMONK_API_KEY || '',
        listId: process.env.LISTMONK_LIST_ID || ''
    },
    // Storage
    storage: {
        baseDir: '/tmp/jobs'
    },
    // Supported formats
    supportedFormats: [
        'jpeg',
        'jpg',
        'png',
        'webp',
        'gif'
    ],
    outputFormats: [
        'webp',
        'jpeg',
        'png'
    ]
};
}),
"[project]/lib/utils/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logger",
    ()=>logger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-route] (ecmascript)");
;
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};
const getTimestamp = ()=>{
    return new Date().toISOString();
};
const logger = {
    info: (message, ...args)=>{
        console.log(`${colors.cyan}[INFO]${colors.reset} ${colors.bright}${getTimestamp()}${colors.reset} - ${message}`, ...args);
    },
    success: (message, ...args)=>{
        console.log(`${colors.green}[SUCCESS]${colors.reset} ${colors.bright}${getTimestamp()}${colors.reset} - ${message}`, ...args);
    },
    warn: (message, ...args)=>{
        console.warn(`${colors.yellow}[WARN]${colors.reset} ${colors.bright}${getTimestamp()}${colors.reset} - ${message}`, ...args);
    },
    error: (message, ...args)=>{
        console.error(`${colors.red}[ERROR]${colors.reset} ${colors.bright}${getTimestamp()}${colors.reset} - ${message}`, ...args);
    },
    debug: (message, ...args)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].server.nodeEnv === 'development') {
            console.log(`${colors.magenta}[DEBUG]${colors.reset} ${colors.bright}${getTimestamp()}${colors.reset} - ${message}`, ...args);
        }
    }
};
}),
"[project]/lib/services/job-manager.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "jobManager",
    ()=>jobManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist-node/v4.js [app-route] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/logger.ts [app-route] (ecmascript)");
;
;
class JobManager {
    jobs = new Map();
    createJob() {
        const jobId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
        const job = {
            id: jobId,
            status: 'created',
            uploadedFiles: [],
            processedFiles: [],
            settings: null,
            progress: 0,
            totalFiles: 0,
            processedCount: 0,
            originalSize: 0,
            compressedSize: 0,
            error: null,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        this.jobs.set(jobId, job);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(`Created new job: ${jobId}`);
        return job;
    }
    getJob(jobId) {
        return this.jobs.get(jobId);
    }
    updateJob(jobId, updates) {
        const job = this.jobs.get(jobId);
        if (!job) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn(`Attempted to update non-existent job: ${jobId}`);
            return null;
        }
        Object.assign(job, updates, {
            updatedAt: Date.now()
        });
        this.jobs.set(jobId, job);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(`Updated job ${jobId}:`, updates);
        return job;
    }
    updateProgress(jobId, processedCount, totalFiles) {
        const progress = Math.round(processedCount / totalFiles * 100);
        return this.updateJob(jobId, {
            processedCount,
            progress,
            status: progress === 100 ? 'completed' : 'processing'
        });
    }
    addUploadedFile(jobId, filename, size) {
        const job = this.jobs.get(jobId);
        if (!job) return null;
        job.uploadedFiles.push({
            filename,
            size
        });
        job.totalFiles = job.uploadedFiles.length;
        job.originalSize += size;
        job.updatedAt = Date.now();
        this.jobs.set(jobId, job);
        return job;
    }
    addProcessedFile(jobId, filename, originalSize, compressedSize) {
        const job = this.jobs.get(jobId);
        if (!job) return null;
        job.processedFiles.push({
            filename,
            originalSize,
            compressedSize,
            reduction: Math.round((originalSize - compressedSize) / originalSize * 100)
        });
        job.compressedSize += compressedSize;
        job.updatedAt = Date.now();
        this.jobs.set(jobId, job);
        return job;
    }
    setJobSettings(jobId, settings) {
        return this.updateJob(jobId, {
            settings
        });
    }
    setJobStatus(jobId, status, error = null) {
        return this.updateJob(jobId, {
            status,
            error
        });
    }
    deleteJob(jobId) {
        const deleted = this.jobs.delete(jobId);
        if (deleted) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(`Deleted job from memory: ${jobId}`);
        }
        return deleted;
    }
    getAllJobs() {
        return Array.from(this.jobs.values());
    }
    getJobStats(jobId) {
        const job = this.jobs.get(jobId);
        if (!job) return null;
        return {
            id: job.id,
            status: job.status,
            progress: job.progress,
            totalFiles: job.totalFiles,
            processedCount: job.processedCount,
            originalSize: job.originalSize,
            compressedSize: job.compressedSize,
            reduction: job.originalSize > 0 ? Math.round((job.originalSize - job.compressedSize) / job.originalSize * 100) : 0,
            createdAt: job.createdAt,
            error: job.error
        };
    }
}
const jobManager = new JobManager();
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/services/storage-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "storageService",
    ()=>storageService
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/logger.ts [app-route] (ecmascript)");
;
;
;
;
class StorageService {
    baseDir = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].storage.baseDir;
    async initialize() {
        try {
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].mkdir(this.baseDir, {
                recursive: true
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(`Storage initialized at ${this.baseDir}`);
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Failed to initialize storage:', error);
            throw error;
        }
    }
    getJobDir(jobId) {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(this.baseDir, jobId);
    }
    getUploadDir(jobId) {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(this.getJobDir(jobId), 'uploads');
    }
    getProcessedDir(jobId) {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(this.getJobDir(jobId), 'processed');
    }
    async createJobDirectories(jobId) {
        try {
            const uploadDir = this.getUploadDir(jobId);
            const processedDir = this.getProcessedDir(jobId);
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].mkdir(uploadDir, {
                recursive: true
            });
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].mkdir(processedDir, {
                recursive: true
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(`Created directories for job ${jobId}`);
            return {
                uploadDir,
                processedDir
            };
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(`Failed to create directories for job ${jobId}:`, error);
            throw error;
        }
    }
    async saveMetadata(jobId, metadata) {
        try {
            const metadataPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(this.getJobDir(jobId), 'metadata.json');
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(metadataPath, JSON.stringify(metadata, null, 2));
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(`Saved metadata for job ${jobId}`);
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(`Failed to save metadata for job ${jobId}:`, error);
            throw error;
        }
    }
    async getMetadata(jobId) {
        try {
            const metadataPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(this.getJobDir(jobId), 'metadata.json');
            const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(metadataPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(`Failed to read metadata for job ${jobId}:`, error);
            return null;
        }
    }
    async listFiles(directory) {
        try {
            const files = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readdir(directory);
            return files.filter((file)=>!file.startsWith('.'));
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(`Failed to list files in ${directory}:`, error);
            return [];
        }
    }
    async getFileStats(filePath) {
        try {
            const stats = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].stat(filePath);
            return {
                size: stats.size,
                created: stats.birthtime,
                modified: stats.mtime
            };
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(`Failed to get stats for ${filePath}:`, error);
            return null;
        }
    }
    async deleteJob(jobId) {
        try {
            const jobDir = this.getJobDir(jobId);
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].rm(jobDir, {
                recursive: true,
                force: true
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(`Deleted job directory: ${jobId}`);
            return true;
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(`Failed to delete job ${jobId}:`, error);
            return false;
        }
    }
    async cleanupOldJobs(maxAge) {
        try {
            const jobs = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readdir(this.baseDir);
            const now = Date.now();
            let cleaned = 0;
            for (const jobId of jobs){
                const jobDir = this.getJobDir(jobId);
                const metadataPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(jobDir, 'metadata.json');
                try {
                    const stats = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].stat(metadataPath);
                    const age = (now - stats.mtime.getTime()) / 1000; // seconds
                    if (age > maxAge) {
                        await this.deleteJob(jobId);
                        cleaned++;
                    }
                } catch (error) {
                    // If metadata doesn't exist, delete the job anyway
                    await this.deleteJob(jobId);
                    cleaned++;
                }
            }
            if (cleaned > 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(`Cleanup completed: removed ${cleaned} old job(s)`);
            }
            return cleaned;
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Failed to cleanup old jobs:', error);
            return 0;
        }
    }
}
const storageService = new StorageService();
}),
"[project]/app/api/jobs/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/job-manager.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$storage$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/storage-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/logger.ts [app-route] (ecmascript)");
;
;
;
;
async function POST() {
    try {
        const job = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jobManager"].createJob();
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$storage$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storageService"].createJobDirectories(job.id);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].success(`Created job: ${job.id}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            jobId: job.id,
            message: 'Job created successfully'
        }, {
            status: 201
        });
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Failed to create job:', error.message);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
async function GET() {
    try {
        const jobs = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jobManager"].getAllJobs();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            jobs
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__df89354d._.js.map