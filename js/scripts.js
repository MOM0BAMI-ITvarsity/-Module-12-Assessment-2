// General DOM Ready (DOMContentLoaded) Event Listener
document.addEventListener('DOMContentLoaded', function() {
    console.log("Contact Book Plus is ready!");

    // Add additional page load functions or initializations here
});

// Utility function to show or hide an element
function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

// Example of dynamic table sorting (optional)
function sortTable(tableId, columnIndex, isNumeric = false) {
    const table = document.getElementById(tableId);
    const rows = Array.from(table.rows);
    const headerRow = rows.shift(); // Remove the header row temporarily

    // Sort the rows based on the column index
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        // Compare based on the content of the cells
        if (isNumeric) {
            return parseFloat(cellA) - parseFloat(cellB); // Numeric comparison
        }
        return cellA.localeCompare(cellB); // String comparison
    });

    // Reorder the rows in the table
    rows.forEach(row => table.appendChild(row));

    // Re-attach the header row
    table.insertBefore(headerRow, table.rows[0]);
}

// Example of loading the user profile (optional)
function loadUserProfile() {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
        const profile = JSON.parse(userProfile);
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');

        if (profileName) profileName.textContent = profile.name;
        if (profileEmail) profileEmail.textContent = profile.email;
        // Set a profile image or other user-specific info if applicable
    }
}

// Example of handling errors globally (optional)
function handleError(errorMessage) {
    console.error("Error:", errorMessage);
    alert("Oops! Something went wrong. Please try again.");
}

// Example of a smooth scroll function (for navigation)
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    }
}

// Example of an input field auto-format (optional, like phone number formatting)
function formatPhoneNumber(phoneInputId) {
    const phoneInput = document.getElementById(phoneInputId);
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let formattedValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
            if (formattedValue.length > 3 && formattedValue.length <= 6) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
            } else if (formattedValue.length > 6) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 6)}-${formattedValue.slice(6, 10)}`;
            }
            phoneInput.value = formattedValue;
        });
    }
}

// Example of a confirmation prompt for form submissions or deletions
function confirmAction(message, callback) {
    const confirmed = confirm(message);
    if (confirmed) {
        callback();
    }
}

// Example: Trigger the sorting of the contact table by first name
function sortContactsByFirstName() {
    sortTable('contactTable', 1); // Assuming first name is in column 1 (index 0 is the avatar)
}

// Example: Load contacts and render them dynamically
function renderContactsTable(data) {
    const tableBody = document.getElementById('contactTableBody');
    if (tableBody) {
        tableBody.innerHTML = ''; // Clear existing table content

        data.forEach(contact => {
            const row = document.createElement('tr');
            row.addEventListener('click', () => editContact(contact.id));

            row.innerHTML = `
                <td><img src="${rootPath}controller/uploads/${contact.avatar}" width="40" alt="Avatar"></td>
                <td><h5>${contact.firstname}</h5></td>
                <td><h5>${contact.lastname}</h5></td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Example of editing a contact (triggered when clicking on a table row)
function editContact(contactId) {
    window.open(`edit-contact.html?id=${contactId}`, '_self');
}

// Example of handling a form submission
function handleFormSubmission(formId, submitCallback) {
    const form = document.getElementById(formId);
    if (form && validateContactForm(formId)) {
        submitCallback(form);
    }
}
