/**
 * Centralized service initialization to ensure singleton pattern in Next.js
 */
import { jobManager } from './job-manager';
import { storageService } from './storage-service';
import { cleanupService } from './cleanup-service';

// Initialize services on first import
async function initializeServices() {
  try {
    await storageService.initialize();
    cleanupService.start();
  } catch (error) {
    console.error('Failed to initialize services:', error);
  }
}

// Run initialization
initializeServices().catch(console.error);

export { jobManager, storageService, cleanupService };
