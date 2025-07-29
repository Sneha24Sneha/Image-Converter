# Use the official Node.js 22 Alpine image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package definition files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm install -g pm2

# Copy rest of the application
COPY . .

# Create non-root user and switch to it
RUN addgroup -S app && adduser -S -G app app

# Set correct permissions for app user
RUN chown -R app:app /app
USER app

# Expose the application's port
EXPOSE 3000

# Run app using PM2 (via npm script)
CMD ["npm", "run", "pm2"]

#Or you can run directly
#CMD ["pm2-runtime", "ecosystem.config.js"]
