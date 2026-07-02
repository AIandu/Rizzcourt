export default async function handler(req, res) {
  const { line } = req.body;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `You are the Judge of Rizz Court. Roast and improve this pickup line:\n${line}`
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({
    result: data.content?.[0]?.text || "Judge malfunctioned"
  });
}
