document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page"); //Select all elements with class page

    function showPage(pageId) { //Function to show a specific page while hiding others
        pages.forEach((page) => (page.style.display = "none")); //Hide all pages
        document.getElementById(pageId).style.display = "block"; //Show the selected page
    }

    if (localStorage.getItem("loggedIn") === "true") { //Check if the user is logged in when the page loads
        showPage("trackerPage"); //Show tracker page if logged in
    } else {
        showPage("loginPage"); //Otherwise, show login page
    }

    function signup() { //Sign-up function to register a new user
        const username = document.getElementById("signupUsername").value.trim();
        const password = document.getElementById("signupPassword").value.trim();

        if (!username || !password) {
            alert("Please enter a valid username and password.");
            return;
        }

        localStorage.setItem("user", JSON.stringify({ username, password })); //Save user credentials in localStorage
        alert("Sign-up successful! Please login.");
        showPage("loginPage"); //Redirect to login page
    }

    function login() { //Login function to authenticate the user
        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        const storedUser = JSON.parse(localStorage.getItem("user")); //Retrieve stored user data

        if (!storedUser || username !== storedUser.username || password !== storedUser.password) { //Check login credentials
            alert("Invalid username or password.");
            return;
        }

        localStorage.setItem("loggedIn", "true"); //Mark user as logged in
        alert("Login successful!");
        showPage("trackerPage"); //Redirect to tracker page
    }

    function logout() { //Logout function to clear session
        localStorage.removeItem("loggedIn"); //Remove login status from localStorage
        alert("Logged out successfully!");
        showPage("loginPage"); //Redirect to login page
    }

    document.getElementById("signupBtn").addEventListener("click", signup); //Event listeners for buttons
    document.getElementById("loginBtn").addEventListener("click", login);
    document.getElementById("logoutBtn").addEventListener("click", logout);

    document.getElementById("toLogin").addEventListener("click", () => showPage("loginPage")); //Navigation buttons to switch between pages
    document.getElementById("toSignup").addEventListener("click", () => showPage("signupPage"));
    document.getElementById("toTracker").addEventListener("click", () => {
        if (localStorage.getItem("loggedIn") === "true") {
            showPage("trackerPage");
        } else {
            alert("Please log in first.");
            showPage("loginPage");
        }
    });
});

function showNotification(message) { //Function that shows the notification
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
}

if (localStorage.getItem('theme') === 'dark') { //Check if dark mode preference is stored in localStorage and apply it
    document.body.classList.add('dark-mode'); //Apply dark mode if stored preference is 'dark'
}

document.getElementById('themeToggle').addEventListener('click', function () { //Event listener for theme toggle button
    document.body.classList.toggle('dark-mode'); //Toggle dark mode class

    //Save the user's theme preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const habitInput = document.getElementById('habitInput');
    const monthSelect = document.getElementById('monthSelect');
    const weekSelect = document.getElementById('weekSelect');
    const dayCheckboxes = document.querySelectorAll('.dayCheckbox');
    const goalInputs = document.querySelectorAll('.goalInput');
    const goalCheckboxes = document.querySelectorAll('.goalCheckbox');
    const saveButton = document.getElementById('saveButton');
    const deleteButton = document.getElementById('deleteButton');

    loadData(); //Load saved habit-tracking data on page load

    saveButton.addEventListener('click', function () { //Event listener for save button
        const data = {
            habit: habitInput.value, //Store habit input
            month: monthSelect.value, //Store selected month
            week: weekSelect.value, //Store selected week
            days: Array.from(dayCheckboxes).map(checkbox => checkbox.checked), //Store checked days
            goals: Array.from(goalInputs).map(input => input.value), //Store goal inputs
            goalChecks: Array.from(goalCheckboxes).map(checkbox => checkbox.checked) //Store goal checkboxes
        };

        localStorage.setItem('ecoPlanData', JSON.stringify(data)); //Save data to localStorage
        alert('Data saved!');
    });

    deleteButton.addEventListener('click', function () { //Event listener for delete button
        localStorage.removeItem('ecoPlanData'); //Remove stored data
        alert('Data deleted!');
        clearForm(); //Reset form fields
    });

    function loadData() { //Function to load saved data from localStorage
        const data = JSON.parse(localStorage.getItem('ecoPlanData'));
        if (data) {
            habitInput.value = data.habit;
            monthSelect.value = data.month;
            weekSelect.value = data.week;

            data.days.forEach((checked, index) => {  //Restore checkbox states
                dayCheckboxes[index].checked = checked;
            });

            data.goals.forEach((goal, index) => { //Restore goal inputs
                goalInputs[index].value = goal;
            });

            data.goalChecks.forEach((checked, index) => { //Restore goal checkbox states
                goalCheckboxes[index].checked = checked;
            });
        }
    }

    // Function to clear all form fields
    function clearForm() {
        habitInput.value = '';
        monthSelect.value = 'January'; //Reset month to default
        weekSelect.value = '1'; //Reset week to default
        dayCheckboxes.forEach(checkbox => checkbox.checked = false); //Uncheck all checkboxes
        goalInputs.forEach(input => input.value = ''); //Clear goal inputs
        goalCheckboxes.forEach(checkbox => checkbox.checked = false); //Uncheck goal checkboxes
    }
});
