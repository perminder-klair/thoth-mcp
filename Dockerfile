# Dockerfile for Smithery deployment
# Builds the MCP server from source

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

# The command will be provided by smithery.yaml
# Expected: node dist/index.js --api-key <key>
