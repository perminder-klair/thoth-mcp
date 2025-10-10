# Thoth MCP Server

[![npm version](https://badge.fury.io/js/@usethoth%2Fmcp-server.svg)](https://www.npmjs.com/package/@usethoth/mcp-server)
[![MCP Registry](https://img.shields.io/badge/MCP%20Registry-io.github.zeiq--co%2Fthoth--mcp-blue)](https://registry.modelcontextprotocol.io/servers/io.github.zeiq-co/thoth-mcp)
[![Smithery](https://img.shields.io/badge/Smithery-Deploy-green)](https://smithery.ai/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![smithery badge](https://smithery.ai/badge/@perminder-klair/thoth-mcp)](https://smithery.ai/server/@perminder-klair/thoth-mcp)

Model Context Protocol (MCP) server for [Thoth](https://usethoth.com) content creation platform. This server enables AI assistants and tools to create and retrieve content through Thoth's API.

**✨ NEW:** [Claude Code Plugin](#claude-code-plugin) now available with slash commands and specialized AI agents for streamlined content creation workflows!

## Quick Start

```bash
# Install via npx
npx @usethoth/mcp-server --api-key YOUR_API_KEY

# Or configure in Claude Desktop (see Configuration below)
```

Get your API key at [app.usethoth.com/settings/api-keys](https://app.usethoth.com/settings/api-keys)

## Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Claude Code Plugin](#claude-code-plugin)
- [Installation](#installation)
- [Usage](#usage)
- [MCP Client Configuration](#mcp-client-configuration)
- [Available Tools](#available-tools)
- [Available Resources](#available-resources)
- [Development](#development)
- [API Integration](#api-integration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Support](#support)
- [Changelog](#changelog)

## Features

- **Create Content**: Generate platform-optimized content with AI enhancement
- **Retrieve & Manage Posts**: Fetch, list, and update post data with pagination
- **Multi-Platform Support**: Twitter, Instagram, LinkedIn, Facebook, Threads, Blog, Reddit
- **Brand Styles**: Apply consistent voice, tone, and visual styling with brand presets
- **Image Generation**: Optionally generate images for your content
- **Scheduling**: Schedule posts for future publication
- **Dual Transport**: Supports both stdio (local) and HTTP transports (Smithery/cloud deployment)
- **Type-Safe**: Built with TypeScript and Zod validation

## Claude Code Plugin

**NEW!** We've created an official Claude Code plugin that makes social media content creation even easier with user-friendly commands and specialized AI agents.

### What is it?

The Thoth plugin for Claude Code provides:

- **5 Slash Commands**: Quick access to common workflows
  - `/create-content` - Create multi-platform posts with AI guidance
  - `/schedule-post` - Schedule posts for optimal engagement times
  - `/view-brands` - Browse and manage your brand styles
  - `/manage-posts` - List, filter, and manage all your posts
  - `/preview-post` - Preview platform-specific content formatting

- **3 Specialized Agents**: Expert AI assistants for specific tasks
  - **Content Creator** - Expert at crafting engaging, platform-optimized content
  - **Brand Manager** - Ensures brand consistency across all platforms
  - **Social Media Optimizer** - Maximizes reach and engagement through data-driven strategies

### Quick Start with Plugin

```bash
# Install the plugin
claude plugin install thoth

# Set your API key
export THOTH_API_KEY="your-api-key-here"

# Start creating content
claude /create-content "Announcing our new feature"

# Or use an agent
claude "Content Creator, help me announce our product launch"
```

### Documentation

Full plugin documentation, installation instructions, and usage examples are available in the [claude-code-plugin](./claude-code-plugin) directory.

See [claude-code-plugin/README.md](./claude-code-plugin/README.md) for:

- Detailed installation instructions
- Complete command reference
- Agent usage guides
- Advanced workflows and examples
- Troubleshooting tips

## Installation

### Via MCP Registry (Recommended)

The server is published in the [official MCP Registry](https://registry.modelcontextprotocol.io/) as `io.github.zeiq-co/thoth-mcp`.

Browse and install via the registry web interface, or configure directly in your MCP client (see [MCP Client Configuration](#mcp-client-configuration) below).

### Via Smithery (Zero-Setup Deployment)

The easiest way to get started is through [Smithery](https://smithery.ai/), which provides:

- **One-click installation** - No local dependencies or configuration needed
- **Automatic updates** - Always get the latest version
- **Secure hosting** - Your API keys are safely managed
- **Interactive playground** - Test tools before using them

Install from Smithery:

1. Visit the [Thoth MCP Server on Smithery](https://smithery.ai/server/@perminder-klair/thoth-mcp)
2. Click "Install"
3. Enter your Thoth API key when prompted
4. Start using immediately in Claude Desktop or other MCP clients

### Global Installation (via npx)

```bash
npx @usethoth/mcp-server --api-key YOUR_API_KEY
```

### Local Development

```bash
git clone https://github.com/perminder-klair/thoth-mcp.git
cd thoth-mcp
pnpm install
pnpm build
```

## Usage

### Prerequisites

You'll need a Thoth API key. Generate one at:

- Production: <https://app.usethoth.com/settings/api-keys>
- Development: <http://localhost:3000/settings/api-keys>

### Running the Server

#### Stdio Mode (Local)

This is the default mode for use with MCP clients like Claude Desktop:

```bash
npx @usethoth/mcp-server --api-key YOUR_API_KEY
```

Or debug with MCP Inspector:

```bash
npx @modelcontextprotocol/inspector npx @usethoth/mcp-server --api-key YOUR_API_KEY
```

With custom base URL:

```bash
npx @usethoth/mcp-server \
  --api-key YOUR_API_KEY \
  --base-url https://app.usethoth.com
```

#### Remote HTTP Server Mode

Run the server in HTTP mode for cloud deployments (like Smithery) or to expose the server over HTTP:

```bash
npx @usethoth/mcp-server --remote --api-key YOUR_API_KEY
```

The server will start an HTTP server on port 8081 (configurable via `PORT` environment variable) with:

- `/mcp` - Main MCP endpoint (POST)
- `/health` - Health check endpoint (GET)

With custom configuration:

```bash
PORT=3000 npx @usethoth/mcp-server \
  --remote \
  --api-key YOUR_API_KEY \
  --base-url https://app.usethoth.com
```

**Note:** In HTTP mode, the server implements [MCP Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) with proper CORS configuration for browser-based clients.

### Environment Variables

Instead of command-line flags, you can use environment variables:

**For stdio mode:**

```bash
export THOTH_API_KEY=your_api_key
export THOTH_BASE_URL=http://localhost:3000
npx @usethoth/mcp-server
```

**For HTTP mode:**

```bash
export THOTH_API_KEY=your_api_key
export THOTH_BASE_URL=https://www.usethoth.com
export PORT=8081
npx @usethoth/mcp-server --remote
```

Available environment variables:

- `THOTH_API_KEY` - Your Thoth API key (stdio mode only; HTTP mode uses query params)
- `THOTH_BASE_URL` - Base URL for Thoth API (default: `https://www.usethoth.com`)
- `PORT` - HTTP server port (HTTP mode only, default: `8081`)

## MCP Client Configuration

### Claude Desktop

Add to your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "thoth": {
      "command": "npx",
      "args": [
        "@usethoth/mcp-server",
        "--api-key",
        "YOUR_API_KEY",
        "--base-url",
        "http://localhost:3000"
      ]
    }
  }
}
```

### Other MCP Clients

For other MCP clients that support stdio transport, use a similar configuration with appropriate command and args.

## Available Tools

The server provides 6 tools for managing Thoth content:

| Tool | Description |
|------|-------------|
| `create-post` | Create multi-platform content with AI enhancement |
| `get-post` | Retrieve a specific post by ID |
| `get-all-posts` | List posts with pagination and filtering |
| `update-post` | Update existing post title, content, or status |
| `get-brand-styles` | List all available brand styles |
| `get-brand-style` | Get detailed brand style configuration |

### create-post

Create a new content post with platform-specific variations.

**Parameters:**

- `content` (required): The original content to be enhanced
- `platforms` (required): Array of target platforms
  - Options: `twitter`, `instagram`, `linkedin`, `facebook`, `threads`, `blog`, `reddit`
- `length` (optional): Content length - `very-short`, `short`, `medium`, `long` (default: `medium`)
- `createImage` (optional): Generate an image (default: `false`)
- `createHashtags` (optional): Generate hashtags (default: `true`)
- `scheduleTime` (optional): ISO 8601 datetime to schedule the post
- `postToSocialNetworks` (optional): Immediately post to connected networks (default: `false`)
- `brandStyleId` (optional): Brand style UUID to apply

**Example:**

```json
{
  "content": "Just launched our new AI-powered content creation tool!",
  "platforms": ["twitter", "linkedin"],
  "length": "medium",
  "createImage": true,
  "createHashtags": true
}
```

**Returns:**

- Post ID
- Original content
- Platform-specific enhanced content
- Generated images (if requested)
- Hashtags for each platform
- Status and timestamps

### get-post

Retrieve a post by its ID.

**Parameters:**

- `postId` (required): UUID of the post

**Example:**

```json
{
  "postId": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Returns:**

- Complete post data
- Platform-specific content
- Generated images
- Status and metadata

### get-all-posts

List all posts with pagination and filtering.

**Parameters:**

- `page` (optional): Page number (default: `1`)
- `limit` (optional): Posts per page (default: `10`)
- `status` (optional): Filter by status - `draft`, `scheduled`, `published`

**Example:**

```json
{
  "page": 1,
  "limit": 20,
  "status": "published"
}
```

**Returns:**

- Array of posts with metadata
- Pagination information
- Total count

### update-post

Update an existing post.

**Parameters:**

- `postId` (required): UUID of the post to update
- `title` (optional): New title for the post
- `content` (optional): New content
- `status` (optional): New status - `draft`, `scheduled`, `published`

**Example:**

```json
{
  "postId": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Updated Title",
  "status": "published"
}
```

**Returns:**

- Updated post data
- Confirmation message

### get-brand-styles

List all available brand styles for your account.

**Parameters:** None

**Returns:**

- Array of brand styles with IDs and names
- Style metadata

### get-brand-style

Get details for a specific brand style.

**Parameters:**

- `brandStyleId` (required): UUID of the brand style

**Example:**

```json
{
  "brandStyleId": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Returns:**

- Brand style name and description
- Color palette
- Typography settings
- Tone and voice guidelines
- Imagery preferences

## Available Resources

### post://{postId}

Access post data as an MCP resource.

**Example URI:**

```
post://123e4567-e89b-12d3-a456-426614174000
```

### preview://{postId}/{platform}

Get platform-specific preview content.

**Example URI:**

```
preview://123e4567-e89b-12d3-a456-426614174000/twitter
```

## Development

### Building

```bash
pnpm build
```

### Running Locally

```bash
pnpm start -- --api-key YOUR_API_KEY
```

### Type Checking

```bash
pnpm typecheck
```

### Development Mode (Watch)

```bash
pnpm dev
```

## API Integration

The MCP server connects to Thoth's REST API endpoints:

- `POST /api/v1/posts` - Create new posts
- `GET /api/v1/posts/{postId}` - Retrieve single post
- `GET /api/v1/posts` - List posts with pagination
- `PUT /api/v1/posts/{postId}` - Update existing post
- `GET /api/v1/brand-styles` - List brand styles
- `GET /api/v1/brand-styles/{brandStyleId}` - Get brand style details

All requests require the `X-API-Key` header for authentication.

## Error Handling

The server provides detailed error messages for common issues:

- **Invalid API Key**: Check your API key is correct and active
- **Rate Limit Exceeded**: Wait before making additional requests
- **Post Not Found**: Verify the post ID is correct
- **Invalid Parameters**: Check parameter types and formats
- **Network Errors**: Verify the base URL and network connection

## Examples

### Creating a Multi-Platform Post

```typescript
// Using the create-post tool
{
  "content": "Excited to share our latest feature! \ud83d\ude80 AI-powered content optimization for all your social platforms.",
  "platforms": ["twitter", "linkedin", "instagram"],
  "length": "medium",
  "createImage": true,
  "createHashtags": true
}
```

### Scheduling a Post

```typescript
{
  "content": "Join us for our product launch next week!",
  "platforms": ["twitter", "linkedin"],
  "scheduleTime": "2025-10-20T14:00:00Z",
  "createImage": true
}
```

### Retrieving Post Data

```typescript
// Using the get-post tool
{
  "postId": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Accessing Resources

```typescript
// Read post resource
{
  "uri": "post://123e4567-e89b-12d3-a456-426614174000"
}

// Read platform-specific preview
{
  "uri": "preview://123e4567-e89b-12d3-a456-426614174000/twitter"
}
```

### Testing HTTP Mode Locally

Start the server in HTTP mode:

```bash
npx @usethoth/mcp-server --remote --api-key YOUR_API_KEY
```

Test the health endpoint:

```bash
curl http://localhost:8081/health
```

Test the MCP endpoint with MCP Inspector:

```bash
npx @modelcontextprotocol/inspector http://localhost:8081/mcp?apiKey=YOUR_API_KEY
```

Or use with a Streamable HTTP MCP client that supports query-based configuration.

## Troubleshooting

### Server won't start

- Check that you have Node.js 18+ installed
- Verify your API key is valid
- Ensure the base URL is correct and accessible

### Tool calls fail

- Verify your API key has the required permissions
- Check rate limits haven't been exceeded
- Ensure post IDs are valid UUIDs
- Verify platform names are spelled correctly

### HTTP mode not accessible

- Check the port isn't already in use: `lsof -i :8081` (or your configured PORT)
- Verify firewall settings allow the connection
- Ensure the server process is running with the `--remote` flag
- Check the server logs for any startup errors
- Verify the `/health` endpoint responds: `curl http://localhost:8081/health`
- For Smithery deployments, check the deployment logs in the Smithery dashboard

### Smithery deployment fails

- Ensure your GitHub repository is public or connected to Smithery
- Verify `smithery.yaml` and `Dockerfile` are in the repository root
- Check the build logs in Smithery dashboard for specific errors
- Ensure all dependencies are declared in `package.json`
- Try building the Docker image locally: `docker build -t thoth-mcp .`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code:

- Follows the existing TypeScript style
- Includes appropriate Zod schemas for validation
- Updates documentation as needed
- Passes type checking (`pnpm typecheck`)
- Uses `console.error()` for logging (not `console.log()` - it breaks stdio mode)

### For Maintainers

See [PUBLISHING.md](PUBLISHING.md) for detailed instructions on building and publishing updates.

## Support

- **Smithery**: <https://smithery.ai/> (One-click deployment)
- **MCP Registry**: <https://registry.modelcontextprotocol.io/servers/io.github.zeiq-co/thoth-mcp>
- **npm Package**: <https://www.npmjs.com/package/@usethoth/mcp-server>
- **Documentation**: <https://docs.usethoth.com>
- **Issues**: <https://github.com/perminder-klair/thoth-mcp/issues>
- **API Reference**: <https://docs.usethoth.com/api>

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v1.3.0 (2025-10-10)

- **NEW**: Added official Claude Code plugin
- **NEW**: 5 slash commands for streamlined content workflows
- **NEW**: 3 specialized AI agents (Content Creator, Brand Manager, Social Media Optimizer)
- Plugin provides user-friendly interface to all MCP server capabilities
- Comprehensive plugin documentation and usage examples
- Enhanced developer experience for Claude Code users

### v1.2.0 (2025-10-08)

- **NEW**: Added HTTP transport support for Smithery and cloud deployments
- **NEW**: Implemented MCP Streamable HTTP with `/mcp` and `/health` endpoints
- Server now supports dual transport modes: stdio (local) and HTTP (remote)
- Added Express and CORS dependencies for HTTP server
- Added Dockerfile for containerized deployment
- Configured for Smithery deployment with proper HTTP runtime
- HTTP mode supports configuration via query parameters
- Maintains backward compatibility with stdio mode for Claude Desktop

### v1.0.3 (2025-10-08)

- Added comprehensive publishing documentation (PUBLISHING.md)
- Removed all debug console logs from config
- Improved contributor guidelines

### v1.0.2 (2025-10-08)

- **CRITICAL FIX**: Removed console.log statements breaking stdio JSON-RPC protocol
- Changed debug output to stderr to prevent JSON parsing errors
- Server now works correctly with Claude Desktop and other MCP clients

### v1.0.1 (2025-10-08)

- Published to official MCP Registry
- Updated package metadata
- Complete tool documentation

### v1.0.0 (2025-10-08)

- Initial release
- Support for 6 Thoth API tools
- Multi-platform content creation
- Brand style integration
