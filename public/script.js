function showSignUp() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
}

function showLogin() {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

// Ensure the login form is visible by default
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
});



