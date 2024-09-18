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

// Function to toggle profile dropdown visibility
function toggleDropdown() {
    const dropdown = document.getElementById("profile-dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Close the dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('.profile-icon')) {
        const dropdown = document.getElementById("profile-dropdown");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
}
