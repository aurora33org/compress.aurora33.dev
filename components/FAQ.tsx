export function FAQ() {
  return (
    <div className="px-[120px] max-w-[1720px] mx-auto mb-16">
      <h3 className="text-2xl font-normal text-text dark:text-text-dark mb-6">Preguntas Frecuentes</h3>
      <div className="space-y-4">
        <div className="bg-white dark:bg-container-dark border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h4 className="font-normal text-text dark:text-text-dark mb-2">¿Es seguro subir mis imágenes?</h4>
          <p className="text-base text-text-muted dark:text-text-muted-dark pl-4">
            → Sí, todo el procesamiento ocurre en nuestro servidor seguro.
            Las imágenes se eliminan automáticamente después de 1 hora.
          </p>
        </div>

        <div className="bg-white dark:bg-container-dark border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h4 className="font-normal text-text dark:text-text-dark mb-2">¿Hay límite de uso?</h4>
          <p className="text-base text-text-muted dark:text-text-muted-dark pl-4">
            → Hasta 20 imágenes por lote, sin límite de lotes.
            Para volúmenes mayores, consulta nuestra{' '}
            <a href="https://aurora33.dev" className="text-primary hover:underline">
              API empresarial
            </a>
            .
          </p>
        </div>

        <div className="bg-white dark:bg-container-dark border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h4 className="font-normal text-text dark:text-text-dark mb-2">¿Pierdo calidad al comprimir?</h4>
          <p className="text-base text-text-muted dark:text-text-muted-dark pl-4">
            → La reducción de calidad es mínima e imperceptible al ojo humano
            con configuraciones de 80-90%. Optimizamos para web manteniendo calidad visual.
          </p>
        </div>
      </div>
    </div>
  );
}
