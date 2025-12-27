'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

export function Navigation() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply theme class to HTML element and save to localStorage
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode, mounted]);

  return (
    <div className="py-4 sm:py-6 md:py-8 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[120px] max-w-[1720px] mx-auto mb-4 sm:mb-6 md:mb-8 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <a href="https://croma.aurora33.dev" target="_blank" rel="noopener noreferrer">
          <h2 className="font-bold hover:opacity-80 transition-opacity" style={{ fontFamily: '"Kangge", sans-serif', fontSize: 'calc(2.25rem * 0.8)', marginBottom: '-0.5rem' }}>
            <span className="text-primary">croma.</span><span className="text-text dark:text-text-dark">aurora<sup>33</sup></span>
          </h2>
        </a>

        {/* Toggles Container */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <LanguageToggle />

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex items-center justify-between h-8 w-16 px-1 rounded-full transition-all duration-500 ${
              darkMode ? 'bg-contrast' : 'bg-gray-300'
            }`}
            aria-label="Toggle dark mode"
          >
            <Sun size={16} className="flex-shrink-0 transition-colors text-black relative z-10 ml-1" />
            <span
              className={`absolute inline-block h-6 w-6 transform rounded-full transition-all duration-500 ${
                darkMode ? 'bg-black translate-x-8' : 'bg-white translate-x-0'
              }`}
            />
            <Moon size={16} className={`flex-shrink-0 transition-colors ${darkMode ? 'text-white' : 'text-white'} relative z-10 mr-1`} />
          </button>
        </div>
      </div>
    </div>
  );
}
