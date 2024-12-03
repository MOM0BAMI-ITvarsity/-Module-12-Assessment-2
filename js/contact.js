/**
 * contact.js
 * Contains reusable functions for managing contacts in Contact Book Plus.
 */

// Fetch data from the server
function fetchFromServer(url, options = {}) {
    return fetch(url, options)
        .then(response => response.json())
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("An error occurred. Please try again.");
        });
}

// Fetch all contacts from the server
function fetchAllContacts() {
    return fetchFromServer(`${rootPath}controller/get-contacts/`);
}

// Fetch a single contact by ID
function fetchContactById(id) {
    return fetchFromServer(`${rootPath}controller/get-contacts/?id=${id}`);
}

// Add a new contact
function addContact(contactData) {
    const formData = new FormData();
    Object.keys(contactData).forEach(key => formData.append(key, contactData[key]));
    formData.append("apiKey", apiKey);

    return fetch(`${rootPath}controller/insert-contact/`, {
        method: "POST",
        body: formData,
        headers: {
            Accept: "application/json, *.*",
        },
    })
    .then(response => response.text())
    .then(data => {
        if (data === "1") {
            alert("Contact added successfully!");
            window.location.href = "index.html";
        } else {
            alert("Failed to add contact. Error: " + data);
        }
    })
    .catch(error => {
        console.error("Error adding contact:", error);
        alert("An error occurred. Please try again.");
    });
}

// Update an existing contact
function updateContact(contactData) {
    const formData = new FormData();
    Object.keys(contactData).forEach(key => formData.append(key, contactData[key]));
    formData.append("apiKey", apiKey);

    return fetch(`${rootPath}controller/edit-contact/`, {
        method: "POST",
        body: formData,
        headers: {
            Accept: "application/json, *.*",
        },
    })
    .then(response => response.text())
    .then(data => {
        if (data === "1") {
            alert("Contact updated successfully!");
            window.location.href = "index.html";
        } else {
            alert("Failed to update contact. Error: " + data);
        }
    })
    .catch(error => {
        console.error("Error updating contact:", error);
        alert("An error occurred. Please try again.");
    });
}

// Delete a contact by ID
function deleteContactById(id) {
    const confirmDelete = confirm("Are you sure you want to delete this contact?");
    if (!confirmDelete) return;

    return fetch(`${rootPath}controller/delete-contact/?id=${id}`)
        .then(response => response.text())
        .then(data => {
            if (data === "1") {
                alert("Contact deleted successfully!");
                window.location.href = "index.html";
            } else {
                alert("Failed to delete contact. Error: " + data);
            }
        })
        .catch(error => {
            console.error(`Error deleting contact with ID ${id}:`, error);
            alert("An error occurred. Please try again.");
        });
}

// Render contacts to a table
function renderContactsTable(contacts, tableElementId) {
    const table = document.getElementById(tableElementId);
    if (!contacts || contacts.length === 0) {
        table.innerHTML = `
            <p>No contacts found.</p>
        `;
        return;
    }

    const rows = contacts
        .map(contact => {
            const avatarUrl = `${rootPath}controller/uploads/${contact.avatar}`;
            return `
                <tr onclick="editContact(${contact.id})" class="table-row">
                    <td><img src="${avatarUrl}" alt="Avatar" width="40" class="rounded-circle"></td>
                    <td>${sanitizeText(contact.firstname)} ${sanitizeText(contact.lastname)}</td>
                    <td>${sanitizeText(contact.mobile)}</td>
                    <td>${sanitizeText(contact.email)}</td>
                </tr>`;
        })
        .join("");

    table.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>`;
}

// Utility: Open contact edit page
function editContact(id) {
    window.location.href = `edit-contact.html?id=${id}`;
}

// Utility: Sanitize text content to prevent XSS attacks
function sanitizeText(text) {
    const element = document.createElement('div');
    if (text) {
        element.textContent = text; // Use textContent to escape HTML
        return element.innerHTML;
    }
    return '';
}
