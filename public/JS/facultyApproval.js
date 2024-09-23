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
