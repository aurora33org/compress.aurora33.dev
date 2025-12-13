'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { ImageUploader } from '@/components/ImageUploader';
import { CompressionSettings } from '@/components/CompressionSettings';
import { ProcessingView } from '@/components/ProcessingView';
import { DownloadView } from '@/components/DownloadView';
import { ErrorView } from '@/components/ErrorView';
import { FormatGuide } from '@/components/FormatGuide';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

type ViewType = 'upload' | 'settings' | 'processing' | 'download' | 'error';

interface FileStats {
  originalSize: number;
  compressedSize: number;
  reduction: number;
}

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('upload');
  const [files, setFiles] = useState<File[]>([]);
  const [jobId, setJobId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [stats, setStats] = useState<FileStats | undefined>();

  const [settings, setSettings] = useState({
    format: 'webp',
    quality: 80,
    resizeWidth: undefined as number | undefined,
    resizeHeight: undefined as number | undefined
  });

  const [isCompressing, setIsCompressing] = useState(false);

  const handleFilesSelected = (newFiles: File[]) => {
    // Si ya hay archivos, agregar los nuevos; si no, reemplazar
    if (files.length > 0) {
      setFiles([...files, ...newFiles]);
    } else {
      setFiles(newFiles);
      setCurrentView('settings');
    }
  };

  const handleShowSettings = () => {
    setCurrentView('settings');
  };

  const handleQualityChange = (quality: number) => {
    setSettings({ ...settings, quality });
  };

  const handleFormatChange = (format: string) => {
    setSettings({ ...settings, format });
  };

  const handleResizeChange = (width?: number, height?: number) => {
    setSettings({ ...settings, resizeWidth: width, resizeHeight: height });
  };

  const handleCompress = async () => {
    try {
      setIsCompressing(true);
      setCurrentView('processing');
      setProgress(0);

      // Step 1: Create job
      const jobResponse = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const jobData = await jobResponse.json();
      if (!jobData.success) throw new Error(jobData.error);

      const newJobId = jobData.jobId;
      setJobId(newJobId);

      // Step 2: Upload files
      const formData = new FormData();
      files.forEach(file => formData.append('images', file));

      const uploadResponse = await fetch(`/api/jobs/${newJobId}/upload`, {
        method: 'POST',
        body: formData
      });

      const uploadData = await uploadResponse.json();
      if (!uploadData.success) throw new Error(uploadData.error);

      setTotalFiles(uploadData.filesUploaded);
      setProgress(30);

      // Step 3: Process images
      const processResponse = await fetch(`/api/jobs/${newJobId}/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format: settings.format,
          quality: settings.quality,
          resize: settings.resizeWidth || settings.resizeHeight ? {
            width: settings.resizeWidth,
            height: settings.resizeHeight
          } : undefined
        })
      });

      const processData = await processResponse.json();
      if (!processData.success) throw new Error(processData.error);

      // Step 4: Poll for completion
      let isComplete = false;
      let pollCount = 0;
      const maxPolls = 120;

      while (!isComplete && pollCount < maxPolls) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await fetch(`/api/jobs/${newJobId}/status`);
        const statusData = await statusResponse.json();

        if (statusData.status === 'completed') {
          isComplete = true;
          setProgress(100);
          setStats({
            originalSize: statusData.originalSize,
            compressedSize: statusData.compressedSize,
            reduction: statusData.reduction
          });
          setCurrentView('download');
        } else if (statusData.status === 'failed') {
          throw new Error(statusData.error || 'Processing failed');
        } else {
          setProcessedCount(statusData.processedCount);
          const estimatedProgress = 30 + (statusData.progress * 0.7);
          setProgress(Math.min(estimatedProgress, 99));
        }

        pollCount++;
      }

      if (!isComplete) {
        throw new Error('Processing timeout');
      }
    } catch (error: any) {
      console.error('Compression error:', error);
      setErrorMessage(error.message || 'An error occurred during compression');
      setCurrentView('error');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = async () => {
    if (!jobId) return;

    try {
      const response = await fetch(`/api/jobs/${jobId}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compressed-images-${jobId}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      setErrorMessage('Failed to download files');
      setCurrentView('error');
    }
  };

  const handleReset = () => {
    setFiles([]);
    setJobId(null);
    setProgress(0);
    setProcessedCount(0);
    setTotalFiles(0);
    setSettings({
      format: 'webp',
      quality: 80,
      resizeWidth: undefined,
      resizeHeight: undefined
    });
    setCurrentView('upload');
  };

  const handleRetry = () => {
    setErrorMessage('');
    setCurrentView('settings');
  };

  const handleSubscribe = async (email: string) => {
    if (!email) return;
    console.log('Subscribe:', email);
  };

  return (
    <main className="min-h-screen bg-background dark:bg-bg-dark text-text dark:text-text-dark font-syne">
      <Navigation />

      {currentView === 'upload' && (
        <>
          <div className="px-[120px] max-w-[1720px] mx-auto">
            <div className="flex flex-col mb-16 mt-16">
              {/* Hero Title */}
              <div className="w-full mb-12">
                <h1 className="text-5xl lg:text-6xl font-bold text-text dark:text-text-dark" style={{ lineHeight: '120%' }}>
                  Optimiza tus imágenes.<br />Para cualquier proyecto.
                </h1>
              </div>

              {/* Main Grid - Side by Side */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start animate-fade-in">
                {/* Left Column: Text Content */}
                <div className="space-y-8">
                  <div>
                    <p className="text-base text-text-muted dark:text-text-muted-dark mb-8 leading-relaxed font-syne">
                      Ya sea que diseñes, desarrolles, vendas o crees contenido—nosotros redimensionamos, comprimimos y optimizamos tus imágenes automáticamente. Una herramienta. Múltiples necesidades. Sin complicaciones.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <p className="text-text dark:text-text-dark font-medium font-syne">Redimensiona automáticamente para web, redes sociales, impresión</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <p className="text-text dark:text-text-dark font-medium font-syne">Comprime y exporta en WebP, JPEG o PNG—lo que necesites</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <p className="text-text dark:text-text-dark font-medium font-syne">Reduce el peso típicamente 50-70% sin perder calidad</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Image Uploader */}
                <ImageUploader
                  onFilesSelected={handleFilesSelected}
                  onShowSettings={handleShowSettings}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {currentView === 'settings' && files.length > 0 && (
        <>
          <div className="px-[120px] max-w-[1720px] mx-auto mb-8 mt-16">
            <div className="flex flex-col mb-16">
              {/* Hero Title */}
              <div className="w-full mb-12">
                <h1 className="text-5xl lg:text-6xl font-bold text-text dark:text-text-dark" style={{ lineHeight: '120%' }}>
                  Optimiza tus imágenes.<br />Para cualquier proyecto.
                </h1>
              </div>

              {/* Main Grid - Side by Side */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start animate-fade-in" style={{ gridTemplateColumns: '1fr 400px' }}>
              {/* Left Column: Selected Images List */}
              <div>
                <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-6">Imágenes seleccionadas</h2>
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div key={index} className="bg-white dark:bg-container-dark border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-text dark:text-text-dark truncate">{file.name}</p>
                          <p className="text-sm text-text-muted dark:text-text-muted-dark">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newFiles = files.filter((_, i) => i !== index);
                          if (newFiles.length === 0) {
                            handleReset();
                          } else {
                            setFiles(newFiles);
                          }
                        }}
                        className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-text dark:text-text-dark transition-colors whitespace-nowrap"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Image Uploader */}
              <div>
                <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-6">Agregar más imágenes</h2>
                <ImageUploader
                  onFilesSelected={handleFilesSelected}
                  onShowSettings={handleShowSettings}
                />
              </div>
            </div>
            </div>
          </div>

          <CompressionSettings
            quality={settings.quality}
            format={settings.format}
            resizeWidth={settings.resizeWidth}
            resizeHeight={settings.resizeHeight}
            onQualityChange={handleQualityChange}
            onFormatChange={handleFormatChange}
            onResizeChange={handleResizeChange}
            onCompress={handleCompress}
            isLoading={isCompressing}
          />
        </>
      )}

      {currentView === 'processing' && (
        <ProcessingView progress={progress} processedCount={processedCount} totalFiles={totalFiles} />
      )}

      {currentView === 'download' && (
        <DownloadView
          stats={stats}
          onDownload={handleDownload}
          onReset={handleReset}
          onSubscribe={handleSubscribe}
        />
      )}

      {currentView === 'error' && (
        <ErrorView
          message={errorMessage}
          onRetry={handleRetry}
        />
      )}

      {currentView === 'upload' && (
        <>
          <FormatGuide />
          <FAQ />
        </>
      )}

      <Footer />
    </main>
  );
}
