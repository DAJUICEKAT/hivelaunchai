console.log("HiveLaunch Loaded 🐝");

// ---------------- STATE ----------------
let isPro = localStorage.getItem("isPro") === "true";
let usage = parseInt(localStorage.getItem("usage") || "0");

// ---------------- LOGIN ----------------
let user = localStorage.getItem("user");

if (!user) {
  user = prompt("Enter your email to start:");
  localStorage.setItem("user", user);
}

// ---------------- PRO ----------------
function unlockPro() {
  localStorage.setItem("isPro", "true");
  isPro = true;
  alert("Pro unlocked 🐝");
}

// ---------------- FORMAT ----------------
function formatOutput(text) {
  return text
    .replace(/## (.*)/g, "<h3 style='color:#f4b400'>$1</h3>")
    .replace(/- /g, "• ");
}

// ---------------- MAIN FUNCTION ----------------
async function generateBusiness() {
  const brain = document.querySelector(".hive-brain");
  const input = document.querySelector("input");
  const results = document.getElementById("results");

  if (!input || !results) {
    console.error("Missing input or results container");
    return;
  }

  const button = document.querySelector("button");
button.disabled = true;
button.innerText = "Thinking...";

  if (!input.value.trim()) {
  results.innerHTML = `
    <div class="result-card">
      <h2>⚠️ Missing Prompt</h2>
      <div class="content">
        Please enter a business idea or niche.
      </div>
    </div>
  `;

  button.disabled = false;
  button.innerText = "Generate";

  return;
}

  // 🧠 THINKING STATE
  brain?.classList.remove("idle", "output");
  brain?.classList.add("thinking");

  results.innerHTML = `
    <div class="result-card">
      <h2>🐝 Hive is thinking...</h2>
      <div class="content">Analyzing opportunity...</div>
    </div>
  `;

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: input.value,
        user,
        isPro
      })
    });

   const data = await res.json();

if (!res.ok) {
  throw new Error(data.error || "Generation failed");
}
    // ⚡ OUTPUT STATE
    brain?.classList.remove("thinking");
    brain?.classList.add("output");

    results.innerHTML = `
      <div class="result-card">
        <h2>🐝 Business Blueprint</h2>
        <div class="content">${formatOutput(data.output)}</div>
      </div>
    `;

    // 😴 BACK TO IDLE
    setTimeout(() => {
      brain?.classList.remove("output");
      brain?.classList.add("idle");
    }, 2500);

   } catch (err) {
    console.error(err);

    // reset brain state
    brain?.classList.remove("thinking", "output");
    brain?.classList.add("idle");

    // restore button
    button.disabled = false;
    button.innerText = "Generate";

    // show error
    results.innerHTML = `
      <div class="result-card">
        <h2>❌ Error</h2>
        <div class="content">${err.message}</div>
      </div>
    `;
  }

  // restore button after success
  button.disabled = false;
  button.innerText = "Generate";
}

// ---------------- INITIALIZE BRAIN ----------------

window.addEventListener("DOMContentLoaded", () => {
  const brain = document.querySelector(".hive-brain");

  if (brain) {
    brain.classList.add("idle");
  }
});