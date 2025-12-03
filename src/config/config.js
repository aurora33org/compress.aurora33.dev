require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Upload limits
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760, // 10MB
  maxFiles: parseInt(process.env.MAX_FILES) || 20,

  // Cleanup configuration
  cleanupInterval: parseInt(process.env.CLEANUP_INTERVAL) || 15, // minutes
  fileTTL: parseInt(process.env.FILE_TTL) || 3600, // seconds (1 hour)

  // Listmonk (future)
  listmonk: {
    enabled: process.env.LISTMONK_ENABLED === 'true',
    url: process.env.LISTMONK_URL,
    apiKey: process.env.LISTMONK_API_KEY,
    listId: process.env.LISTMONK_LIST_ID
  },

  // Paths
  tmpDir: '/tmp/jobs',

  // Supported formats
  supportedFormats: ['jpeg', 'jpg', 'png', 'webp', 'gif'],
  outputFormats: ['webp', 'jpeg', 'png']
};
