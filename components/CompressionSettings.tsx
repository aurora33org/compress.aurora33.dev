'use client';

interface CompressionSettingsProps {
  quality: number;
  format: string;
  resizeWidth?: number;
  resizeHeight?: number;
  onQualityChange: (quality: number) => void;
  onFormatChange: (format: string) => void;
  onResizeChange: (width?: number, height?: number) => void;
  onCompress: () => void;
  isLoading: boolean;
}

export function CompressionSettings({
  quality,
  format,
  resizeWidth,
  resizeHeight,
  onQualityChange,
  onFormatChange,
  onResizeChange,
  onCompress,
  isLoading
}: CompressionSettingsProps) {
  return (
    <div className="py-8 px-[120px] max-w-[1720px] mx-auto mb-8">
      <div className="bg-white dark:bg-container-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-6">Configuración de Compresión</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Format Selection */}
          <div>
            <label className="block text-base font-semibold text-text dark:text-text-dark mb-3">
              Formato de Salida
              <span className="tooltip-trigger inline-flex items-center justify-center w-4 h-4 ml-1 text-sm bg-gray-200 dark:bg-gray-700 text-text-muted dark:text-text-muted-dark rounded-full cursor-help relative group">
                i
                <span className="tooltip-content absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-text dark:bg-text-dark text-white dark:text-gray-900 text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  WebP: Mejor para web. JPEG: Compatible. PNG: Transparencias.
                </span>
              </span>
            </label>
            <div className="space-y-2">
              {['webp', 'jpeg', 'png'].map(fmt => (
                <label key={fmt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value={fmt}
                    checked={format === fmt}
                    onChange={(e) => onFormatChange(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-text dark:text-text-dark capitalize">{fmt === 'webp' ? 'WebP (recomendado)' : fmt.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quality Slider */}
          <div>
            <label className="block text-base font-semibold text-text dark:text-text-dark mb-3">
              Calidad: <span className="text-primary">{quality}</span>%
              <span className="tooltip-trigger inline-flex items-center justify-center w-4 h-4 ml-1 text-sm bg-gray-200 dark:bg-gray-700 text-text-muted dark:text-text-muted-dark rounded-full cursor-help relative group">
                i
                <span className="tooltip-content absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-text dark:bg-text-dark text-white dark:text-gray-900 text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  80-90%: Web. 70-80%: Mobile. 90-100%: Impresión
                </span>
              </span>
            </label>
            <input
              type="range"
              min="60"
              max="100"
              value={quality}
              onChange={(e) => onQualityChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Resize Options */}
          <div>
            <label className="block text-base font-semibold text-text dark:text-text-dark mb-3">
              Redimensionar (opcional)
              <span className="tooltip-trigger inline-flex items-center justify-center w-4 h-4 ml-1 text-sm bg-gray-200 dark:bg-gray-700 text-text-muted dark:text-text-muted-dark rounded-full cursor-help relative group">
                i
                <span className="tooltip-content absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-text dark:bg-text-dark text-white dark:text-gray-900 text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  1920px: desktop, 1200px: mobile
                </span>
              </span>
            </label>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="Ancho (px)"
                value={resizeWidth || ''}
                onChange={(e) => onResizeChange(e.target.value ? parseInt(e.target.value) : undefined, resizeHeight)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-text dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Alto (px)"
                value={resizeHeight || ''}
                onChange={(e) => onResizeChange(resizeWidth, e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-text dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <button
          onClick={onCompress}
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? 'Comprimiendo...' : 'Comprimir Imágenes'}
        </button>
      </div>
    </div>
  );
}
