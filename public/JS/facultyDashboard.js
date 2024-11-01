const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})
// Assuming you already have some JS logic for fetching other data
// Add this to dynamically update the notification count

const notifications = [
    { type: 'AI-ML Certificate', description: 'New activity uploaded by Prem Shahi', time: '10 minutes ago' },
    { type: 'Sports Achievement', description: 'New activity uploaded by Deepa Chand', time: '30 minutes ago' },
];

const notificationCount = document.getElementById('notificationCount');
notificationCount.textContent = notifications.length;

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