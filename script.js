const events = [
"වාසනා මුට්ටි (Sasindu, Gayani)",
"200M දිවීම (Kavinda, Roshen, Nisal...)",
"සිඟිති පාර්සල් (Thilini, Dewmini)",
"අලියට ඇස තැබීම (Vishmitha, Thilini)",
"බනිස්කෑම (Vishwa, Dewmini)",
"ඩෝනි පැනීම (Nisal, Ayesh)",
"බැලුම් පිපිරීම (Ranuga, Denuwan)",
"තුන් පා දිවීම (Sasindu, Roshen, Dewmini)",
"කඹ ඇදීම (Chamal, Sadeesha, Aresha)",
"පැණි බඹඩර් (All)",
"සැඟවුන අමුත්තා (Nethsarani)"
];

// Load agenda
const agendaDiv = document.getElementById("agenda");

events.forEach((event, index) => {
    let checked = localStorage.getItem(index) === "true";

    let div = document.createElement("div");
    div.className = "event";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;

    let label = document.createElement("span");
    label.innerText = event;

    if (checked) label.classList.add("done");

    checkbox.addEventListener("change", () => {
        localStorage.setItem(index, checkbox.checked);
        label.classList.toggle("done");
    });

    div.appendChild(checkbox);
    div.appendChild(label);

    agendaDiv.appendChild(div);
});


// Updates Section
function addUpdate() {
    const input = document.getElementById("updateInput");
    const text = input.value;

    if (text === "") return;

    let updates = JSON.parse(localStorage.getItem("updates")) || [];
    updates.push(text);

    localStorage.setItem("updates", JSON.stringify(updates));

    input.value = "";
    displayUpdates();
}

function displayUpdates() {
    const updatesDiv = document.getElementById("updates");
    updatesDiv.innerHTML = "";

    let updates = JSON.parse(localStorage.getItem("updates")) || [];

    updates.forEach(update => {
        let div = document.createElement("div");
        div.className = "update-item";
        div.innerText = update;
        updatesDiv.appendChild(div);
    });
}

displayUpdates();