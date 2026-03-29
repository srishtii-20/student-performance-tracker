alert("JS connected");
let subjects;
let marks;

try {
    subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    marks = JSON.parse(localStorage.getItem("marks")) || [];
} catch (e) {
    subjects = [];
    marks = [];
}
let chart;

displayList();
calculateStats();
updateChart();

function addData() {
console.log("Button clicked");


let subject = document.getElementById("subject").value.trim();
let mark = parseInt(document.getElementById("marks").value);

if (subject === "") {
    alert("Subject cannot be empty");
    return;
}

// Duplicate check (safe)
let lowerSubjects = subjects.map(s => s.toLowerCase());
if (lowerSubjects.includes(subject.toLowerCase())) {
    alert("Subject already exists");
    return;
}

if (isNaN(mark) || mark < 0 || mark > 100) {
    alert("Marks must be between 0 and 100");
    return;
}

subjects.push(subject);
marks.push(mark);

saveData();
displayList();
calculateStats();
updateChart();

document.getElementById("subject").value = "";
document.getElementById("marks").value = "";


}


function saveData() {
localStorage.setItem("subjects", JSON.stringify(subjects));
localStorage.setItem("marks", JSON.stringify(marks));
}

function displayList() {
let list = document.getElementById("list");
list.innerHTML = "";


for (let i = 0; i < subjects.length; i++) {
    let li = document.createElement("li");

    if (marks[i] < 40) {
        li.style.color = "red";
    }

    li.textContent = subjects[i] + " : " + marks[i];

    let delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = function () {
        deleteData(i);
    };

    li.appendChild(delBtn);
    list.appendChild(li);
}

}

function deleteData(index) {
subjects.splice(index, 1);
marks.splice(index, 1);


saveData();
displayList();
calculateStats();
updateChart();

}

function calculateStats() {
if (marks.length === 0) return;

let sum = marks.reduce((a, b) => a + b, 0);
let avg = sum / marks.length;

let max = Math.max(...marks);
let min = Math.min(...marks);

document.getElementById("average").innerText = "Average: " + avg.toFixed(2);
document.getElementById("highest").innerText = "Highest: " + max;
document.getElementById("lowest").innerText = "Lowest: " + min;

let status = "";

if (avg >= 75) {
    status = "Excellent Performance 🎉";
} else if (avg >= 50) {
    status = "Average Performance ⚠️";
} else {
    status = "Needs Improvement ❗";
}

document.getElementById("status").innerText = status;

}


function updateChart() {
let ctx = document.getElementById("chart").getContext("2d");


if (chart) {
    chart.destroy();
}

chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: subjects,
        datasets: [{
            label: 'Marks',
            data: marks
        }]
    }
});


}
