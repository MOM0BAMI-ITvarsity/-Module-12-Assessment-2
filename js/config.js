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

    // If no API key is found, alert the user and redirect
    if (!storedApiKey) {
        alert("No API key found. Please enter a valid API key.");
        // Optionally, store the current location to return later
        localStorage.setItem("redirectAfterApiKey", window.location.href);
        window.location.href = "enter-api-key.html";
        return null; // Return null or an empty string
    }
    
    // Optional: Add any validation logic for the API key format here, if necessary
    // For example:
    // if (!isValidApiKey(storedApiKey)) {
    //    alert("Invalid API key format.");
    //    return null;
    // }

    return storedApiKey;
}

// Optional: Example validation function for API key format (customize as per your requirements)
function isValidApiKey(apiKey) {
    const apiKeyPattern = /^[a-zA-Z0-9]{32}$/; // Example for a 32-character alphanumeric key
    return apiKeyPattern.test(apiKey);
}
