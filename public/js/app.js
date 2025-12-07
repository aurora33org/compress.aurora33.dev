// Application state
const state = {
  jobId: null,
  files: [],
  settings: {
    format: 'webp',
    quality: 80,
    resize: null
  }
};

// Tips rotativos para processing
const tips = [
  "Las imágenes no optimizadas representan el 45% del peso promedio de una página web",
  "WebP reduce el tamaño hasta 30% más que JPEG manteniendo la misma calidad",
  "Google considera la velocidad de carga como factor de ranking SEO",
  "Un segundo adicional de carga puede reducir conversiones hasta 7%",
  "Amazon descubrió que 100ms de latencia cuestan 1% en ventas"
];

let currentTipIndex = 0;
let tipInterval;

// DOM elements
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');
const settingsSection = document.getElementById('settings-section');
const processingSection = document.getElementById('processing-section');
const downloadSection = document.getElementById('download-section');
const errorSection = document.getElementById('error-section');
const compressBtn = document.getElementById('compress-btn');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');
const errorResetBtn = document.getElementById('error-reset-btn');
const qualitySlider = document.getElementById('quality-slider');
const qualityValue = document.getElementById('quality-value');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const processingText = document.getElementById('processing-text');
const statsDiv = document.getElementById('stats');
const errorMessage = document.getElementById('error-message');

// API base URL
const API_URL = '/api';

// Event Listeners
dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('dragleave', handleDragLeave);
dropZone.addEventListener('drop', handleDrop);
fileInput.addEventListener('change', handleFileSelect);
qualitySlider.addEventListener('input', (e) => {
  qualityValue.textContent = e.target.value;
  state.settings.quality = parseInt(e.target.value);
});
compressBtn.addEventListener('click', startCompression);
downloadBtn.addEventListener('click', downloadFiles);
resetBtn.addEventListener('click', reset);
errorResetBtn.addEventListener('click', reset);

// Format radio buttons
document.querySelectorAll('input[name="format"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    state.settings.format = e.target.value;
  });
});

// Drag and drop handlers
function handleDragOver(e) {
  e.preventDefault();
  dropZone.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  dropZone.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const files = Array.from(e.dataTransfer.files);
  handleFiles(files);
}

function handleFileSelect(e) {
  const files = Array.from(e.target.files);
  handleFiles(files);
}

function handleFiles(files) {
  // Filter valid image files
  const validFiles = files.filter(file => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    return validTypes.includes(file.type);
  });

  if (validFiles.length === 0) {
    showError('No se seleccionaron archivos de imagen válidos. Por favor sube archivos JPG, PNG, WebP o GIF.');
    return;
  }

  if (validFiles.length > 10) {
    showError('Máximo 10 archivos permitidos. Por favor selecciona menos archivos.');
    return;
  }

  state.files = validFiles;
  displayFiles();
  settingsSection.style.display = 'block';

  // Show enterprise tip if uploading many files
  const enterpriseTip = document.getElementById('enterprise-tip');
  if (validFiles.length >= 15) {
    enterpriseTip.style.display = 'flex';
  } else {
    enterpriseTip.style.display = 'none';
  }
}

function displayFiles() {
  fileList.innerHTML = '';

  state.files.forEach((file, index) => {
    const fileItem = document.createElement('div');
    fileItem.className = 'bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between gap-4';

    const fileInfo = document.createElement('div');
    fileInfo.className = 'flex items-center gap-3 flex-1';

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'w-12 h-12 object-cover rounded';
      fileInfo.appendChild(img);
    };
    reader.readAsDataURL(file);

    const details = document.createElement('div');
    details.innerHTML = `
      <p class="font-semibold text-text">${file.name}</p>
      <p class="text-sm text-text-muted">${formatFileSize(file.size)}</p>
    `;
    fileInfo.appendChild(details);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Eliminar';
    removeBtn.className = 'px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-text transition-colors';
    removeBtn.onclick = () => removeFile(index);

    fileItem.appendChild(fileInfo);
    fileItem.appendChild(removeBtn);
    fileList.appendChild(fileItem);
  });
}

