// server.js
const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const app = express();
// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));


const PORT = 3000;

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });
app.get("/", (req, res) => {
  res.send(`
    <h2>Image Converter Microservice</h2>
    <p>Use POST /convert?format=png|jpg|webp</p>
  `);
});
app.post("/convert", upload.single("image"), async (req, res) => {
  const format = req.body.format || "png";  
  const inputPath = req.file.path;
  const outputFilename = `${req.file.filename}.${format}`;
  const outputPath = path.join("converted", outputFilename);

  try {
    await sharp(inputPath)
      .toFormat(format)
      .toFile(outputPath);

    res.download(outputPath, outputFilename, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    res.status(500).send("Conversion failed");
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
