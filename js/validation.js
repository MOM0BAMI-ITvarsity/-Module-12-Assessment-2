/**
 * validation.js
 * Contains functions to validate form fields in the Contact Book Plus app.
 */

// Validate non-empty fields
function validateRequiredFields(fields) {
    let valid = true;
    fields.forEach(field => {
        const value = document.getElementById(field).value.trim();
        if (value === "") {
            displayErrorMessage(field, `${field} is required.`);
            valid = false;
        } else {
            removeErrorMessage(field);
        }
    });
    return valid;
}

// Validate email format
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        displayErrorMessage("email", "Please enter a valid email address.");
        return false;
    }
    removeErrorMessage("email");
    return true;
}

// Validate phone number format
function validatePhoneNumber(phone) {
    const phonePattern = /^[0-9]{10}$/; // Simple check for a 10-digit number (can be adjusted for other formats)
    if (!phonePattern.test(phone)) {
        displayErrorMessage("mobile", "Please enter a valid 10-digit phone number.");
        return false;
    }
    removeErrorMessage("mobile");
    return true;
}

// Validate the avatar file (optional, if required)
function validateAvatarFile(file) {
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        displayErrorMessage("avatar", "Please upload a valid image file (JPG, JPEG, PNG).");
        return false;
    }
    removeErrorMessage("avatar");
    return true;
}

// Function to display error messages next to fields
function displayErrorMessage(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.textContent = message;
    if (!field.parentElement.querySelector(".error-message")) {
        field.parentElement.appendChild(errorElement);
    }
}

// Function to remove error messages
function removeErrorMessage(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = field.parentElement.querySelector(".error-message");
    if (errorElement) {
        errorElement.remove();
    }
}

// Example: Validate the form before adding or editing a contact
function validateContactForm(formId) {
    const form = document.getElementById(formId);
    const firstname = form.firstname.value.trim();
    const lastname = form.lastname.value.trim();
    const mobile = form.mobile.value.trim();
    const email = form.email.value.trim();
    const avatar = form.avatar.files[0];

    // Validate required fields
    const requiredFields = ["firstname", "lastname", "mobile", "email"];
    if (!validateRequiredFields(requiredFields)) {
        return false;
    }

    // Validate email and phone
    if (!validateEmail(email) || !validatePhoneNumber(mobile)) {
        return false;
    }

    // Validate avatar file if it's provided
    if (avatar && !validateAvatarFile(avatar)) {
        return false;
    }

    return true;
}
