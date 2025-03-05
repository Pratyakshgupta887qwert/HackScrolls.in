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


const toggleButton = document.getElementById("darkModeToggle");

window.onload = () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleButton.src = "assets/darkmode.png";
    }
};

toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleButton.src = "assets/darkmode.png";
    } else {
        localStorage.setItem("theme", "light");
        toggleButton.src = "assets/lightmode.png";
    }
});
