document.addEventListener('DOMContentLoaded', async () => {
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
    try {
      const response = await fetch('http://localhost:3000/dashboard/stats');
      const data = await response.json();
  
      document.querySelector('.box1 .number').textContent = data.studentCount;
      document.querySelector('.box2 .number').textContent = data.facultyCount;
      document.querySelector('.box3 .number').textContent = data.assignedFacultyCount;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  });