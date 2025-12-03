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
    showError('No valid image files selected. Please upload JPG, PNG, WebP, or GIF files.');
    return;
  }

  if (validFiles.length > 20) {
    showError('Maximum 20 files allowed. Please select fewer files.');
    return;
  }

  state.files = validFiles;
  displayFiles();
  settingsSection.classList.remove('hidden');
}

function displayFiles() {
  fileList.innerHTML = '';

  state.files.forEach((file, index) => {
    const fileItem = document.createElement('div');
    fileItem.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg';

    const fileInfo = document.createElement('div');
    fileInfo.className = 'flex items-center space-x-3';

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'preview-img rounded';
      fileInfo.appendChild(img);
    };
    reader.readAsDataURL(file);

    const details = document.createElement('div');
    details.innerHTML = `
      <p class="font-medium text-gray-800">${file.name}</p>
      <p class="text-sm text-gray-500">${formatFileSize(file.size)}</p>
    `;
    fileInfo.appendChild(details);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'text-red-600 hover:text-red-800 text-sm font-medium';
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
    settingsSection.classList.add('hidden');
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
    compressBtn.textContent = 'Creating job...';

    // Create job
    const jobResponse = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const jobData = await jobResponse.json();
    if (!jobData.success) throw new Error(jobData.error);

    state.jobId = jobData.jobId;

    // Upload files
    compressBtn.textContent = 'Uploading files...';
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
    const maintainAspect = document.getElementById('maintain-aspect').checked;

    const resize = (resizeWidth || resizeHeight) ? {
      width: resizeWidth ? parseInt(resizeWidth) : null,
      height: resizeHeight ? parseInt(resizeHeight) : null,
      fit: maintainAspect ? 'inside' : 'fill'
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
    settingsSection.classList.add('hidden');
    processingSection.classList.remove('hidden');

    // Poll for status
    pollStatus();

  } catch (error) {
    console.error('Compression error:', error);
    showError(error.message || 'Failed to start compression');
    compressBtn.disabled = false;
    compressBtn.textContent = 'Compress Images';
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
    processingText.textContent = `Processing ${data.processedCount} of ${data.totalFiles} images...`;

    if (data.status === 'completed') {
      // Show download section
      processingSection.classList.add('hidden');
      downloadSection.classList.remove('hidden');

      // Display stats
      const reduction = data.reduction || 0;
      statsDiv.innerHTML = `
        <p class="text-lg"><strong>Files processed:</strong> ${data.totalFiles}</p>
        <p class="text-lg"><strong>Original size:</strong> ${formatFileSize(data.originalSize)}</p>
        <p class="text-lg"><strong>Compressed size:</strong> ${formatFileSize(data.compressedSize)}</p>
        <p class="text-lg"><strong>Size reduction:</strong> ${reduction}%</p>
      `;
    } else if (data.status === 'failed') {
      throw new Error(data.error || 'Processing failed');
    } else {
      // Continue polling
      setTimeout(pollStatus, 1000);
    }
  } catch (error) {
    console.error('Status poll error:', error);
    showError(error.message || 'Failed to check status');
  }
}

async function downloadFiles() {
  try {
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Downloading...';

    window.location.href = `${API_URL}/jobs/${state.jobId}/download`;

    setTimeout(() => {
      downloadBtn.disabled = false;
      downloadBtn.textContent = 'Download Compressed Images';
    }, 2000);
  } catch (error) {
    console.error('Download error:', error);
    showError('Failed to download files');
    downloadBtn.disabled = false;
    downloadBtn.textContent = 'Download Compressed Images';
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorSection.classList.remove('hidden');
  processingSection.classList.add('hidden');
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
  settingsSection.classList.add('hidden');
  processingSection.classList.add('hidden');
  downloadSection.classList.add('hidden');
  errorSection.classList.add('hidden');
  compressBtn.disabled = false;
  compressBtn.textContent = 'Compress Images';
  progressBar.style.width = '0%';
  progressText.textContent = '0%';
  qualitySlider.value = 80;
  qualityValue.textContent = '80';
  document.getElementById('resize-width').value = '';
  document.getElementById('resize-height').value = '';
  document.querySelector('input[name="format"][value="webp"]').checked = true;
}

// Initialize
console.log('Image Compressor ready!');
