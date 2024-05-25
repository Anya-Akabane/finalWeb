var dropZone = document.getElementById('drop-zone');
var fileInput = document.getElementById('photos');

// When the user drags files over the drop zone, change the color of the border
dropZone.ondragover = function() {
  this.style.borderColor = '#999';
  return false;
};

// When the user stops dragging files over the drop zone, change the color of the border back to its original color
dropZone.ondragleave = function() {
  this.style.borderColor = '#bbb';
  return false;
};

dropZone.addEventListener('keydown', function(event) {
  // Check if the key pressed was either Enter or Space
  if (event.key === 'Enter' || event.key === ' ') {
      // Prevent the default action to stop scrolling when Space is pressed
      event.preventDefault();
      // Trigger the click event on the file input
      fileInput.click();
  }
});

// When the user drops files on the drop zone, get the files and trigger the file input field's change event
dropZone.ondrop = function(e) {
  e.preventDefault(); // This is necessary to prevent the browser from opening the files
  this.style.borderColor = '#bbb';
  fileInput.files = e.dataTransfer.files;
  previewImages();
};

document.getElementById('drop-zone').addEventListener('click', function() {
  document.getElementById('photos').click();
});

function previewImages() {
  var preview = document.getElementById('imagePreview');
  var files = document.getElementById('photos').files;

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var img = document.createElement('img');
    img.style.maxWidth = '300px'; // set max width to limit the size of the preview images

    var container = document.createElement('div');
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = "<i class='bx bx-trash'></i>";
    deleteButton.className = 'deleteBtn';
    
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
  document.getElementById('photos').value = ''; // clear the file input for additional uploads
}

document.addEventListener('click', function(e) {
  // Check if the clicked element is a delete button
  if (e.target.classList.contains('deleteBtn') || e.target.parentNode.classList.contains('deleteBtn')) {
    e.target.closest('.deleteBtn').parentNode.remove();
  }
});