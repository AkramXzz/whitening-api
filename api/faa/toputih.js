import sharp from "sharp";
import axios from "axios";

export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).send("URL diperlukan");

    const response = await axios.get(url, {
      responseType: "arraybuffer"
    });

    const image = await sharp(response.data)
      .modulate({
        brightness: 1.3,
        saturation: 1.1
      })
      .png()
      .toBuffer();

    res.setHeader("Content-Type", "image/png");
    res.send(image);
  } catch (err) {
    res.status(500).send("Error processing image");
  }
}
