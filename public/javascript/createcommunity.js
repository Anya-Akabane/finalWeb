var dropZone = document.getElementById('drop-zone');
var fileInput = document.getElementById('photos');
let filesArray = [];

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

dropZone.addEventListener('click', function() {
    fileInput.click();
});

function previewImages() {
  var preview = document.getElementById('imagePreview');
  var files = fileInput.files;

  // If files contains more than one file, keep only the first file, alert the user, and return
  if (files.length > 1) {
    files = Array.from(files).slice(0, 1);
    alert("You can only upload one image.");
  }

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var img = document.createElement('img');
    img.style.maxWidth = '300px'; // set max width to limit the size of the preview images

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
  fileInput.value = ''; // clear the file input for additional uploads
}

// This function handles the 'ondrop' event for the drop zone. It's triggered when the user drags and drops files onto the drop zone, unlike the 'onchange' event which is triggered when files are selected via the file input dialog.
dropZone.ondrop = function(e) {
    // Prevent the browser's default behavior for file drops, which would be to open the file
    e.preventDefault();
  
    // Change the border color of the drop zone to indicate that the drop event has ended
    this.style.borderColor = '#bbb';
    
    // Convert the FileList from the drop event to an array and filter it
    // This allows us to use array methods and remove files that don't meet our criteria
    filesArray = Array.from(e.dataTransfer.files).filter(file => {
      // Only allow image files
      if (!file.type.startsWith('image/')) {
        alert("Only image files are allowed.");
        return false;
      }
      return true;
    });
    
    // Create a new DataTransfer object
    // This is a workaround because the FileList object is read-only and we can't add or remove files directly
    let dt = new DataTransfer();
    
    // Add the files from filesArray to the DataTransfer object
    // This allows us to create a new FileList that includes the dropped files
    filesArray.forEach(file => dt.items.add(file));
    
    // Update fileInput.files with the FileList from the DataTransfer object
    // This ensures that fileInput.files reflects the current state of filesArray after the file is dropped
    fileInput.files = dt.files;
    
    // Call the previewImages function to update the image previews
    previewImages();
  };

// Add an event listener for click events on the document
document.addEventListener('click', function(e) {
    // Check if the clicked element is a delete button or a child of a delete button
    if (e.target.classList.contains('deleteBtn') || e.target.parentNode.classList.contains('deleteBtn')) {
      // Find the index of the delete button in the list of all delete buttons
      let index = Array.from(document.querySelectorAll('.deleteBtn')).indexOf(e.target.closest('.deleteBtn'));
      
      // Remove the corresponding file from filesArray
      filesArray.splice(index, 1);
      
      // Remove the image preview
      e.target.closest('.deleteBtn').parentNode.remove();
      
      // Create a new DataTransfer object
      let dt = new DataTransfer();
      
      // Add the remaining files in filesArray to the DataTransfer object
      filesArray.forEach(file => dt.items.add(file));
      
      // Update fileInput.files with the FileList from the DataTransfer object
      // This ensures that fileInput.files reflects the current state of filesArray after the file is deleted
      fileInput.files = dt.files;
    }
  });

// When files are selected or dropped, add them to the filesArray
// Validate file types and sizes before adding them to filesArray
fileInput.onchange = function() {
    // If filesArray already contains a file, alert the user and return
    if (filesArray.length >= 1) {
      alert("You can only upload one image.");
      return;
    }
  
    filesArray = Array.from(fileInput.files).filter(file => {
      // Only allow image files
      if (!file.type.startsWith('image/')) {
        alert("Only image files are allowed.");
        fileInput.value = ''; // Clear the file input
        return false;
      }
      return true;
    });
    previewImages();
};
