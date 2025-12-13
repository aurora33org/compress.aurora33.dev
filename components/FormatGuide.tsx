export function FormatGuide() {
  return (
    <div className="px-[120px] max-w-[1720px] mx-auto mb-16">
      <h3 className="text-2xl font-normal text-text dark:text-text-dark mb-6">Guía de Formatos de Imagen</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-container-dark border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
          <h4 className="text-xl font-normal text-text dark:text-text-dark mb-2">WebP</h4>
          <p className="text-base text-text-muted dark:text-text-muted-dark leading-relaxed">
            Mejor compresión sin pérdida de calidad visible. Ideal para web moderna.
            Reduce tamaño hasta 30% vs JPEG.
          </p>
        </div>

        <div className="bg-white dark:bg-container-dark border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
          <h4 className="text-xl font-normal text-text dark:text-text-dark mb-2">JPEG</h4>
          <p className="text-base text-text-muted dark:text-text-muted-dark leading-relaxed">
            Compatible universalmente. Perfecto para fotografías.
            No soporta transparencias.
          </p>
        </div>

        <div className="bg-white dark:bg-container-dark border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
          <h4 className="text-xl font-normal text-text dark:text-text-dark mb-2">PNG</h4>
          <p className="text-base text-text-muted dark:text-text-muted-dark leading-relaxed">
            Soporta transparencias. Ideal para logos e ilustraciones.
            Archivos más pesados.
          </p>
        </div>
      </div>
    </div>
  );
}
