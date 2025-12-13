'use client';

import { useState } from 'react';

interface ImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
  onShowSettings: () => void;
}

export function ImageUploader({ onFilesSelected, onShowSettings }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useState<HTMLInputElement | null>(null)[1];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file =>
      ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)
    );

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
      onShowSettings();
    }
  };

  return (
    <div className="flex flex-col h-full space-y-8">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
        className={`bg-contrast-v2 dark:bg-container-dark border-2 border-primary rounded-3xl p-12 text-center cursor-pointer transition-colors min-h-[400px] flex flex-col items-center justify-center ${
          dragOver ? 'bg-primary/5 dark:bg-primary/10' : ''
        }`}
        style={{
          boxShadow: '0 16px 24px -8px rgba(0, 0, 0, 0.08)'
        }}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="mb-6">
          <svg className="w-16 h-16 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h3 className="text-3xl font-normal text-text dark:text-text-dark mb-2">Arrastra y suelta imágenes aquí</h3>
        <p className="text-text-muted dark:text-text-muted-dark text-base mb-6">o haz click para explorar tus archivos</p>

        <div className="space-y-2 text-sm text-text-muted dark:text-text-muted-dark">
          <p className="font-medium text-text-muted dark:text-text-muted-dark">Por ahora solo aceptamos archivos de hasta 8 MB</p>
          <p>En el futuro permitiremos archivos más grandes</p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-8 lg:gap-12 gap-y-4 mt-8">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-base font-medium text-text-muted dark:text-text-muted-dark">100% Gratuito</span>
        </div>

        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-base font-medium text-text-muted dark:text-text-muted-dark">Procesamiento Seguro</span>
        </div>

        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-base font-medium text-text-muted dark:text-text-muted-dark">Compresión Rápida</span>
        </div>
      </div>
    </div>
  );
}
