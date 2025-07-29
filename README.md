## Image Converter Microservice project:

## 📸 Screenshot

![Website Screenshot](public/images/Screenshot-image-converter.jpg)


````markdown
# 🖼️ Image Converter Microservice

A simple Node.js microservice to convert uploaded images to different formats (`.jpg`, `.png`, `.webp`) using [Sharp](https://sharp.pixelplumbing.com/), [Express](https://expressjs.com/), and [Multer](https://github.com/expressjs/multer).


## 📸 Features

- Upload images through a web form
- Convert images to PNG, JPG, or WebP
- Automatically downloads the converted file
- Built-in frontend with Bootstrap 5
- Dockerized and easy to deploy


## 🧰 Tech Stack

- Node.js
- Express 5
- Sharp
- Multer
- Bootstrap (Frontend)
- Docker (Optional)


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sneha24Sneha/Image-Converter.git
cd image-converter
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

#### Development (with nodemon)

```bash
npm run dev
```

#### Production

```bash
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)


## 📁 Project Structure

```
image-converter/
├── public/                     # Static frontend (HTML form)
│   └── index.html
├── uploads/                     # Temporary uploads (auto-created)
├── converted/                   # Converted files (auto-created)
├── server.js                    # Express server
├── Dockerfile                   # For containerized production
├── Dockerfile.dev               # For containerized deployment
├── docker-compose.yml           # For containerized production
├── docker-compose.dev.yml       # For containerized deployment
├── package.json
├── ecosystem.config.js          # For PM2 library settings for production
└── README.md
```


## 🐳 Docker Support for Production

### Build the Image

```bash
docker build -t image-converter .
```

### Run the Container

```bash
docker run -p 3000:3000 image-converter
```


## 🐳 Docker Support for Development

### Build the Image

```bash
docker build -f Dockerfile.dev -t image-converter-dev .
```

### Run the Container

```bash
docker run -p 3000:3000 image-converter-dev
```

> For development with live-reloading, use a `Dockerfile.dev`.


### 🐳 Production Commands Using Docker Compose

Instead of running build/run manually, you can now:

#### 1. "Build the image"

```bash
docker-compose build
```
#### 1.1 "Re-Build the image"

```bash
docker-compose up --build
````

#### 2. "Run the container"

```bash
docker-compose up -d
```

#### 3. "Stop the container"

```bash
docker-compose down
```


### 🛠 Development Usage

#### 1. "Build and start in development mode:"

```bash
docker-compose -f docker-compose.dev.yml up --build
```

#### 2. "Stop the container:"

```bash
docker-compose -f docker-compose.dev.yml down
```


## ⚙️ API Endpoint

### `POST /convert`

Form Fields:

1) `image`: the uploaded image file
2) `format`: target format (`png`, `jpg`, or `webp`)

Response:

 Returns the converted image as a downloadable file.


## 🛡️ Notes

1) Make sure `uploads/` and `converted/` folders are writable (auto-created if missing).
2) Only accepts `image/*` MIME types via form input.
3) Sharp handles image decoding/encoding under the hood.


## 📄 License

[ISC](LICENSE)


## ✨ Author

Made by \ Sneha Sharma


```


### 🔧 Command understand:

```Dockerfile
RUN addgroup app && adduser -S -G app app
USER app
```

---

### 🧠 What It Does:

This block "creates a non-root user" named `app` and switches to it for security.

---

## 🔍 Detailed Explanation

### 1. `RUN addgroup app && adduser -S -G app app`

This runs during the Docker image build phase.

| Part           | Meaning                                                |
| -------------- | ------------------------------------------------------ |
| `addgroup app` | Creates a new group called `app`                       |
| `adduser -S`   | Adds a "system user" (non-login, minimal privileges)   |
| `-G app`       | Assigns the new user to the `app` group                |
| `app`          | The username being created                             |

👮 "Why?"
Using a non-root user enhances security by avoiding permissions that could be exploited if the app is compromised.


### 2. `USER app`

This sets the "default user" for all following instructions (and at runtime).

After this line:

1) All file operations (`COPY`, `RUN`, `CMD`, etc.) are executed "as `app` user", not root.
2) This prevents the container from running your app with "root privileges" (a security risk).


🔐 Why Use This?

Running containers as `root` is a "bad practice" in production because:

1) If someone exploits your app, they gain root access inside the container.
2) In some environments (e.g., Kubernetes, cloud platforms), root containers are restricted or blocked.