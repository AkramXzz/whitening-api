const sharp = require("sharp");

module.exports = async function (req, res) {
  const apikey = req.query.apikey;

  if (apikey !== "akram123") {
    return res.status(403).json({ message: "Invalid API Key" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  let buffers = [];

  req.on("data", chunk => {
    buffers.push(chunk);
  });

  req.on("end", async () => {
    try {
      const imageBuffer = Buffer.concat(buffers);

      const output = await sharp(imageBuffer)
        .modulate({
          brightness: 1.3,
          saturation: 1.1,
        })
        .toBuffer();

      res.setHeader("Content-Type", "image/jpeg");
      res.status(200).send(output);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};
