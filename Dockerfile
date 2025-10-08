# Minimal Dockerfile for running published npm package
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install the npm package globally (using latest published version)
RUN npm install -g @usethoth/mcp-server

# Command will be provided by smithery.yaml commandFunction
