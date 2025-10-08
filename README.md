# Thoth MCP Server

Model Context Protocol (MCP) server for [Thoth](https://usethoth.com) content creation platform. This server enables AI assistants and tools to create and retrieve content through Thoth's API.

## Features

- **Create Content**: Generate platform-optimized content with AI enhancement
- **Retrieve Posts**: Fetch post data and platform-specific previews
- **Multi-Platform Support**: Twitter, Instagram, LinkedIn, Facebook, Threads, Blog, Reddit
- **Image Generation**: Optionally generate images for your content
- **Dual Transport**: Run locally (stdio) or as a remote HTTP server
- **Type-Safe**: Built with TypeScript and Zod validation

## Installation

### Global Installation (via npx)

```bash
npx @thoth/mcp-server --api-key YOUR_API_KEY
```

### Local Development

```bash
cd mcp
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
npx @thoth/mcp-server --api-key YOUR_API_KEY
```

or with inspector:

```bash
npx @modelcontextprotocol/inspector pnpm start -- --api-key YOUR_API_KEY
```

With custom base URL:

```bash
npx @thoth/mcp-server \
  --api-key YOUR_API_KEY \
  --base-url https://app.usethoth.com
```

#### Remote HTTP Server Mode

> **Note:** Remote HTTP mode is not yet fully implemented. For remote access, consider using an SSH tunnel or MCP proxy with the stdio transport.

```bash
# SSH tunnel example (forwards local MCP to remote server)
ssh -R /tmp/mcp.sock:localhost:3000 user@remote-server
```

### Environment Variables

Instead of command-line flags, you can use environment variables:

```bash
export THOTH_API_KEY=your_api_key
export THOTH_BASE_URL=http://localhost:3000
npx @thoth/mcp-server
```

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
        "@thoth/mcp-server",
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
- `GET /api/v1/posts/{postId}` - Retrieve post data

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
  "scheduleTime": "2025-10-15T14:00:00Z",
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

- Check the port isn't already in use
- Verify firewall settings allow the connection
- Ensure the server process is running

## Support

- Documentation: <https://docs.usethoth.com>
- Issues: <https://github.com/thoth/mcp-server/issues>
- API Reference: <https://docs.usethoth.com/api>

## License

MIT
