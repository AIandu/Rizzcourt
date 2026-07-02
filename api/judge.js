export default async function handler(req, res) {
  try {
    const { system, prompt } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: system,
        messages: [{ role: "user", content: prompt }]
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API error:", response.status, JSON.stringify(data));
      return res.status(response.status).json({
        error: data.error?.message || "unknown error"
      });
    }

    res.status(200).json(data);

  } catch (err) {
    console.error("judge.js crashed:", err);
    res.status(500).json({ error: "Judge crashed: " + err.message });
  }
}
