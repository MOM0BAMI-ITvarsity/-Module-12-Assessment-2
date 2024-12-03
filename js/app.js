/**
 * app.js
 * Main application script for Contact Book Plus.
 */

// Ensure the API key is valid before proceeding after the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    console.log("App initialized!");

    // Ensure API key is fetched after the DOM is fully loaded
    const apiKey = getApiKey(); // Reuses the function from config.js

    // Attach event listener for logout
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }

    // Any global initializations can go here
    loadAppTheme(); // Example: Load saved theme settings
});

/**
 * Logs the user out by removing the API key and redirecting to the API key entry page.
 */
function logout() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        localStorage.removeItem("apiKey");
        alert("Logged out successfully!");
        window.location.href = "enter-api-key.html";
    }
}

/**
 * Dynamically load app themes or other settings (if needed).
 */
function loadAppTheme() {
    const savedTheme = localStorage.getItem("theme") || "default";
    document.body.classList.add(savedTheme);

    // Example: Apply dark mode styles via CSS classes
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme"); // Assume 'dark-theme' is defined in your CSS
    }
}

/**
 * Utility function to display a loading spinner.
 * @param {boolean} show - Whether to show or hide the spinner.
 */
function toggleLoadingSpinner(show) {
    let spinner = document.getElementById("loadingSpinner");

    if (!spinner && show) {
        // Only create and append if it doesn't exist and we need to show it
        spinner = document.createElement("div");
        spinner.id = "loadingSpinner";
        spinner.innerHTML = '<div class="spinner-border text-primary" role="status"></div>';
        document.body.appendChild(spinner);
    }

    if (spinner) {
        spinner.style.display = show ? "block" : "none";
    }
}
