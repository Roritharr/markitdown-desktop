// DOM Elements
const dropZone = document.getElementById('dropZone');
const browseBtn = document.getElementById('browseBtn');
const statusContainer = document.getElementById('statusContainer');
const statusMessage = document.getElementById('statusMessage');
const previewContainer = document.getElementById('previewContainer');
const markdownPreview = document.getElementById('markdownPreview');
const copyBtn = document.getElementById('copyBtn');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const serverStatus = document.getElementById('serverStatus');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');

let currentMarkdown = '';

// Check server status periodically
async function checkServerStatus() {
  try {
    const isOnline = await window.electronAPI.checkServerHealth();
    statusIndicator.className = isOnline ? 'status-indicator online' : 'status-indicator offline';
    statusText.textContent = isOnline ? 'Server Online' : 'Server Offline';

    if (!isOnline) {
      showStatus('Python server is not responding. Please restart the application.', 'error');
    }
  } catch (error) {
    statusIndicator.className = 'status-indicator offline';
    statusText.textContent = 'Server Error';
  }
}

// Check server status on load and every 5 seconds
checkServerStatus();
setInterval(checkServerStatus, 5000);

// Show status message
function showStatus(message, type = 'info') {
  statusContainer.style.display = 'block';
  statusMessage.className = `status-message ${type}`;

  if (type === 'info') {
    statusMessage.innerHTML = `<div class="spinner"></div> ${message}`;
  } else {
    statusMessage.textContent = message;
  }
}

// Hide status message
function hideStatus() {
  statusContainer.style.display = 'none';
}

// Process file for conversion
async function processFile(filePath) {
  try {
    showStatus('Converting file to Markdown...');

    const result = await window.electronAPI.convertToMarkdown(filePath);

    if (result.error) {
      showStatus(`Error: ${result.error}`, 'error');
      return;
    }

    currentMarkdown = result.markdown || result.text_content || '';

    if (!currentMarkdown) {
      showStatus('No content could be extracted from the file.', 'error');
      return;
    }

    // Show preview
    markdownPreview.textContent = currentMarkdown;
    previewContainer.style.display = 'block';
    hideStatus();
    showStatus('Conversion successful!', 'success');

    setTimeout(hideStatus, 3000);

  } catch (error) {
    console.error('Conversion error:', error);
    showStatus(`Conversion failed: ${error.message}`, 'error');
  }
}

// Handle file drop
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', async (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    await processFile(file.path);
  }
});

// Handle browse button
browseBtn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.selectFile();
  if (filePath) {
    await processFile(filePath);
  }
});

// Handle copy button
copyBtn.addEventListener('click', async () => {
  if (currentMarkdown) {
    try {
      await navigator.clipboard.writeText(currentMarkdown);
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Copied!
      `;
      copyBtn.style.color = '#38a169';
      copyBtn.style.borderColor = '#38a169';

      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.color = '';
        copyBtn.style.borderColor = '';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      showStatus('Failed to copy to clipboard', 'error');
    }
  }
});

// Handle save button
saveBtn.addEventListener('click', async () => {
  if (currentMarkdown) {
    const result = await window.electronAPI.saveFile(currentMarkdown);
    if (result.success) {
      showStatus(`File saved to: ${result.path}`, 'success');
      setTimeout(hideStatus, 3000);
    } else if (result.error !== 'Cancelled') {
      showStatus(`Failed to save: ${result.error}`, 'error');
    }
  }
});

// Handle clear button
clearBtn.addEventListener('click', () => {
  currentMarkdown = '';
  markdownPreview.textContent = '';
  previewContainer.style.display = 'none';
  hideStatus();
});

// Listen for menu actions
window.electronAPI.onMenuAction((event, action) => {
  if (action === 'menu-open-file') {
    browseBtn.click();
  } else if (action === 'menu-save-markdown') {
    if (currentMarkdown) {
      saveBtn.click();
    }
  }
});

// Cleanup on window close
window.addEventListener('beforeunload', () => {
  window.electronAPI.removeAllListeners();
});