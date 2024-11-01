// Function to approve activity
function approveActivity(activityId) {
    const statusElement = document.getElementById(`status-${activityId}`);
    statusElement.textContent = "Approved";
    statusElement.style.color = "green";
    console.log(`Activity ${activityId} approved.`);
}

// Function to disapprove activity
function disapproveActivity(activityId) {
    const statusElement = document.getElementById(`status-${activityId}`);
    statusElement.textContent = "Disapproved";
    statusElement.style.color = "red";
    console.log(`Activity ${activityId} disapproved.`);
}

// Sidebar toggle functionality
const sidebarToggle = document.querySelector('.sidebar-toggle');
const nav = document.querySelector('nav');

sidebarToggle.addEventListener('click', () => {
    nav.classList.toggle('close');
});

// const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
//     const role = localStorage.getItem('role');
//     if (!token || !userId) {
//       alert('Session expired or invalid. Please log in again.');
//       window.location.href = '../HTML/loginPage.html';  
//       return;
//     }
  
//     // Define allowed roles for each page
//     const dashboards = {
//       'student':'/public/HTML/studentDashboard.html',
//       'faculty':'/public/HTML/facultyDashboard.html',
//       'admin':'/public/HTML/adminDashboard.html',
//     };

//     // Get current page path
//     const currentPage = window.location.pathname;

//     // Check if the role has access to the current page
//     const allowedRole = 'faculty';
//     if (allowedRole !== role) {
//       // Redirect to the user's dashboard if they are not authorized for this page
//       alert('You are not allowed to view this page.');
//       window.location.href = dashboards[role]||'../HTML/loginPage.html';
//     }
