module.exports = {
  apps: [
    {
      name: "image-converter",         // ✅ Use your actual app name
      script: "./server.js",           // ✅ Matches your real entry file
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "200M",
      env: {
        NODE_ENV: "production"         // ✅ Optional: environment config
      }
    },
  ],
};
