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

    brain?.classList.remove("thinking", "output");
    brain?.classList.add("idle");

    results.innerHTML = `
      <div class="result-card">
        <h2>❌ Error</h2>
        <div class="content">${err.message}</div>
      </div>
    `;
  }
}