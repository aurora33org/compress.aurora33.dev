import { useTranslations } from '@/lib/i18n-context';

export function FAQ() {
  const t = useTranslations('faq');
  const questions = t.raw('questions');
  return (
    <div className="px-[120px] max-w-[1720px] mx-auto mb-16">
      <h3 className="text-2xl font-normal text-text dark:text-text-dark mb-6">{t('heading')}</h3>
      <div className="space-y-4">
        {questions.map((item: { question: string; answer: string }, index: number) => (
          <div key={index} className="bg-white dark:bg-container-dark border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h4 className="font-normal text-text dark:text-text-dark mb-2">{item.question}</h4>
            <p className="text-base text-text-muted dark:text-text-muted-dark pl-4">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
