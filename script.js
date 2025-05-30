// Simple To-Do List App: Only add, mark as done, and delete tasks. No calendar, no settings, no filters, no modal.

// Load tasks from localStorage or set to empty array
let tasks = JSON.parse(localStorage.getItem("simpleTasks")) || [];

// DOM element references
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Render all tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.done ? "completed" : "";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.addEventListener("change", () => toggleTask(index));

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener("click", () => deleteTask(index));

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;
    tasks.push({ text, done: false });
    saveTasks();
    taskInput.value = "";
    renderTasks();
}

// Toggle completion status
function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("simpleTasks", JSON.stringify(tasks));
}

// Event listeners
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

// Initial render
renderTasks();
