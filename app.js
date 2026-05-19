let freeUses = 3;
let isPremium = false;

// CORE ACCESS CONTROL
function canUseApp() {
  if (isPremium) return true;

  if (freeUses <= 0) {
    document.getElementById("results").innerHTML =
      "🚫 Upgrade to continue using HiveLaunch AI";
    return false;
  }

  freeUses--;
  return true;
}async function generateBusiness() {

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
You are a venture studio AI that builds revenue-first businesses.

Your job:
- optimize for speed to first dollar
- prioritize execution over ideas
- avoid generic advice

Return:

1. FASTEST PATH TO $1,000
2. VALIDATED CUSTOMER AVATAR
3. OFFER THAT SELLS TODAY
4. DISTRIBUTION STRATEGY
5. VIRAL ANGLES
6. FULL 7-DAY EXECUTION PLAN
7. OBSTACLES + HOW TO AVOID FAILURE
8. AUTOMATION STACK (TOOLS + AI)
Return the response in clearly labeled sections with:

- HEADINGS using ##
- Bullet points using -
- Short concise sentences
- No long paragraphs
Make it extremely specific, not generic. Make sure to style it in a neat outline with bulletts and numbers, cleanly.
'
          }
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