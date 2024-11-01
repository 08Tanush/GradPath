document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    const role = localStorage.getItem('role');
    if (!token || !userId) {
      alert('Session expired or invalid. Please log in again.');
      window.location.href = '../HTML/loginPage.html';  
      return;
    }
  
    // Define allowed roles for each page
    const dashboards = {
      'student':'/public/HTML/studentDashboard.html',
      'faculty':'/public/HTML/facultyDashboard.html',
      'admin':'/public/HTML/adminDashboard.html',
    };

    // Get current page path
    const currentPage = window.location.pathname;

    // Check if the role has access to the current page
    const allowedRole = 'student';
    if (allowedRole !== role) {
      // Redirect to the user's dashboard if they are not authorized for this page
      alert('You are not allowed to view this page.');
      window.location.href = dashboards[role]||'../HTML/loginPage.html';
    }

    // Add userId to links in the navbar
    document.getElementById('homeLink').href = `./studentDashboard.html`;
    document.getElementById('postLink').href = `./addActivity.html`;
    document.getElementById('portfolioLink').href = `./portfolio2.html`;
    document.getElementById('profileLink').href = `./Profile.html`;
    
    document.getElementById('logoutLink').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId'); // Clear userId on logout
        window.location.href = './loginPage.html';
    });

    loadCategories();
});

// Function to fetch categories from the server and populate the dropdown
async function loadCategories() {
    try {
        const response = await fetch('http://localhost:3000/categories'); // Call the backend route
        const categories = await response.json(); // Parse the response as JSON

        const categorySelect = document.getElementById('category');
        categorySelect.innerHTML = '<option value="" disabled selected>Select a category</option>'; // Default option

        // Populate the dropdown with categories
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category._id; // Set the value to the category ID
            option.textContent = category.name; // Set the displayed text to the category name
            categorySelect.appendChild(option);
        });
    } catch (err) {
        console.error('Failed to load categories', err);
    }
}

// Function to load category-specific fields when a category is selected
async function loadCategoryFields() {
    const categoryId = document.getElementById('category').value;
    const categoryFieldsContainer = document.getElementById('categoryFields');

    // Clear any existing fields
    categoryFieldsContainer.innerHTML = '';

    if (!categoryId) return;

    try {
        const response = await fetch(`http://localhost:3000/categories/${categoryId}/fields`);
        const fields = await response.json();

        fields.forEach(field => {
            const fieldDiv = document.createElement('div');
            fieldDiv.classList.add('form-group');

            const label = document.createElement('label');
            label.textContent = field.field_name;

            let input;
            switch (field.field_type) {
                case 'text':
                case 'number':
                    input = document.createElement('input');
                    input.type = field.field_type;
                    input.id = field.field_name;
                    input.name = field.field_name;
                    if (field.is_required) input.required = true;
                    break;

                case 'file':
                    input = document.createElement('input');
                    input.type = 'file';
                    input.id = field.field_name;
                    input.name = field.field_name;
                    if (field.is_required) input.required = true;
                    break;

                case 'dropdown':
                    input = document.createElement('select');
                    input.id = field.field_name;
                    input.name = field.field_name;
                    if (field.is_required) input.required = true;

                    // Dropdown options (assuming field.options is a JSON string)
                    const options = JSON.parse(field.options);
                    options.forEach(option => {
                        const optionElem = document.createElement('option');
                        optionElem.value = option;
                        optionElem.textContent = option;
                        input.appendChild(optionElem);
                    });
                    break;

                case 'textarea':
                    input = document.createElement('textarea');
                    input.id = field.field_name;
                    input.name = field.field_name;
                    if (field.is_required) input.required = true;
                    break;

                case 'date':
                case 'datetime':
                case 'datetime-local':
                    input = document.createElement('input');
                    input.type = 'datetime-local';
                    input.id = field.field_name;
                    input.name = field.field_name;
                    if (field.is_required) input.required = true;
                    break;

                case 'radio':
                    input = document.createElement('div'); // Create a div to contain the radio buttons
                    const radioOptions = JSON.parse(field.options);
                    radioOptions.forEach(option => {
                        const radioDiv = document.createElement('div');
                        const radioInput = document.createElement('input');
                        radioInput.type = 'radio';
                        radioInput.name = field.field_name;
                        radioInput.value = option;
                        if (field.is_required) radioInput.required = true;

                        const radioLabel = document.createElement('label');
                        radioLabel.textContent = option;
                        radioLabel.htmlFor = radioInput.id;

                        radioDiv.appendChild(radioInput);
                        radioDiv.appendChild(radioLabel);
                        input.appendChild(radioDiv);
                    });
                    break;

                case 'checkbox':
                    input = document.createElement('div'); // Create a div to contain the checkboxes
                    const checkboxOptions = JSON.parse(field.options);
                    checkboxOptions.forEach(option => {
                        const checkboxDiv = document.createElement('div');
                        const checkboxInput = document.createElement('input');
                        checkboxInput.type = 'checkbox';
                        checkboxInput.name = field.field_name;
                        checkboxInput.value = option;

                        const checkboxLabel = document.createElement('label');
                        checkboxLabel.textContent = option;
                        checkboxLabel.htmlFor = checkboxInput.id;

                        checkboxDiv.appendChild(checkboxInput);
                        checkboxDiv.appendChild(checkboxLabel);
                        input.appendChild(checkboxDiv);
                    });
                    break;

                default:
                    console.error(`Unknown field type: ${field.field_type}`);
                    break;
            }

            fieldDiv.appendChild(label);
            fieldDiv.appendChild(input);
            categoryFieldsContainer.appendChild(fieldDiv);
        });
    } catch (error) {
        console.error('Error fetching category fields:', error);
    }
}

// Load categories on page load
window.addEventListener('DOMContentLoaded', loadCategories);

// Handle form submission
document.getElementById('activity-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    // Fetch the category fields and include them in the formData
    const fields = [];
    document.querySelectorAll('.category-field').forEach(field => {
        fields.push({
            field_id: field.getAttribute('data-field-id'), // Get field_id from data-field-id
            field_value: field.value // Get field value
        });
    });

    // Append the fields array to the formData
    formData.append('fields', JSON.stringify(fields));

    // Append visibility to formData
    const visibility = document.querySelector('input[name="visibility"]:checked');
    if (visibility) {
        formData.append('visibility', visibility.value);
    }

    try {
        // Get the token from localStorage
        const token = localStorage.getItem('token'); // Assumes the token is stored under 'token'

        // Make sure the token exists before making the request
        if (!token) {
            alert('You are not authenticated. Please log in first.');
            return;
        }

        const response = await fetch('http://localhost:3000/activities/create', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}` // Attach the token in the Authorization header
            }
        });

        const result = await response.json();

        if (response.ok) {
            alert('Activity created successfully!');
            window.location.href = '/public/HTML/studentDashboard.html'; // Redirect to the dashboard
        } else {
            alert(result.message || 'Error creating activity');
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});
