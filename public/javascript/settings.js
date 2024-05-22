
// // Path: public/javascript/settings.js

document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById('name').value;
  var nickName = document.getElementById('nickName').value;
  var bio = document.getElementById('bio').value;
  var gender = document.getElementById('genders').value;
  var birthdate = document.getElementById('birthdate').value;

  var errorMessage = "";

  if (!name) {
    errorMessage += "Name field must be filled out!\n";
    document.getElementById('name').classList.add('error');
  } else {
    document.getElementById('name').classList.remove('error');
    document.getElementById('name').classList.add('success');
  }

  if (!nickName) {
    errorMessage += "Nickname field must be filled out!\n";
    document.getElementById('nickName').classList.add('error');
  } else {
    document.getElementById('nickName').classList.remove('error');
    document.getElementById('nickName').classList.add('success');
  }

  if (!bio) {
    errorMessage += "Bio field must be filled out!\n";
    document.getElementById('bio').classList.add('error');
  } else {
    document.getElementById('bio').classList.remove('error');
    document.getElementById('bio').classList.add('success');
  }

  if (!gender) {
    errorMessage += "Gender field must be filled out!\n";
    document.getElementById('genders').classList.add('error');
  } else {
    document.getElementById('genders').classList.remove('error');
    document.getElementById('genders').classList.add('success');
  }

  if (!birthdate) {
    errorMessage += "Birthdate field must be filled out!\n";
    document.getElementById('birthdate').classList.add('error');
  } else {
    document.getElementById('birthdate').classList.remove('error');
    document.getElementById('birthdate').classList.add('success');
  }

  if (errorMessage) {
    swal("Oops!", errorMessage, "error");
  } else {
    swal("Good job!", "Form submitted successfully!", "success");
  }
});