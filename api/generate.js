export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { prompt, isPro } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    // 🧠 PRO CHECK (temporary logic)
    if (!isPro) {
      return res.status(403).json({
        error: "Pro required"
      });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `
You are HiveLaunch AI.

Give:
- business idea
- target audience
- monetization method
- 7-day launch plan

Be sharp, structured, and practical.
              `
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    const data = await response.json();

    const output =
      data?.choices?.[0]?.message?.content ||
      "No output generated.";

    return res.status(200).json({ output });

  } catch (err) {
    console.error("Vercel API Error:", err);

    return res.status(500).json({
      error: "Server error",
      details: err.message
    });
  }
}