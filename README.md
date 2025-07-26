🖼️ Image Converter Microservice

This project is a simple Node.js-based image converter microservice built with Express, Multer, and Sharp. It allows users to upload an image and convert it into PNG, JPG, or WebP formats.

🔧 Technologies Used:
- Node.js & Express.js
- Multer (for file uploads)
- Sharp (for image conversion)
- Bootstrap (for frontend UI)
- Docker (for containerization)

🚀 Features:
- Upload image from browser
- Convert to .jpg / .png / .webp
- Automatic download after conversion
- Files are not stored permanently (auto-deleted after processing)
- Runs locally or in Docker container

📦 How to Run:
1. Clone the repository
2. Run with Docker:
   ```bash
   docker build -t image-converter .
   docker run -p 3000:3000 image-converter
