let themeStylesheet = document.getElementById('quill-theme-stylesheet');


const quill = new Quill('#editor', {
  modules: {
    toolbar: '#toolbar-container'
  },
placeholder: 'Compose an epic...',
  theme: 'snow'
});

// Create a new MutationObserver instance
let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === "class") {
        let classList = mutation.target.classList;
        if (classList.contains('dark')) {
          themeStylesheet.href = "/public/css/quill.smoke.css";
        } else {
          themeStylesheet.href = "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css";
        }
      }
    });
  });
  
  // Start observing the body element for attribute changes
  observer.observe(body, { attributes: true });

document.querySelector('form').addEventListener('submit', function(e) {
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'editorContent');
    hiddenInput.setAttribute('value', text);
    this.appendChild(hiddenInput);
});