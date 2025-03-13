document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page"); // Select all elements with the class "page"

    function showPage(pageId) { // Function to show a specific page and hide others
        pages.forEach((page) => (page.style.display = "none")); // Hide all pages
        document.getElementById(pageId).style.display = "block"; // Show the selected page
    }

    if (localStorage.getItem("loggedIn") === "true") { // Check if the user is logged in
        showPage("trackerPage"); // Show the tracker page if logged in
    } else { // Otherwise, show the login page
        showPage("loginPage");
    }

    function signup() { // Function to handle user sign-up
        const username = document.getElementById("signupUsername").value.trim(); // Get the username and password from the form
        const password = document.getElementById("signupPassword").value.trim();

        if (!username || !password) { // Check if username and password are there
            alert("Please enter a valid username and password.");
            return;
        }

        localStorage.setItem("user", JSON.stringify({ username, password })); // Save user credentials in localStorage
        alert("Sign-up successful! Please login.");
        showPage("loginPage"); // Redirect to the login page
    }

    function login() { // Function to handle user login
        const username = document.getElementById("loginUsername").value.trim(); // Get the username and password from the form
        const password = document.getElementById("loginPassword").value.trim();
        const storedUser = JSON.parse(localStorage.getItem("user")); // Retrieve stored user data from localStorage

        if (!storedUser || username !== storedUser.username || password !== storedUser.password) { // Check if the credentials match
            alert("Invalid username or password.");
            return;
        }

        localStorage.setItem("loggedIn", "true"); // Mark the user as logged in
        alert("Login successful!");
        showPage("trackerPage"); // Redirect to the tracker page
    }

    function logout() { // Function to handle user logout
        localStorage.removeItem("loggedIn"); // Remove the logged-in status from localStorage
        alert("Logged out successfully!");
        showPage("loginPage"); // Redirect to the login page
    }

    // Add event listeners to buttons
    document.getElementById("signupBtn").addEventListener("click", signup);
    document.getElementById("loginBtn").addEventListener("click", login);
    document.getElementById("logoutBtn").addEventListener("click", logout);

    // Add event listeners for navigation buttons
    document.getElementById("toLogin").addEventListener("click", () => showPage("loginPage"));
    document.getElementById("toSignup").addEventListener("click", () => showPage("signupPage"));
    document.getElementById("toTracker").addEventListener("click", () => {
        if (localStorage.getItem("loggedIn") === "true") { // Check if the user is logged in before showing the tracker page
            showPage("trackerPage");
        } else {
            alert("Please log in first.");
            showPage("loginPage");
        }
    });
});

function showNotification(message) {
    const notification = document.getElementById('notification'); // Get the notification element
    notification.innerText = message; // Set the notification text
    notification.style.display = 'block'; // Display the notification
}

// Check if the dark theme is enabled in localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode'); // Add the dark-mode class to the body
}

document.getElementById('themeToggle').addEventListener('click', function () { // Add event listener to the theme toggle button
    document.body.classList.toggle('dark-mode'); // Toggle the dark-mode class on the body

    // Save the user's theme preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Get references to form elements
    const habitInput = document.getElementById('habitInput');
    const monthSelect = document.getElementById('monthSelect');
    const weekSelect = document.getElementById('weekSelect');
    const dayCheckboxes = document.querySelectorAll('.dayCheckbox');
    const goalInputs = document.querySelectorAll('.goalInput');
    const goalCheckboxes = document.querySelectorAll('.goalCheckbox');
    const saveButton = document.getElementById('saveButton');
    const deleteButton = document.getElementById('deleteButton');
    const loadButton = document.getElementById('loadButton');

    loadButton.addEventListener('click', function () { // Add event listener to the "Load Data" button
        const fileInput = document.createElement('input'); // Create a file input element
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.onchange = function (event) {
            const file = event.target.files[0]; // Get the selected file
            const reader = new FileReader(); // Create a FileReader to read the file
            reader.onload = function (e) {
                const data = JSON.parse(e.target.result); // Parse the file contents into a JavaScript object
                loadData(data); // Load the data into the form
            };
            reader.readAsText(file); // Read the file as text
        };
        fileInput.click(); // Trigger the file input dialog
    });

    saveButton.addEventListener('click', function () { // Add event listener to the "Save" button
        const data = { // Create an object with the form data
            habit: habitInput.value,
            month: monthSelect.value,
            week: weekSelect.value,
            days: Array.from(dayCheckboxes).map(checkbox => checkbox.checked),
            goals: Array.from(goalInputs).map(input => input.value),
            goalChecks: Array.from(goalCheckboxes).map(checkbox => checkbox.checked)
        };

        // Create a Blob with the JSON data
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const url = URL.createObjectURL(blob); // Generate a URL for the Blob
        const a = document.createElement('a'); // Create an anchor element to trigger the download
        a.href = url;
        a.download = 'ecoPlanData.json';
        // Trigger the download
        a.click();
        // Revoke the URL to free up memory
        URL.revokeObjectURL(url);
        alert('Data saved to file!'); // Notify the user that the data has been saved
    });

    // Add event listener to the "Delete" button
    deleteButton.addEventListener('click', function () {
        alert('Data deleted!'); // Notify the user that the data has been deleted
        clearForm();
    });

    // Function to load data into the form
    function loadData(data) {
        habitInput.value = data.habit;
        monthSelect.value = data.month;
        weekSelect.value = data.week;

        // Restore the state of day checkboxes
        data.days.forEach((checked, index) => {
            dayCheckboxes[index].checked = checked;
        });

        // Restore the goal inputs
        data.goals.forEach((goal, index) => {
            goalInputs[index].value = goal;
        });

        // Restore the state of goal checkboxes
        data.goalChecks.forEach((checked, index) => {
            goalCheckboxes[index].checked = checked;
        });
    }

    // Function to clear the form
    function clearForm() {
        habitInput.value = '';
        monthSelect.value = 'January';
        weekSelect.value = '1';
        dayCheckboxes.forEach(checkbox => checkbox.checked = false);
        goalInputs.forEach(input => input.value = '');
        goalCheckboxes.forEach(checkbox => checkbox.checked = false);
    }
});
