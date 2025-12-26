import { useTranslations } from '@/lib/i18n-context';

export function FormatGuide() {
  const t = useTranslations('formats');
  const formats = t.raw('formats');
  return (
    <div className="px-[120px] max-w-[1720px] mx-auto mb-16">
      <h3 className="text-2xl font-normal text-text dark:text-text-dark mb-6">{t('heading')}</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {formats.map((format: { title: string; description: string }, index: number) => (
          <div key={index} className="bg-white dark:bg-container-dark border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <h4 className="text-xl font-normal text-text dark:text-text-dark mb-2">{format.title}</h4>
            <p className="text-base text-text-muted dark:text-text-muted-dark leading-relaxed">
              {format.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
