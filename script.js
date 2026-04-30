// Save checkbox state
document.querySelectorAll("input[type='checkbox']").forEach((checkbox, index) => {
    const saved = localStorage.getItem("task_" + index);

    if (saved === "true") {
        checkbox.checked = true;
    }

    checkbox.addEventListener("change", () => {
        localStorage.setItem("task_" + index, checkbox.checked);
    });
});

// Add updates
function addUpdate() {
    const input = document.getElementById("updateInput");
    const value = input.value;

    if (value.trim() === "") return;

    const li = document.createElement("li");
    li.textContent = value;

    document.getElementById("updateList").appendChild(li);

    saveUpdates();
    input.value = "";
}

// Save updates
function saveUpdates() {
    const updates = [];
    document.querySelectorAll("#updateList li").forEach(li => {
        updates.push(li.textContent);
    });

    localStorage.setItem("updates", JSON.stringify(updates));
}

// Load updates on start
window.onload = () => {
    const updates = JSON.parse(localStorage.getItem("updates")) || [];

    updates.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        document.getElementById("updateList").appendChild(li);
    });
};