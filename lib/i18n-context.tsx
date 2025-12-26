'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
} from 'react';
import type { Locale } from '@/i18n/config';

interface LocaleContextType {
  locale: Locale;
  messages: Record<string, any>;
  t: (key: string, defaultValue?: string) => string;
  tRaw: (key: string) => any;
  tParams: (key: string, params: Record<string, any>, defaultValue?: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Record<string, any>;
  children: ReactNode;
}) {
  const value = useMemo<LocaleContextType>(() => ({
    locale,
    messages,
    t: (key: string, defaultValue: string = '') => {
      const keys = key.split('.');
      let current = messages;
      for (const k of keys) {
        current = current?.[k];
      }
      return typeof current === 'string' ? current : defaultValue || key;
    },
    tRaw: (key: string) => {
      const keys = key.split('.');
      let current = messages;
      for (const k of keys) {
        current = current?.[k];
      }
      return current;
    },
    tParams: (key: string, params: Record<string, any>, defaultValue: string = '') => {
      const keys = key.split('.');
      let current: any = messages;
      for (const k of keys) {
        current = current?.[k];
      }
      if (typeof current !== 'string') return defaultValue || key;

      // Replace {key} with values from params
      return (current as string).replace(/\{(\w+)\}/g, (_, paramKey) => {
        return String(params[paramKey] ?? `{${paramKey}}`);
      });
    },
  }), [locale, messages]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context.locale;
}

export function useTranslations(namespace: string = ''): {
  (key: string, params?: Record<string, any>): string;
  raw: (key: string) => any;
} {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useTranslations must be used within LocaleProvider');
  }

  const namespacedMessages = namespace ? context.messages[namespace] : context.messages;

  return Object.assign(
    (key: string, params?: Record<string, any>): string => {
      const keys = key.split('.');
      let current: any = namespacedMessages;
      for (const k of keys) {
        current = current?.[k];
      }

      if (typeof current !== 'string') {
        return key;
      }

      if (!params) return current;

      // Replace {key} with values from params
      return (current as string).replace(/\{(\w+)\}/g, (_, paramKey) => {
        return String(params[paramKey] ?? `{${paramKey}}`);
      });
    },
    {
      raw: (key: string) => {
        const keys = key.split('.');
        let current = namespacedMessages;
        for (const k of keys) {
          current = current?.[k];
        }
        return current;
      },
    }
  );
}
