document.addEventListener('DOMContentLoaded', function() {
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
                case 'datetime-local':  // You can use 'datetime-local' for better browser support
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

document.getElementById('activityForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const categoryFields = [];
    // Collect all category fields
    const fields = document.querySelectorAll('#categoryFields input, #categoryFields select');
    fields.forEach(field => {
        const fieldId = field.name.split('_')[1]; // Extract field ID from name
        categoryFields.push({
            field_id: fieldId,
            field_value: field.value
        });
    });

    // Prepare the form data
    const formData = new FormData(this);
    formData.append('categoryFields', JSON.stringify(categoryFields)); // Append category fields

    // Send the form data to the server
    fetch('/uploadActivity', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Optionally redirect or reset the form
    })
    .catch(error => console.error('Error submitting form:', error));
});


// Load categories on page load
window.addEventListener('DOMContentLoaded', loadCategories);
