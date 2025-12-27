'use client';

import { useTranslations } from '@/lib/i18n-context';

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  const t = useTranslations('errors');
  return (
    <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[120px] max-w-[1720px] mx-auto mb-4 sm:mb-6 md:mb-8 text-center">
      <div className="bg-white dark:bg-container-dark rounded-2xl shadow-sm border border-red-200 dark:border-red-900 p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-2">{t('title')}</h2>
        <p className="text-red-600 dark:text-red-400 mb-8">{message}</p>

        <button
          onClick={onRetry}
          className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-xl transition-all"
        >
          {t('retryButton')}
        </button>
      </div>
    </div>
  );
}
