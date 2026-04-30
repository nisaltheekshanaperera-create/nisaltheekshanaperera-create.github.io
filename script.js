firebase.initializeApp({
   apiKey: "AIzaSyD-_1PEqisMcNKZkWftlc5P_fOaQF0UIlE",
  authDomain: "event-agenda2.firebaseapp.com",
  databaseURL: "https://event-agenda2-default-rtdb.firebaseio.com",
  projectId: "event-agenda2"
});

const db = firebase.database();

// ✅ Agenda List
const agenda = [
  "1) වාසනා මුට්ටි – Sasindu, Gayani",
  "2) 200M දිවීම – Kavinda, Roshen, Nisal, Sasindu, Dilisha, Thilini, Dewmini",
  "3) සිඟිති පාර්සල් – Thilini, Dewmini",
  "4) අලියට ඇස තැබීම – Vishmitha, Thilini",
  "5) බනිස්කෑම – Vishwa, Dewmini",
  "6) එ්දන්ඩේ යාම – Nimesh",
  "7) ඩෝනි පැනීම – Nisal, Ayesh",
  "8) බැලුම් පිපිරීම – Ranuga, Denuwan",
  "9) පි පාස්කිරීම – Kavinda, Nimesh, Sasindu, Roshen",
  "10) ඉදිකට්ටටට නුල දැමීම – Dewmini, Kavindu, Ranuga",
  "11) ඩකාට්ටටඩපාර – Chamal, Muditha, Sadeesha, Aresha",
  "12) තුන් පා දිවීම – Sasindu, Roshen, Dewmini",
  "13) අන්ඳයාට කෑම – Vishwa, Ayesh, Vishmitha, Nimesh",
  "14) බිත්තර ඇල්ලීම – Kavinda, Sasindu",
  "15) සංගීත තරඟ – Kavinda, Roshen, Kavindu, Nisal",
  "16) කඹ ඇදීම – Chamal, Sadeesha, Aresha",
  "17) පැණි බඹඩර් – All",
  "18) සැඟවුන අමුත්තා – Nethsarani"
];

const agendaDiv = document.getElementById("agenda");

// ✅ Render Agenda with Live Sync
agenda.forEach((text, i) => {
  const div = document.createElement("div");
  div.className = "task";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  checkbox.onchange = () => {
    db.ref("tasks/" + i).set(checkbox.checked);
  };

  div.appendChild(checkbox);
  div.append(text);
  agendaDiv.appendChild(div);

  db.ref("tasks/" + i).on("value", snap => {
    const val = snap.val();
    checkbox.checked = val;
    div.classList.toggle("done", val);
  });
});

// ✅ Live Updates
function addUpdate() {
  const input = document.getElementById("updateInput");
  if (!input.value) return;

  db.ref("updates").push(input.value);
  input.value = "";
}

db.ref("updates").on("child_added", snap => {
  const li = document.createElement("li");
  li.textContent = snap.val();
  document.getElementById("updateList").prepend(li);
});
