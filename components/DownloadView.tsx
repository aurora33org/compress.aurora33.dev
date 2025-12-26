'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from '@/lib/i18n-context';

interface FileStats {
  originalSize: number;
  compressedSize: number;
  reduction: number;
}

interface DownloadViewProps {
  stats?: FileStats;
  onDownload: () => void;
  onReset: () => void;
  onSubscribe?: (email: string) => void;
}

function formatFileSize(bytes: number, locale: string) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = Math.round((bytes / Math.pow(k, i)) * 100) / 100;
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value) + ' ' + sizes[i];
}

export function DownloadView({ stats, onDownload, onReset, onSubscribe }: DownloadViewProps) {
  const t = useTranslations('download');
  const tHero = useTranslations('hero');
  const locale = useLocale();
  const [email, setEmail] = useState('');

  const originalSize = stats?.originalSize || 0;
  const compressedSize = stats?.compressedSize || 0;
  const savedSize = originalSize - compressedSize;
  const savingsPercent = stats?.reduction || 0;

  return (
    <>
      <div className="px-[120px] max-w-[1720px] mx-auto mb-8 mt-16">
        <div className="w-full mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-primary" style={{ lineHeight: '120%' }}>
            {tHero('title')}<br />{tHero('subtitle')}
          </h1>
        </div>
      </div>

      <div className="py-16 px-[120px] max-w-[1720px] mx-auto mb-8">
        <div className="bg-white dark:bg-container-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-text dark:text-text-dark mb-2">{t('success.heading')}</h2>
          <p className="text-text-muted dark:text-text-muted-dark">{t('success.message')}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-sm text-text-muted dark:text-text-muted-dark uppercase mb-1">{t('stats.original')}</p>
            <p className="text-lg font-bold text-text dark:text-text-dark">{formatFileSize(originalSize, locale)}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-sm text-text-muted dark:text-text-muted-dark uppercase mb-1">{t('stats.compressed')}</p>
            <p className="text-lg font-bold text-text dark:text-text-dark">{formatFileSize(compressedSize, locale)}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-sm text-text-muted dark:text-text-muted-dark uppercase mb-1">{t('stats.saved')}</p>
            <p className="text-lg font-bold text-primary">{formatFileSize(savedSize, locale)}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-sm text-text-muted dark:text-text-muted-dark uppercase mb-1">{t('stats.reduction')}</p>
            <p className="text-lg font-bold text-primary">{savingsPercent}%</p>
          </div>
        </div>

        {/* Savings Visualization */}
        <div className="mb-8">
          <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-end pr-4 text-white font-semibold text-base transition-all duration-1000"
              style={{ width: `${savingsPercent}%` }}
            >
              <span>-{formatFileSize(savedSize, locale)}</span>
            </div>
          </div>
          <p className="text-center text-text-muted dark:text-text-muted-dark mt-3 text-base">
            {t('savingsMessage')}
          </p>
        </div>

        {/* Download Button */}
        <button
          onClick={onDownload}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] mb-6"
        >
          {t('downloadButton')}
        </button>

        {/* Lead Capture Card */}
        <div className="bg-gradient-to-br from-primary/5 dark:from-primary/10 to-primary/10 dark:to-primary/20 border border-primary/20 dark:border-primary/30 rounded-xl p-8 text-center mb-6">
          <h4 className="text-xl font-normal text-text dark:text-text-dark mb-2">{t('leadCapture.heading')}</h4>
          <p className="text-text-muted dark:text-text-muted-dark mb-4">{t('leadCapture.description')}</p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
            <input
              type="email"
              placeholder={t('leadCapture.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-text dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={() => onSubscribe?.(email)}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-all whitespace-nowrap"
            >
              {t('leadCapture.subscribeButton')}
            </button>
          </div>

          <p className="text-base text-text-muted dark:text-text-muted-dark">
            {t('leadCapture.linkText')}{' '}
            <a href="https://aurora33.dev" className="text-primary hover:underline font-medium">
              {t('leadCapture.linkLabel')}
            </a>
          </p>
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="w-full border-2 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-text dark:text-text-dark font-semibold py-3 px-8 rounded-xl transition-colors"
        >
          {t('resetButton')}
        </button>
      </div>
      </div>
    </>
  );
}
