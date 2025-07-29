const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Define directory paths
const uploadsDir = path.join(__dirname, "uploads");
const convertedDir = path.join(__dirname, "converted");

// Create necessary directories if they don't exist - suggestion
[uploadsDir, convertedDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Set up multer to store uploads in the uploads directory
const upload = multer({ dest: uploadsDir });

// POST route for image conversion
app.post("/convert", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const format = req.body.format || "png";
  const allowedFormats = ["png", "jpg", "jpeg", "webp"];

  if (!allowedFormats.includes(format.toLowerCase())) {
    return res.status(400).send("Invalid format specified.");
  }

  const inputPath = req.file.path;
  const outputFilename = `${req.file.filename}.${format}`;
  const outputPath = path.join(convertedDir, outputFilename);

  try {
    await sharp(inputPath)
      .toFormat(format)
      .toFile(outputPath);

    res.download(outputPath, outputFilename, (err) => {
      // Clean up files after sending
      fs.unlink(inputPath, () => {});
      fs.unlink(outputPath, () => {});
      if (err) {
        console.error("Error during file download:", err);
      }
    });
  } catch (err) {
    //Add error logging for easier debugging - Suggestion
    console.error("Error during image conversion:", err);

    res.status(500).send("Conversion failed");
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
