# Use Node.js 23 Slim
FROM node:23-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci --ignore-scripts

# Copy source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --omit=dev

# Create a non-root user
RUN addgroup --gid 1001 --system nodejs
RUN adduser --system echoserver -u 1001

# Change ownership of the app directory
RUN chown -R echoserver:nodejs /app
USER echoserver

# Expose the port
EXPOSE 6001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e 'fetch(`http://${process.env.LARAVEL_ECHO_SERVER_HOST||'localhost'}:${process.env.LARAVEL_ECHO_SERVER_PORT||6001}`).then(res=>{process.exit(res.status===200?0:1)}).catch(()=>{process.exit(1)});'

# Start the server
CMD ["node", "bin/server.js"]
