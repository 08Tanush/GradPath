// Toggle dropdown function for the profile section
function toggleDropdown() {
    var dropdown = document.getElementById("profile-dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Add event listener for clicking outside the dropdown
window.onclick = function(event) {
    if (!event.target.matches('.profile') && !event.target.matches('.profile-icon')) {
        var dropdowns = document.getElementsByClassName("profile-dropdown");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
};
