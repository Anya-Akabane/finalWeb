var dropZone = document.getElementById('drop-zone');
var fileInput = document.getElementById('photos');
var file;

dropZone.ondragover = function() {
  this.style.borderColor = '#999';
  return false;
};

dropZone.ondragleave = function() {
  this.style.borderColor = '#bbb';
  return false;
};

dropZone.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      fileInput.click();
  }
});

dropZone.addEventListener('click', function() {
    fileInput.click();
});

function previewImage() {
  var preview = document.getElementById('imagePreview');
  var img = document.createElement('img');
  img.style.maxWidth = '300px';

  var container = document.createElement('div');
  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = "<i class='bx bx-trash'></i>";
  deleteButton.className = 'deleteBtn';
  deleteButton.setAttribute('aria-label', 'Delete');

  container.appendChild(img);
  container.appendChild(deleteButton);
  preview.appendChild(container);

  var reader = new FileReader();
  reader.onload = (function(aImg) { 
    return function(e) { 
      aImg.src = e.target.result; 
    }; 
  })
  (img);
  reader.readAsDataURL(file);
}

dropZone.ondrop = function(e) {
    e.preventDefault();
    this.style.borderColor = '#bbb';
    
    if (file) {
      alert("You can only upload one image.");
      return;
    }
    
    file = Array.from(e.dataTransfer.files).find(file => {
      if (!file.type.startsWith('image/')) {
        alert("Only image files are allowed.");
        return false;
      }
      return true;
    });
    
    if (file) {
      fileInput.files = new DataTransfer().items.add(file).files;
      previewImage();
    }
};

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('deleteBtn') || e.target.parentNode.classList.contains('deleteBtn')) {
      file = null;
      e.target.closest('.deleteBtn').parentNode.remove();
      fileInput.files = new DataTransfer().files;
    }
});

fileInput.onchange = function() {
    if (file) {
      alert("You can only upload one image.");
      return;
    }
  
    file = Array.from(fileInput.files).find(file => {
      if (!file.type.startsWith('image/')) {
        alert("Only image files are allowed.");
        fileInput.value = '';
        return false;
      }
      return true;
    });
    if (file) {
      previewImage();
    }
};