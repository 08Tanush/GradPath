        // Function to load categories from the database
        document.addEventListener("DOMContentLoaded", function () {
            fetch('/categories')
                .then(response => response.json())
                .then(data => {
                    const categorySelect = document.getElementById("category");
                    data.categories.forEach(category => {
                        const option = document.createElement("option");
                        option.value = category._id;
                        option.textContent = category.name;
                        categorySelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Error loading categories:', error));
        });
        
        // Function to load category-specific fields based on selected category
        function loadCategoryFields() {
            const categoryId = document.getElementById("category").value;
        
            // Clear previous fields
            const fieldsContainer = document.getElementById("categoryFields");
            fieldsContainer.innerHTML = '';
        
            if (categoryId) {
                fetch(`/categoryFields/${categoryId}`)
                    .then(response => response.json())
                    .then(data => {
                        data.fields.forEach(field => {
                            const div = document.createElement("div");
                            div.classList.add("form-group");
        
                            // Add label
                            const label = document.createElement("label");
                            label.textContent = field.field_name + ':';
                            div.appendChild(label);
        
                            // Add input based on field type
                            let input;
                            switch (field.field_type) {
                                case 'text':
                                case 'number':
                                case 'date':
                                    input = document.createElement("input");
                                    input.type = field.field_type;
                                    input.name = field.field_name;
                                    input.required = field.is_required;
                                    break;
                                case 'dropdown':
                                    input = document.createElement("select");
                                    input.name = field.field_name;
                                    input.required = field.is_required;
                                    const options = JSON.parse(field.options);
                                    for (let key in options) {
                                        const option = document.createElement("option");
                                        option.value = key;
                                        option.textContent = options[key];
                                        input.appendChild(option);
                                    }
                                    break;
                                case 'file':
                                    input = document.createElement("input");
                                    input.type = 'file';
                                    input.name = field.field_name;
                                    input.required = field.is_required;
                                    break;
                            }
                            div.appendChild(input);
                            fieldsContainer.appendChild(div);
                        });
                    })
                    .catch(error => console.error('Error loading category fields:', error));
            }
        }
        