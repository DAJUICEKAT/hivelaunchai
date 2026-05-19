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
You are an elite startup strategist and SaaS growth expert.

Create a HIGH-CONVERTING business launch blueprint for this idea:

${idea}

Return the response in this exact structure:

1. BUSINESS CONCEPT
- What the business is
- Why it can succeed quickly

2. BRAND NAME IDEAS
- 10 premium business names

3. TARGET AUDIENCE
- Ideal customer
- Pain points
- Emotional triggers

4. OFFER STACK
- Main offer
- Upsells
- Recurring revenue opportunities

5. PRICING STRATEGY
- Best starting price
- Premium pricing option
- Psychological pricing recommendations

6. FASTEST CUSTOMER ACQUISITION METHOD
- Best platform
- Outreach strategy
- Viral opportunity

7. 7-DAY LAUNCH PLAN
- Day-by-day execution roadmap

8. CONTENT STRATEGY
- TikTok ideas
- Instagram ideas
- Hooks and CTAs

9. AUTOMATION OPPORTUNITIES
- Tasks AI can automate
- Ways to scale quickly

10. 90-DAY REVENUE POTENTIAL
- Realistic low-end estimate
- Aggressive growth estimate

Be highly tactical, specific, persuasive, and modern.
Avoid generic advice.
Format everything using clean markdown headings and bullet points.
`
          }
        ]
      })
    });

    const data = await response.json();

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
}