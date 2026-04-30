// 🔹 Firebase Config (PASTE YOUR CONFIG HERE)
firebase.initializeApp({
  apiKey: "AIzaSyD-_1PEqisMcNKZkWftlc5P_fOaQF0UIlE",
  authDomain: "event-agenda2.firebaseapp.com",
  databaseURL: "https://event-agenda2-default-rtdb.firebaseio.com",
  projectId: "event-agenda2"
});

const db = firebase.database();

// 🔹 Agenda Data
const agenda = [
  "වාසනා මුට්ටි – Sasindu, Gayani",
  "200M දිවීම – Kavinda, Roshen, Nisal, Sasindu, Dilisha, Thilini, Dewmini",
  "සිඟිති පාර්සල් – Thilini, Dewmini",
  "අලියට ඇස තැබීම – Vishmitha, Thilini",
  "බනිස්කෑම – Vishwa, Dewmini",
  "එ්දන්ඩේ යාම – Nimesh",
  "ඩෝනි පැනීම – Nisal, Ayesh",
  "බැලුම් පිපිරීම – Ranuga, Denuwan",
  "පි පාස්කිරීම – Kavinda, Nimesh, Sasindu, Roshen",
  "ඉදිකට්ටටට නුල දැමීම – Dewmini, Kavindu, Ranuga",
  "ඩකාට්ටටඩපාර – Chamal, Muditha, Sadeesha, Aresha",
  "තුන් පා දිවීම – Sasindu, Roshen, Dewmini",
  "අන්ඳයාට කෑම – Vishwa, Ayesh, Vishmitha, Nimesh",
  "බිත්තර ඇල්ලීම – Kavinda, Sasindu",
  "සංගීත තරඟ – Kavinda, Roshen, Kavindu, Nisal",
  "කඹ ඇදීම – Chamal, Sadeesha, Aresha",
  "පැණි බඹඩර් – All",
  "සැඟවුන අමුත්තා – Nethsarani"
];

// 🔹 Render Agenda
const agendaDiv = document.getElementById("agenda");

agenda.forEach((text, i) => {
  const div = document.createElement("div");
  div.className = "task";

  const cb = document.createElement("input");
  cb.type = "checkbox";

  cb.onchange = () => {
    db.ref("tasks/" + i).set(cb.checked);
  };

  div.appendChild(cb);
  div.append(text);
  agendaDiv.appendChild(div);

  db.ref("tasks/" + i).on("value", snap => {
    cb.checked = snap.val();
    div.classList.toggle("done", snap.val());
  });
});

// 🔹 Live Updates
function addUpdate() {
  const text = updateInput.value;
  if (!text) return;

  db.ref("updates").push(text);
  updateInput.value = "";
}

db.ref("updates").on("child_added", snap => {
  const li = document.createElement("li");
  li.textContent = snap.val();
  updateList.prepend(li);
});
