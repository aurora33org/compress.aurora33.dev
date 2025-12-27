'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from '@/lib/i18n-context';

interface ProcessingViewProps {
  progress: number;
  processedCount?: number;
  totalFiles?: number;
}

export function ProcessingView({ progress, processedCount = 0, totalFiles = 0 }: ProcessingViewProps) {
  const t = useTranslations('processing');
  const tHero = useTranslations('hero');
  const tips = t.raw('tips');
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[120px] max-w-[1720px] mx-auto mb-4 sm:mb-6 md:mb-8 mt-8 sm:mt-12 md:mt-16">
        <div className="w-full mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary" style={{ lineHeight: '120%' }}>
            {tHero('title')}<br />{tHero('subtitle')}
          </h1>
        </div>
      </div>

      <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[120px] max-w-[1720px] mx-auto mb-4 sm:mb-6 md:mb-8 text-center">
        <div className="bg-white dark:bg-container-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Spinner */}
        <div className="mb-6">
          <svg className="animate-spin h-16 w-16 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-2">{t('title')}</h2>
        <p className="text-text-muted dark:text-text-muted-dark mb-6">
          {progress === 0 && t('status.starting')}
          {progress > 0 && progress < 100 && totalFiles > 0 && t('status.processing', { count: processedCount, total: totalFiles })}
          {progress === 100 && t('status.finalizing')}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-base text-text-muted dark:text-text-muted-dark mb-8">{t('progress', { progress })}</p>

        {/* Rotating Tips */}
        <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary rounded-lg p-6 text-left">
          <p className="font-semibold text-primary mb-2">{t('tipsIntro')}</p>
          <p className="text-text-muted dark:text-text-muted-dark text-base leading-relaxed">{tips[currentTip]}</p>
        </div>
      </div>
      </div>
    </>
  );
}
