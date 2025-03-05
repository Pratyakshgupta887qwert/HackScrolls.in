document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("darkModeToggle");

    if (!toggleButton) {
        console.error("Error: darkModeToggle element not found!");
        return;
    }

    // Load dark mode if saved in localStorage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleButton.src = "assets/darkmode.png";
    }

    // Toggle dark mode on button click
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
});
