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
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

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
const jobManager = global.jobManagerInstance || new JobManager();
// Store reference globally to prevent recreation on hot reload
if ("TURBOPACK compile-time truthy", 1) {
    global.jobManagerInstance = jobManager;
}
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
const storageService = global.storageServiceInstance || new StorageService();
// Store reference globally to prevent recreation on hot reload
if ("TURBOPACK compile-time truthy", 1) {
    global.storageServiceInstance = storageService;
}
}),
"[externals]/node-cron [external] (node-cron, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("node-cron");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/lib/services/cleanup-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "cleanupService",
    ()=>cleanupService
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$2d$cron__$5b$external$5d$__$28$node$2d$cron$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/node-cron [external] (node-cron, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$storage$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/storage-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/job-manager.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$2d$cron__$5b$external$5d$__$28$node$2d$cron$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$node$2d$cron__$5b$external$5d$__$28$node$2d$cron$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
class CleanupService {
    task = null;
    isRunning = false;
    start() {
        if (this.task) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn('Cleanup service is already running');
            return;
        }
        // Run every N minutes based on config
        const cronExpression = `*/${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].cleanup.interval} * * * *`;
        this.task = __TURBOPACK__imported__module__$5b$externals$5d2f$node$2d$cron__$5b$external$5d$__$28$node$2d$cron$2c$__esm_import$29$__["default"].schedule(cronExpression, async ()=>{
            await this.cleanup();
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(`Cleanup service started (runs every ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].cleanup.interval} minutes)`);
        // Run initial cleanup after 1 minute
        setTimeout(()=>this.cleanup(), 60000);
    }
    async cleanup() {
        if (this.isRunning) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug('Cleanup already in progress, skipping...');
            return;
        }
        this.isRunning = true;
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info('Starting cleanup...');
        try {
            // Clean up old job files
            const cleaned = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$storage$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storageService"].cleanupOldJobs(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].cleanup.fileTTL);
            // Clean up old jobs from memory
            const jobs = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jobManager"].getAllJobs();
            const now = Date.now();
            let memoryCleanedCount = 0;
            for (const job of jobs){
                const age = (now - job.updatedAt) / 1000; // seconds
                if (age > __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].cleanup.fileTTL) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jobManager"].deleteJob(job.id);
                    memoryCleanedCount++;
                }
            }
            if (memoryCleanedCount > 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(`Removed ${memoryCleanedCount} old job(s) from memory`);
            }
            if (cleaned > 0 || memoryCleanedCount > 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].success(`Cleanup completed: ${cleaned} file jobs, ${memoryCleanedCount} memory jobs`);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug('Cleanup completed: nothing to clean');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Cleanup failed:', error);
        } finally{
            this.isRunning = false;
        }
    }
    stop() {
        if (this.task) {
            this.task.stop();
            this.task = null;
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info('Cleanup service stopped');
        }
    }
    async runNow() {
        return this.cleanup();
    }
}
const cleanupService = global.cleanupServiceInstance || new CleanupService();
// Store reference globally to prevent recreation on hot reload
if ("TURBOPACK compile-time truthy", 1) {
    global.cleanupServiceInstance = cleanupService;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/services/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * Centralized service initialization to ensure singleton pattern in Next.js
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/job-manager.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$storage$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/storage-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cleanup$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/cleanup-service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cleanup$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cleanup$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
// Initialize services on first import
async function initializeServices() {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$storage$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storageService"].initialize();
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cleanup$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cleanupService"].start();
    } catch (error) {
        console.error('Failed to initialize services:', error);
    }
}
// Run initialization
initializeServices().catch(console.error);
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/lib/middleware/multer-handler.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createUploadMiddleware",
    ()=>createUploadMiddleware,
    "parseMultipartForm",
    ()=>parseMultipartForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$multer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/multer/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/logger.ts [app-route] (ecmascript)");
