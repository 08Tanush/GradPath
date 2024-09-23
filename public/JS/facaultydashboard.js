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