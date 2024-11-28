/**
 * validation.js
 * Contains functions to validate form fields in the Contact Book Plus app.
 */

// Validate non-empty fields
function validateRequiredFields(fields) {
    for (const field of fields) {
        const value = document.getElementById(field).value.trim();
        if (value === "") {
            alert(`Please fill out the ${field} field.`);
            return false;
        }
    }
    return true;
}

// Validate email format
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    return true;
}

// Validate phone number format
function validatePhoneNumber(phone) {
    const phonePattern = /^[0-9]{10}$/; // Simple check for a 10-digit number (can be adjusted for other formats)
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }
    return true;
}

// Validate the avatar file (optional, if required)
function validateAvatarFile(file) {
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        alert("Please upload a valid image file (JPG, JPEG, PNG).");
        return false;
    }
    return true;
}

// Example: Validate the form before adding or editing a contact
function validateContactForm(formId) {
    const form = document.getElementById(formId);
    const firstname = form.firstname.value.trim();
    const lastname = form.lastname.value.trim();
    const mobile = form.mobile.value.trim();
    const email = form.email.value.trim();
    const avatar = form.avatar.files[0];

    if (!firstname || !lastname || !mobile || !email) {
        alert("All fields are required.");
        return false;
    }

    if (!validateEmail(email)) {
        return false;
    }

    if (!validatePhoneNumber(mobile)) {
        return false;
    }

    if (avatar && !validateAvatarFile(avatar)) {
        return false;
    }

    return true;
}
