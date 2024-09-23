// JavaScript to handle sidebar toggle, search bar, and faculty assignment logic

// Sidebar Toggle
const sidebar = document.querySelector("nav");
const sidebarToggle = document.querySelector(".sidebar-toggle");

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

// Dark Mode Toggle
const modeSwitch = document.querySelector(".mode-toggle .switch");
const body = document.querySelector("body");

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});

// Faculty Assignment Dropdown Logic
const facultyDropdowns = document.querySelectorAll(".faculty-dropdown");

facultyDropdowns.forEach(dropdown => {
    dropdown.addEventListener("change", (event) => {
        const selectedFaculty = event.target.value;
        if (selectedFaculty) {
            alert(`Faculty ${selectedFaculty} assigned!`);
            // Here, you can also make an AJAX call to the server to save this assignment
        }
    });
});

// Search Button Functionality
const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () => {
    const query = searchBar.value.toLowerCase();
    alert(`Searching for "${query}"...`);
    // Implement your search functionality here
});
