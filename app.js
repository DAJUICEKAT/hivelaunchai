let currentUser = localStorage.getItem("user") || null;
function login(email) {
  localStorage.setItem("user", email);
  currentUser = email;
}if (!currentUser) {
  currentUser = prompt("Enter your email to start:");
  login(currentUser);
}
}
let isPro = localStorage.getItem("isPro") === "true";
let freeUses = 1;
let isPremium = false;

// CORE ACCESS CONTROL
function canUseApp() {
  if (isPremium) return true;

  if (freeUses <= 0) {
    document.getElementById("results").innerHTML =
      "🚫 Upgrade to continue using HiveLaunch AI";
    return false;
  }
  let usage =
  parseInt(localStorage.getItem("usage") || "0");

if (usage >= 2) {
  results.innerHTML =
    "Upgrade to Pro for unlimited generations.";

  return;
}
function unlockPro() {
  localStorage.setItem("isPro", "true");
  isPro = true;
  alert("Pro unlocked 🐝");
}
usage++;

localStorage.setItem("usage", usage);

  freeUses--;
  function shareTool() {
  navigator.clipboard.writeText(window.location.href);
  alert("Link copied 🐝 Share it to unlock more ideas!");
}return true;
async function generateBusiness() {
  console.log("BUTTON CLICKED");
}
}async function generateBusiness() {
if (!isPro) {
  let usage = parseInt(localStorage.getItem("usage") || "0");

  if (usage >= 2) {
    results.innerHTML = `
      results.innerHTML = `
<div class="result-card">

  <h2>🐝 Free Limit Reached</h2>

  <p>
    You’ve used your free business blueprint generations.
    Upgrade to unlock unlimited access and premium tools.
  </p>

  <div style="margin-top:15px;">
    <h3 style="color:#ffcc33;">Pro Plan — $19/month</h3>
  </div>

  <ul>
    <li>Unlimited business blueprints</li>
    <li>PDF export reports</li>
    <li>Startup scoring system</li>
    <li>Marketing + content strategies</li>
    <li>Saved history</li>
  </ul>

  <a href="https://www.paypal.com/ncp/payment/48ZPV4D4J4M9S" target="_blank">
    <button>Upgrade to Pro</button>
  </a>

  <br><br>

  <button onclick="unlockPro()">
    I already paid (activate access)
  </button>

  <p style="font-size:12px; color:#aaa;">
    Access is unlocked instantly after payment
  </p>

</div>
`;
    `;
    return;
  }

  localStorage.setItem("usage", usage + 1);
}
  if (!canUseApp()) return;

  const idea = document.getElementById("idea").value;
  const results = document.getElementById("results");

  results.innerHTML = `
<div class="result-card">
  🐝 Building your launch blueprint...
</div>
`;
function formatOutput(text) {
  return text
    .replace(/## (.*)/g, "<h3 style='color:#f4b400;margin-top:15px;'>$1</h3>")
    .replace(/- /g, "• ");
}
function shareBlueprint() {

  navigator.clipboard.writeText(window.location.href);

  alert("Share link copied 🐝");
}
<div class="content">${formatOutput(output)}</div>
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `
You are an elite startup strategist AI.

Your job is to generate business ideas that feel:
- modern
- scalable
- profitable
- exciting

Avoid generic advice.

Output must feel like:
- a consultant
- a startup advisor
- a growth strategist

Return concise sections:

1. MONEY OPPORTUNITY
2. WHY THIS CAN WIN
3. FASTEST PATH TO FIRST $1,000
4. CONTENT ANGLES THAT GO VIRAL
5. FIRST 10 CUSTOMER STRATEGY
6. SIMPLE TECH STACK
7. STARTUP SCORE (0-100)

Make it bold, actionable, and emotionally exciting. MAKE SURE TO KEEP IT CLEAN IN A BULLETTED FORMAT AND EASY TO READ.
You are a venture studio AI.

Return outputs that are:
- concise
- structured
- actionable
- business-ready

Each section must feel like it was written by a startup consultant.

Avoid fluff.

Always include:
- MONEY OPPORTUNITY
- FASTEST WAY TO FIRST $1,000
- CUSTOMER ACQUISITION PLAN
- CONTENT IDEAS THAT GO VIRAL
- EXECUTION PLAN (7 DAYS)
- STARTUP SCORE (0–100)          }
        ]
      })
    });

    const data = await response.json();
const output = data.choices[0].message.content;

results.innerHTML = `
<div class="result-card">
  <h2>🐝 Business Blueprint</h2>
  <div class="content">${output}</div>
</div>
`;

saveBlueprint(idea, output);
    if (!response.ok) {
      results.innerHTML = "❌ " + (data.error?.message || "Error");
      return;
    }

    results.innerHTML =
      "🐝 <b>HiveLaunch Business Plan</b><br><br>" +
      data.choices[0].message.content;

  } catch (err) {
    results.innerHTML = "❌ Network error: " + err.message;
  }
}async function downloadPDF() {

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  const text =
    document.getElementById("results").innerText;

  const splitText =
    doc.splitTextToSize(text, 180);

  doc.setFont("helvetica");

  doc.setFontSize(12);

  doc.text(splitText, 15, 20);

  doc.save("HiveLaunch-Blueprint.pdf");
}function saveBlueprint(idea, output) {
  let history = JSON.parse(localStorage.getItem("blueprints") || "[]");

  history.unshift({
    idea,
    output,
    date: new Date().toISOString()
  });

  localStorage.setItem("blueprints", JSON.stringify(history));
}function loadHistory() {
  const historyDiv = document.getElementById("history");

  let history = JSON.parse(localStorage.getItem("blueprints") || "[]");

  if (history.length === 0) {
    historyDiv.innerHTML = "No saved blueprints yet.";
    return;
  }

  historyDiv.innerHTML = history.map(item => `
    <div class="result-card">
      <b>Idea:</b> ${item.idea}<br><br>
      <b>Date:</b> ${new Date(item.date).toLocaleString()}<br><br>
      <details>
        <summary>View Blueprint</summary>
        <div>${item.output.replace(/\n/g, "<br>")}</div>
      </details>
    </div>
  `).join("");
}loadHistory();
