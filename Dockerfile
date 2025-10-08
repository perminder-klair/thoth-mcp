# Dockerfile for Smithery deployment
# Builds the MCP server from source and runs in HTTP mode

FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript to JavaScript
RUN pnpm build

# Expose port (Smithery sets PORT env var, default 8081)
EXPOSE 8081

# Start server in HTTP mode
CMD ["node", "dist/index.js", "--remote"]
