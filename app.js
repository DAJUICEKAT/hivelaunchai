console.log("HiveLaunch Loaded 🐝");

let isPro = localStorage.getItem("isPro") === "true";
let usage = parseInt(localStorage.getItem("usage") || "0");

// ---------------- LOGIN (simple MVP) ----------------
let user = localStorage.getItem("user");

if (!user) {
  user = prompt("Enter your email to start:");
  localStorage.setItem("user", user);
}

// ---------------- PRO UNLOCK ----------------
function unlockPro() {
  localStorage.setItem("isPro", "true");
  isPro = true;
  alert("Pro unlocked 🐝");
}

// ---------------- FORMAT OUTPUT ----------------
function formatOutput(text) {
  return text
    .replace(/## (.*)/g, "<h3 style='color:#f4b400'>$1</h3>")
    .replace(/- /g, "• ");
}

// ---------------- MAIN FUNCTION ----------------
async function generateBusiness() {
  console.log("BUTTON CLICKED");

  const idea = document.getElementById("idea").value;
  const results = document.getElementById("results");

  // ---------------- PAYWALL ----------------
  if (!isPro) {
    if (usage >= 2) {
      results.innerHTML = `
        <div>
          <h2>🐝 Free Limit Reached</h2>
          <p>Upgrade to unlock unlimited business blueprints.</p>

          <h3 style="color:#ffcc33;">$19/month</h3>

          <a href="https://www.paypal.com/ncp/payment/48ZPV4D4J4M9S" target="_blank">
            <button>Upgrade Now</button>
          </a>

          <br><br>

          <button onclick="unlockPro()">I already paid</button>
        </div>
      `;
      return;
    }

    usage++;
    localStorage.setItem("usage", usage);
  }

  // ---------------- LOADING ----------------
  results.innerHTML = "🐝 Generating your business plan...";

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
You are a startup strategist AI.

Create a clear business blueprint:

1. Money opportunity
2. Target audience
3. Offer
4. Pricing
5. First 10 customers plan
6. 7-day launch plan
7. Startup score (0-100)

Be concise, structured, and actionable.
`
          }
        ]
      })
    });

    const data = await response.json();
    const output = data.choices[0].message.content;

    results.innerHTML = `
      <h2>🐝 Business Blueprint</h2>
      <div class="content">${formatOutput(output)}</div>
    `;

  } catch (err) {
    results.innerHTML = "❌ Error: " + err.message;
  }
}