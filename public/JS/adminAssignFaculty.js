async function fetchFaculties() {
  try {
    const response = await fetch('http://localhost:3000/users/getfaculty');
    return await response.json();
  } catch (error) {
    console.error("Error fetching faculties:", error);
    return [];
  }
}

async function fetchCategories() {
  try {
    const response = await fetch('http://localhost:3000/categories');
    const data = await response.json();
    console.log("Fetched categories:", data); // Log data to check contents
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

async function fetchExistingAssignments() {
  try {
    const response = await fetch('http://localhost:3000/facultyAssignments');
    return await response.json();
  } catch (error) {
    console.error("Error fetching existing assignments:", error);
    return [];
  }
}

async function populateFacultyAssignmentTable() {
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
    const allowedRole = 'admin';
    if (allowedRole !== role) {
      // Redirect to the user's dashboard if they are not authorized for this page
      alert('You are not allowed to view this page.');
      window.location.href = dashboards[role]||'../HTML/loginPage.html';
    }

  const faculties = await fetchFaculties();
  const categories = await fetchCategories();
  const existingAssignments = await fetchExistingAssignments();
  const tableBody = document.getElementById('facultyTableBody');
  
  tableBody.innerHTML = ""; // Clear table before re-populating

  faculties.forEach(faculty => {
    const row = document.createElement('tr');

    // Faculty Name Column
    const nameCell = document.createElement('td');
    nameCell.textContent = faculty.name;
    row.appendChild(nameCell);

    // Faculty Branch Column
    const branchCell = document.createElement('td');
    branchCell.textContent = faculty.branch;
    row.appendChild(branchCell);

    // Category Cell
    const categoryCell = document.createElement('td');
    const existingAssignment = existingAssignments.find(
      assignment => assignment.faculty_id === faculty._id
    );

    if (existingAssignment) {
      // If assigned, display as text
      const categoryText = document.createElement('span');
      categoryText.textContent = categories.find(cat => cat._id === existingAssignment.category_id)?.name || "Assigned Category";
      categoryCell.appendChild(categoryText);
      row.appendChild(categoryCell); 

      // Disable assignment button by displaying assigned status
      const assignedCell = document.createElement('td');
      assignedCell.textContent = "Assigned";
      row.appendChild(assignedCell);

    } else {
      // If not assigned, create dropdown
      const categoryDropdown = document.createElement('select');
      categoryDropdown.classList.add('categoryDropdown');

      const defaultOption = document.createElement('option');
      defaultOption.value = "";
      defaultOption.textContent = "Select Category";
      defaultOption.disabled = true;
      defaultOption.selected = true; // Ensure "Select Category" is selected initially
      categoryDropdown.appendChild(defaultOption);

      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category._id;
        option.textContent = category.name;
        categoryDropdown.appendChild(option);
      });

      categoryCell.appendChild(categoryDropdown);
      row.appendChild(categoryCell); // Add category cell to the row
      
      // Assign Button Cell
      const assignCell = document.createElement('td');
      const assignButton = document.createElement('button');
      assignButton.textContent = 'Assign';
      assignButton.classList.add('assignButton');

      assignButton.addEventListener('click', async () => {
        const selectedCategoryName = categoryDropdown.options[categoryDropdown.selectedIndex].text;
        const success = await assignCategoryToFaculty(faculty._id, categoryDropdown.value);
        if (success) {
          // Replace dropdown with plain text
          categoryCell.innerHTML = selectedCategoryName;
          assignButton.disabled = true;
          assignButton.textContent = 'Assigned';
          alert("${selectedCategoryName} has been assigned to ${faculty.name} successfully.");
        }
      });

      assignCell.appendChild(assignButton);
      row.appendChild(assignCell); // Add assign button cell if no assignment
    }

    tableBody.appendChild(row); // Add row to the table body
  });
}

async function assignCategoryToFaculty(faculty_id, category_id) {
  try {
    const response = await fetch('http://localhost:3000/facultyAssignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ faculty_id, category_id })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Category assigned successfully:', result);
      return true; // Return true on successful assignment
    } else {
      throw new Error('Failed to assign category');
    }
  } catch (error) {
    console.error('Error assigning category:', error);
    return false;
  }
}

// Initialize table on page load
document.addEventListener('DOMContentLoaded', populateFacultyAssignmentTable);