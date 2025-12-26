'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function LanguageToggle() {
  const router = useRouter();
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage and default to Spanish
    const savedLanguage = localStorage.getItem('preferred-language') as 'es' | 'en' | null;
    const cookieLanguage = document.cookie
      .split('; ')
      .find(row => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1] as 'es' | 'en' | undefined;

    const currentLanguage = savedLanguage || cookieLanguage || 'es';
    setLanguage(currentLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';

    // Update localStorage
    localStorage.setItem('preferred-language', newLanguage);

    // Update cookie for server-side (expires in 1 year)
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    document.cookie = `NEXT_LOCALE=${newLanguage}; path=/; expires=${expiresAt.toUTCString()}`;

    // Update state
    setLanguage(newLanguage);

    // Refresh the page to apply new language (using router.refresh instead of reload)
    router.refresh();
  };

  if (!mounted) {
    return (
      <div className="inline-flex items-center justify-between h-8 w-14 px-1 rounded-full bg-gray-300 dark:bg-gray-700" />
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className="relative inline-flex items-center justify-between h-8 w-14 px-1 rounded-full transition-all duration-500 bg-gray-300 dark:bg-gray-700"
      aria-label="Toggle language"
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span className="flex items-center justify-center flex-1 text-xs font-bold text-gray-800 dark:text-gray-100 z-10 transition-opacity duration-500">
        ES
      </span>
      <span
        className={`absolute left-0.3 inline-flex items-center justify-center h-6 w-6 transform rounded-full transition-all duration-500 bg-white dark:bg-gray-900 ${
          language === 'en' ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
      <span className="flex items-center justify-center flex-1 text-xs font-bold text-gray-800 dark:text-gray-100 z-10 transition-opacity duration-500">
        EN
      </span>
    </button>
  );
}
