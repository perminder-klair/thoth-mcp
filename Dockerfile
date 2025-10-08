# Dockerfile for Smithery deployment
# This runs the pre-built npm package

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install the npm package globally
# This will be updated to use the version from package.json at runtime
ARG NPM_PACKAGE_VERSION=latest
RUN npm install -g @usethoth/mcp-server@${NPM_PACKAGE_VERSION}

# The entrypoint will be configured via smithery.yaml
ENTRYPOINT ["thoth-mcp"]
