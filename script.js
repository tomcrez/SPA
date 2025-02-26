document.addEventListener('DOMContentLoaded', function() { //The function to save all the data user inputs
    const habitInput = document.getElementById('habitInput');
    const monthSelect = document.getElementById('monthSelect');
    const weekSelect = document.getElementById('weekSelect');
    const dayCheckboxes = document.querySelectorAll('.dayCheckbox');
    const goalInputs = document.querySelectorAll('.goalInput');
    const goalCheckboxes = document.querySelectorAll('.goalCheckbox');
    const saveButton = document.getElementById('saveButton');
    const deleteButton = document.getElementById('deleteButton');

    loadData(); //Load saved data

    saveButton.addEventListener('click', function() { //Button to save the data
        const data = {
            habit: habitInput.value,
            month: monthSelect.value,
            week: weekSelect.value,
            days: Array.from(dayCheckboxes).map(checkbox => checkbox.checked),
            goals: Array.from(goalInputs).map(input => input.value),
            goalChecks: Array.from(goalCheckboxes).map(checkbox => checkbox.checked)
        };
        localStorage.setItem('ecoPlanData', JSON.stringify(data));
        alert('Data saved!');
    });

    deleteButton.addEventListener('click', function() { //Button to delete all data and start over
        localStorage.removeItem('ecoPlanData');
        alert('Data deleted!');
        clearForm();
    });

    function loadData() { //The function is responsible to load saved data using JSON
        const data = JSON.parse(localStorage.getItem('ecoPlanData'));
        if (data) {
            habitInput.value = data.habit;
            monthSelect.value = data.month;
            weekSelect.value = data.week;
            data.days.forEach((checked, index) => {
                dayCheckboxes[index].checked = checked;
            });
            data.goals.forEach((goal, index) => {
                goalInputs[index].value = goal;
            });
            data.goalChecks.forEach((checked, index) => {
                goalCheckboxes[index].checked = checked;
            });
        }
    }

    function clearForm() { //Function that resets all data
        habitInput.value = '';
        monthSelect.value = 'January';
        weekSelect.value = '1';
        dayCheckboxes.forEach(checkbox => checkbox.checked = false);
        goalInputs.forEach(input => input.value = '');
        goalCheckboxes.forEach(checkbox => checkbox.checked = false);
    }
});

// Check if dark mode preference is stored in localStorage
if (localStorage.getItem('theme') === 'dark')
{
 document.body.classList.add('dark-mode');
}
document.getElementById('themeToggle').addEventListener('click', function() {
 document.body.classList.toggle('dark-mode');
 // Save the user's theme preference to localStorage
 if (document.body.classList.contains('dark-mode'))
 {
 localStorage.setItem('theme', 'dark');
 }
 else
 {
 localStorage.setItem('theme', 'light');
 }
});
