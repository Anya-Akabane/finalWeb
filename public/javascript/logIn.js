const showPassword = document.querySelector("#show-password");
const passwordField = document.querySelector("#password");

showPassword.addEventListener("click", function(){
    this.classList.toggle("fa-eye");
    const type = passwordField.getAttribute("type") === "password" ?"text" : "password";

    passwordField.setAttribute("type",type);
})


document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); 

    swal("Wellcom Back!", "Enjoy your momment :333", "success");
    document.getElementById("form").submit(); // Manually submit the form
  
});
