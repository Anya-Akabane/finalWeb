document
  .getElementById("profileForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Fetch form data
    const formData = new FormData(this);

    // You can do further validation here

    // Show alert
    showAlert("Changes saved successfully!", "success");
  });

function showAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.appendChild(document.createTextNode(message));

  const container = document.querySelector(".container");
  const form = document.getElementById("profileForm");
  container.insertBefore(alertDiv, form);

  // Remove alert after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
}
