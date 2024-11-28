// Base URL for the API
const rootPath = "https://mysite.itvarsity.org/api/ContactBook/";

// Fetch and validate API key
const apiKey = getApiKey();

/**
 * Function to check and retrieve the API key from local storage.
 * If no API key is found, the user is redirected to the API key entry page.
 * 
 * @returns {string} - The API key from local storage.
 */
function getApiKey() {
    const storedApiKey = localStorage.getItem("apiKey");
    if (!storedApiKey) {
        alert("No API key found. Please enter a valid API key.");
        window.location.href = "enter-api-key.html";
    }
    return storedApiKey;
}
