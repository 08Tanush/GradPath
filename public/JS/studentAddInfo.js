document.addEventListener("DOMContentLoaded", () => {
    const studentInfoForm = document.getElementById("studentInfoForm");

    studentInfoForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from reloading page

        const formData = new FormData(studentInfoForm);

        const studentInfo = {
            name: formData.get("name"),
            class: formData.get("class"),
            branch: formData.get("branch"),
            currentPosition: formData.get("currentPosition"),
            sinceWhen: formData.get("sinceWhen"),
            about: formData.get("about")
        };

        // You can replace this alert with an AJAX request to send the data to your backend
        alert(`Information Submitted Successfully:\n${JSON.stringify(studentInfo, null, 2)}`);

        // Optionally, reset the form
        studentInfoForm.reset();
    });
});
