const sharp = require("sharp");

module.exports = async (req, res) => {
  const { apikey } = req.query;

  if (apikey !== "akram123") {
    return res.status(403).json({ message: "Invalid API Key" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const output = await sharp(buffer)
      .modulate({
        brightness: 1.3,
        saturation: 1.1,
      })
      .jpeg()
      .toBuffer();

    res.setHeader("Content-Type", "image/jpeg");
    return res.status(200).send(output);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
