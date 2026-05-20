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

  const idea = document.getElementById("idea").value;

  const results = document.getElementById("results");

  // ---------------- PAYWALL ----------------
  if (!isPro) {

    if (usage >= 2) {

      results.innerHTML = `
        <div class="result-card">

          <h2>🐝 Upgrade to Pro</h2>

          <p>
            You’ve reached your free limit.
          </p>

          <a href="https://www.paypal.com/ncp/payment/48ZPV4D4J4M9S" target="_blank">
            <button>Upgrade Now</button>
          </a>

          <br><br>

          <button onclick="unlockPro()">
            I already paid
          </button>

        </div>
      `;

      return;
    }

    usage++;

    localStorage.setItem("usage", usage);
  }

  // ---------------- LOADING ----------------
  results.innerHTML = `
    <div class="result-card">
      🐝 Generating your business blueprint...
    </div>
  `;

  try {

    const response = await fetch("/api/generate", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        idea: idea
      })

    });

    const data = await response.json();

    console.log("API RESPONSE:", data);

    // ---------------- ERROR SAFETY ----------------
    if (!response.ok || !data?.choices?.length) {

      results.innerHTML = `
        <div class="result-card">

          <h3>❌ API Error</h3>

          <pre>
${data?.error?.message || JSON.stringify(data, null, 2)}
          </pre>

        </div>
      `;

      return;
    }

    // ---------------- OUTPUT ----------------
    const output = data.choices[0].message.content;

    results.innerHTML = `
      <div class="result-card">

        <h2>🐝 Business Blueprint</h2>

        <div class="content">
          ${output.replace(/\n/g, "<br>")}
        </div>

      </div>
    `;

  } catch (err) {

    results.innerHTML = `
      <div class="result-card">
        ❌ ${err.message}
      </div>
    `;
  }
}

  results.innerHTML = `
    <div class="result-card">
      <h2>✅ Button Works</h2>
      <p>Your JavaScript is connected correctly.</p>
    </div>
  `;
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