;
;
;
function createUploadMiddleware(uploadDir) {
    const storage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$multer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].diskStorage({
        destination: (req, file, cb)=>{
            cb(null, uploadDir);
        },
        filename: (req, file, cb)=>{
            const uniqueName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueName);
        }
    });
    const fileFilter = (req, file, cb)=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].upload.allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error(`Invalid file type: ${file.mimetype}`), false);
        }
        cb(null, true);
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$multer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
        storage,
        limits: {
            fileSize: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].upload.maxFileSize,
            files: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].upload.maxFiles
        },
        fileFilter
    });
}
async function parseMultipartForm(request, uploadDir) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('images');
        if (!files || files.length === 0) {
            return {
                files: [],
                error: 'No files provided'
            };
        }
        // Validate file count
        if (files.length > __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].upload.maxFiles) {
            return {
                files: [],
                error: `Maximum ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].upload.maxFiles} files allowed`
            };
        }
        // Validate individual files
        for (const file of files){
            if (file.size > __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].upload.maxFileSize) {
                const maxSizeMB = (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].upload.maxFileSize / 1024 / 1024).toFixed(0);
                return {
                    files: [],
                    error: `File ${file.name} exceeds maximum size of ${maxSizeMB}MB`
                };
            }
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"].upload.allowedMimeTypes.includes(file.type)) {
                return {
                    files: [],
                    error: `File ${file.name} has invalid MIME type: ${file.type}`
                };
            }
        }
        return {
            files
        };
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Multipart parsing error:', error.message);
        return {
            files: [],
            error: error.message
        };
    }
}
}),
"[project]/lib/utils/errors.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppError",
    ()=>AppError,
    "BadRequestError",
    ()=>BadRequestError,
    "ConflictError",
    ()=>ConflictError,
    "InternalServerError",
    ()=>InternalServerError,
    "NotFoundError",
    ()=>NotFoundError,
    "ProcessingError",
    ()=>ProcessingError,
    "ValidationError",
    ()=>ValidationError
]);
class AppError extends Error {
    statusCode;
    details;
    constructor(message, statusCode = 500, details = {}){
        super(message), this.statusCode = statusCode, this.details = details;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
class ValidationError extends AppError {
    constructor(message, details = {}){
        super(message, 400, details);
    }
}
class NotFoundError extends AppError {
    constructor(resource = 'Resource'){
        super(`${resource} not found`, 404);
    }
}
class ConflictError extends AppError {
    constructor(message){
        super(message, 409);
    }
}
class BadRequestError extends AppError {
    constructor(message){
        super(message, 400);
    }
}
class InternalServerError extends AppError {
    constructor(message = 'Internal server error'){
        super(message, 500);
    }
}
class ProcessingError extends AppError {
    constructor(message){
        super(message, 500);
    }
}
}),
"[project]/app/api/jobs/[jobId]/upload/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/services/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/job-manager.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$storage$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/storage-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$middleware$2f$multer$2d$handler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/middleware/multer-handler.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
async function POST(request, { params }) {
    try {
        const { jobId } = await params;
        const job = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jobManager"].getJob(jobId);
        if (!job) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NotFoundError"]('Job');
        }
        if (job.status !== 'created') {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BadRequestError"](`Cannot upload to job in status: ${job.status}`);
        }
        const uploadDir = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$storage$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storageService"].getUploadDir(jobId);
        // Update job status
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jobManager"].setJobStatus(jobId, 'uploading');
        // Parse multipart form data
        const { files, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$middleware$2f$multer$2d$handler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMultipartForm"])(request, uploadDir);
        if (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jobManager"].setJobStatus(jobId, 'failed', error);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BadRequestError"](error);
        }
        if (!files || files.length === 0) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BadRequestError"]('No files were uploaded');
        }
        // Save uploaded files to disk
        let totalSize = 0;
        const uploadedFiles = [];
        for (const file of files){
            const buffer = await file.arrayBuffer();
            const filename = `${Date.now()}-${file.name}`;
            const filepath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(uploadDir, filename);
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(filepath, Buffer.from(buffer));
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jobManager"].addUploadedFile(jobId, filename, file.size);
            uploadedFiles.push({
                filename,
                size: file.size,
                mimetype: file.type
            });
            totalSize += file.size;
        }
        // Update job status
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jobManager"].setJobStatus(jobId, 'uploaded');
        // Save metadata
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$storage$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storageService"].saveMetadata(jobId, {
            uploadedAt: Date.now(),
            fileCount: files.length,
            totalSize
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].success(`Uploaded ${files.length} files for job ${jobId}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            filesUploaded: files.length,
            totalSize,
            files: uploadedFiles
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Upload error:', error.message);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: statusCode
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d2da831c._.js.map