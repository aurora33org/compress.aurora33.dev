'use client';

import { useEffect, useState } from 'react';

interface ProcessingViewProps {
  progress: number;
  processedCount?: number;
  totalFiles?: number;
}

const tips = [
  'Las imágenes no optimizadas representan el 45% del peso promedio de una página web',
  'WebP reduce el tamaño hasta 30% más que JPEG manteniendo la misma calidad',
  'Google considera la velocidad de carga como factor de ranking SEO',
  'Un segundo adicional de carga puede reducir conversiones hasta 7%',
  'Amazon descubrió que 100ms de latencia cuestan 1% en ventas'
];

export function ProcessingView({ progress, processedCount = 0, totalFiles = 0 }: ProcessingViewProps) {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 px-[120px] max-w-[1720px] mx-auto mb-8 text-center">
      <div className="bg-white dark:bg-container-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
        {/* Spinner */}
        <div className="mb-6">
          <svg className="animate-spin h-16 w-16 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-2">Procesando tus imágenes</h2>
        <p className="text-text-muted dark:text-text-muted-dark mb-6">
          {progress === 0 && 'Iniciando...'}
          {progress > 0 && progress < 100 && totalFiles > 0 && `Procesadas ${processedCount} de ${totalFiles} imágenes...`}
          {progress === 100 && 'Finalizando...'}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-base text-text-muted dark:text-text-muted-dark mb-8">{progress}%</p>

        {/* Rotating Tips */}
        <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary rounded-lg p-6 text-left">
          <p className="font-semibold text-primary mb-2">💡 Sabías que...</p>
          <p className="text-text-muted dark:text-text-muted-dark text-base leading-relaxed">{tips[currentTip]}</p>
        </div>
      </div>
    </div>
  );
}
