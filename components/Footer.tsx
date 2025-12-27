import { useTranslations } from '@/lib/i18n-context';

export function Footer() {
  const t = useTranslations('common');
  return (
    <footer className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[120px] max-w-[1720px] mx-auto border-t border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <p className="text-text dark:text-text-dark mb-2">
          {t('footer.madeWith')}{' '}
          <a href="https://aurora33.dev" className="text-primary hover:underline font-semibold">
            Aurora33
          </a>
        </p>
        <p className="text-text-muted dark:text-text-muted-dark mb-4">{t('footer.needCustomSolutions')}</p>

        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <a href="https://aurora33.dev" className="text-primary hover:underline font-medium">
            {t('footer.links.webDevelopment')}
          </a>
          <a href="https://aurora33.dev" className="text-primary hover:underline font-medium">
            {t('footer.links.consulting')}
          </a>
          <a href="https://aurora33.dev" className="text-primary hover:underline font-medium">
            {t('footer.links.contact')}
          </a>
        </div>

        <p className="text-base text-text-muted dark:text-text-muted-dark">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}