function removeFile(index) {
  state.files.splice(index, 1);
  if (state.files.length === 0) {
    fileList.innerHTML = '';
    settingsSection.style.display = 'none';
  } else {
    displayFiles();
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

async function startCompression() {
  try {
    compressBtn.disabled = true;
    compressBtn.textContent = 'Creando trabajo...';

    // Create job
    const jobResponse = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const jobData = await jobResponse.json();
    if (!jobData.success) throw new Error(jobData.error);

    state.jobId = jobData.jobId;

    // Upload files
    compressBtn.textContent = 'Subiendo archivos...';
    const formData = new FormData();
    state.files.forEach(file => formData.append('images', file));

    const uploadResponse = await fetch(`${API_URL}/jobs/${state.jobId}/upload`, {
      method: 'POST',
      body: formData
    });

    const uploadData = await uploadResponse.json();
    if (!uploadData.success) throw new Error(uploadData.error);

    // Get resize settings
    const resizeWidth = document.getElementById('resize-width').value;
    const resizeHeight = document.getElementById('resize-height').value;

    const resize = (resizeWidth || resizeHeight) ? {
      width: resizeWidth ? parseInt(resizeWidth) : null,
      height: resizeHeight ? parseInt(resizeHeight) : null,
      fit: 'inside'  // Always maintain aspect ratio
    } : null;

    // Start processing
    const processResponse = await fetch(`${API_URL}/jobs/${state.jobId}/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        format: state.settings.format,
        quality: state.settings.quality,
        resize
      })
    });

    const processData = await processResponse.json();
    if (!processData.success) throw new Error(processData.error);

    // Show processing section
    settingsSection.style.display = 'none';
    processingSection.style.display = 'block';

    // Start tips rotation
    startTipRotation();

    // Poll for status
    pollStatus();

  } catch (error) {
    console.error('Compression error:', error);
    showError(error.message || 'Error al iniciar la compresión');
    compressBtn.disabled = false;
    compressBtn.textContent = 'Comprimir Imágenes';
  }
}

async function pollStatus() {
  try {
    const response = await fetch(`${API_URL}/jobs/${state.jobId}/status`);
    const data = await response.json();

    if (!data.success) throw new Error(data.error);

    // Update progress
    progressBar.style.width = `${data.progress}%`;
    progressText.textContent = `${data.progress}%`;
    processingText.textContent = `Procesando ${data.processedCount} de ${data.totalFiles} imágenes...`;

    if (data.status === 'completed') {
      // Stop tips rotation
      stopTipRotation();

      // Show download section
      processingSection.style.display = 'none';
      downloadSection.style.display = 'block';

      // Display stats
      const reduction = data.reduction || 0;
      statsDiv.innerHTML = `
        <div class="bg-gray-50 rounded-lg p-4 text-center">
          <div class="text-sm text-text-muted mb-1">Archivos procesados</div>
          <div class="text-2xl font-bold text-text">${data.totalFiles}</div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 text-center">
          <div class="text-sm text-text-muted mb-1">Tamaño original</div>
          <div class="text-2xl font-bold text-text">${formatFileSize(data.originalSize)}</div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 text-center">
          <div class="text-sm text-text-muted mb-1">Tamaño comprimido</div>
          <div class="text-2xl font-bold text-text">${formatFileSize(data.compressedSize)}</div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 text-center">
          <div class="text-sm text-text-muted mb-1">Reducción de tamaño</div>
          <div class="text-2xl font-bold text-primary">${reduction}%</div>
        </div>
      `;

      // Display savings visualization
      displaySavingsVisualization(data.originalSize, data.compressedSize);
    } else if (data.status === 'failed') {
      throw new Error(data.error || 'Error al procesar');
    } else {
      // Continue polling
      setTimeout(pollStatus, 1000);
    }
  } catch (error) {
    console.error('Status poll error:', error);
    showError(error.message || 'Error al verificar el estado');
  }
}

async function downloadFiles() {
  try {
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Descargando...';

    window.location.href = `${API_URL}/jobs/${state.jobId}/download`;

    setTimeout(() => {
      downloadBtn.disabled = false;
      downloadBtn.textContent = 'Descargar Imágenes Comprimidas';
    }, 2000);
  } catch (error) {
    console.error('Download error:', error);
    showError('Error al descargar los archivos');
    downloadBtn.disabled = false;
    downloadBtn.textContent = 'Descargar Imágenes Comprimidas';
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorSection.style.display = 'block';
  processingSection.style.display = 'none';
}

function reset() {
  // Reset state
  state.jobId = null;
  state.files = [];
  state.settings = {
    format: 'webp',
    quality: 80,
    resize: null
  };

  // Reset UI
  fileInput.value = '';
  fileList.innerHTML = '';
  settingsSection.style.display = 'none';
  processingSection.style.display = 'none';
  downloadSection.style.display = 'none';
  errorSection.style.display = 'none';
  compressBtn.disabled = false;
  compressBtn.textContent = 'Comprimir Imágenes';
  progressBar.style.width = '0%';
  progressText.textContent = '0%';
  qualitySlider.value = 80;
  qualityValue.textContent = '80';
  document.getElementById('resize-width').value = '';
  document.getElementById('resize-height').value = '';
  document.querySelector('input[name="format"][value="webp"]').checked = true;
}

// Tips rotation functions
function startTipRotation() {
  const tipElement = document.getElementById('processing-tip');
  if (!tipElement) return;

  tipInterval = setInterval(() => {
    currentTipIndex = (currentTipIndex + 1) % tips.length;
    tipElement.textContent = tips[currentTipIndex];
  }, 4000);
}

function stopTipRotation() {
  if (tipInterval) {
    clearInterval(tipInterval);
    tipInterval = null;
  }
}

// Calculate load time saved
function calculateLoadTimeSaved(bytesSaved) {
  // Asumiendo conexión 4G promedio: 10 Mbps = 1.25 MB/s
  const connectionSpeed = 1.25 * 1024 * 1024; // bytes per second
  const timeSaved = bytesSaved / connectionSpeed;
  return timeSaved.toFixed(1);
}

// Display savings visualization
function displaySavingsVisualization(originalSize, compressedSize) {
  const reduction = ((originalSize - compressedSize) / originalSize) * 100;
  const savingsBar = document.getElementById('savings-bar');
  const savingsAmount = document.getElementById('savings-amount');

  setTimeout(() => {
    if (savingsBar && savingsAmount) {
      savingsBar.style.width = `${reduction}%`;
      savingsAmount.textContent = `-${formatFileSize(originalSize - compressedSize)}`;
    }
  }, 300);

  const timeSaved = calculateLoadTimeSaved(originalSize - compressedSize);
  const loadTimeElement = document.getElementById('load-time-saved');
  if (loadTimeElement) {
    loadTimeElement.textContent = `🚀 Con este ahorro, tu sitio cargará ~${timeSaved}s más rápido en conexiones 4G`;
  }
}

// Newsletter subscription
async function subscribeToNewsletter(email) {
  const subscribeBtn = document.getElementById('subscribe-btn');
  const originalText = subscribeBtn.textContent;

  try {
    subscribeBtn.disabled = true;
    subscribeBtn.textContent = 'Suscribiendo...';

    const response = await fetch(`${API_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (data.success) {
      subscribeBtn.textContent = '✓ Suscrito';
      subscribeBtn.style.background = '#10B981';
      document.getElementById('email-input').value = '';

      // Show success message briefly
      setTimeout(() => {
        subscribeBtn.textContent = originalText;
        subscribeBtn.style.background = '';
        subscribeBtn.disabled = false;
      }, 3000);
    } else {
      throw new Error(data.error || 'Error al suscribirse');
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    subscribeBtn.textContent = 'Error';
    subscribeBtn.style.background = '#DC2626';

    setTimeout(() => {
      subscribeBtn.textContent = originalText;
      subscribeBtn.style.background = '';
      subscribeBtn.disabled = false;
    }, 3000);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Event listener for newsletter subscription
const subscribeBtn = document.getElementById('subscribe-btn');
if (subscribeBtn) {
  subscribeBtn.addEventListener('click', () => {
    const email = document.getElementById('email-input').value.trim();
    if (email && isValidEmail(email)) {
      subscribeToNewsletter(email);
    } else {
      alert('Por favor ingresa un email válido');
    }
  });
}

// Tooltip functionality for mobile
document.querySelectorAll('.tooltip-trigger').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const tooltip = trigger.querySelector('.tooltip-content');
    if (tooltip) {
      const isVisible = tooltip.style.opacity === '1';
      tooltip.style.opacity = isVisible ? '0' : '1';

      if (!isVisible) {
        // Close after 3 seconds
        setTimeout(() => {
          tooltip.style.opacity = '0';
        }, 3000);
      }
    }
  });
});

// Initialize
console.log('Compresor de Imágenes listo!');
