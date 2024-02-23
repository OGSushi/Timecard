// Example structure for bi-weekly timecards
let timecards = JSON.parse(localStorage.getItem('timecards')) || [
    // Week 1
    { day: "Sunday", week: 1, hours: "" },
	{ day: "Monday", week: 1, hours: "" },
	{ day: "Tuesday", week: 1, hours: "" },
	{ day: "Wednesday", week: 1, hours: "" },
	{ day: "Thursday", week: 1, hours: "" },
	{ day: "Friday", week: 1, hours: "" },
	{ day: "Saturday", week: 1, hours: "" },
    // ...add other days
    // Week 2
	{ day: "Sunday", week: 2, hours: "" },
	{ day: "Monday", week: 2, hours: "" },
	{ day: "Tuesday", week: 2, hours: "" },
	{ day: "Wednesday", week: 2, hours: "" },
	{ day: "Thursday", week: 2, hours: "" },
	{ day: "Friday", week: 2, hours: "" },
	{ day: "Saturday", week: 2, hours: "" },
    // ...add other days
];

// Function to generate the timecard grid based on the week number
function generateTimecardGrid(weekNumber) {
    const grid = document.getElementById("timecardGrid");
    let gridHtml = '<table><tr><th>Day</th><th>Hours</th></tr>';
    const weeklyTimecards = timecards.filter(timecard => timecard.week === weekNumber);
    weeklyTimecards.forEach((timecard, index) => {
        const id = `hours${weekNumber}${index}`;
        gridHtml += `<tr>
            <td>${timecard.day}</td>
            <td>
                <input id="${id}" type="number" min="0" step="0.25"
                       placeholder="Hours" value="${timecard.hours}"
                       onchange="updateTimecardHours(${index + (weekNumber - 1) * 7}, this.value)">
            </td>
        </tr>`;
    });
    gridHtml += '</table>';
    grid.innerHTML = gridHtml;
}

// Simplified function to show week based on button click
function showWeek(weekNumber) {
    generateTimecardGrid(weekNumber);
}

// Function to update hours and save to localStorage
function updateTimecardHours(index, hours) {
    timecards[index].hours = hours;
    localStorage.setItem('timecards', JSON.stringify(timecards));
}

// Navigation and utility functions
function home() {
    window.location.href = 'home.html';
}

function login() {
    window.location.href = 'login.html';
}


function Timecard() {
    window.location.href = 'Timecard.html';
}

function logout() {
    localStorage.removeItem('timecards'); // Clear saved timecard data
    window.location.href = 'login.html';
}

function saveEdits() {
    let response = confirm("Save edits?");
    if (response) {
        localStorage.setItem('timecards', JSON.stringify(timecards));
        alert("Timecard saved.");
        window.location.href = 'ApproveTimecard.html';
    } else {
        alert("Edits not saved.");
    }
}

function ApproveTimecard() {
    let response = confirm("Approve timecard?");
    if (response) {
        alert("Timecard approved.");
        timecards.forEach(tc => tc.hours = ""); // Reset hours for a new period
        localStorage.setItem('timecards', JSON.stringify(timecards));
        window.location.href = 'home.html';
    } else {
        alert("Timecard not approved.");
    }
}

// Initialize with Week 1 view
document.addEventListener('DOMContentLoaded', () => showWeek(1));
