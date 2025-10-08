# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Model Context Protocol (MCP) server for the Thoth content creation platform. It enables AI assistants to create and retrieve multi-platform social media content through Thoth's API. The server runs in stdio mode for local MCP clients like Claude Desktop.

## Build and Development Commands

```bash
# Install dependencies
pnpm install

# Build TypeScript to JavaScript
pnpm build

# Development mode with watch
pnpm dev

# Type checking only (no output)
pnpm typecheck

# Lint code for errors
pnpm lint

# Lint and auto-fix issues
pnpm lint:fix

# Run the server locally
pnpm start -- --api-key YOUR_API_KEY

# Test with MCP inspector
npx @modelcontextprotocol/inspector pnpm start -- --api-key YOUR_API_KEY
```

## Architecture

### Core Components

- **src/index.ts**: Main entry point. Instantiates the MCP Server, registers all tools and resources, sets up request handlers, and starts the stdio transport. All tool calls route through the `CallToolRequestSchema` handler which validates inputs with Zod schemas and calls the appropriate tool function.

- **src/config.ts**: Command-line and environment variable parsing. Handles `--api-key`, `--base-url`, `--port`, `--remote` flags. Also exports `createHeaders()` for API authentication headers.

- **src/types.ts**: TypeScript interfaces and Zod schemas for all API types. Includes platform enums, post responses, brand styles, pagination, and the `ApiResponse<T>` union type pattern.

### Tools Architecture

All tools in `src/tools/` follow the same pattern:

1. Export a Zod input schema (e.g., `createPostInputSchema`)
2. Export an async function that calls the Thoth API
3. Export a formatter function that converts the API response to markdown

Tool files:

- **create-post.ts**: Creates multi-platform posts with AI enhancement, optional image generation, scheduling
- **get-post.ts**: Retrieves post by ID, also exports `getPostPreview()` for platform-specific views
- **get-all-posts.ts**: Lists posts with pagination and status filtering
- **update-post.ts**: Modifies existing posts (title, content, status)
- **get-brand-styles.ts**: Lists all brand styles for the user
- **get-brand-style.ts**: Gets specific brand style details (colors, tone, imagery)

### MCP Resources

The server exposes two URI schemes:

- `post://{postId}` - Returns full post data as markdown
- `preview://{postId}/{platform}` - Returns platform-specific content preview

Both are handled in the `ReadResourceRequestSchema` handler in src/index.ts.

## API Integration

The server calls Thoth's REST API at the configured base URL (default: `https://www.usethoth.com`):

- `POST /api/v1/posts` - Create posts
- `GET /api/v1/posts/{postId}` - Get single post
- `GET /api/v1/posts` - List posts with pagination
- `PUT /api/v1/posts/{postId}` - Update post
- `GET /api/v1/brand-styles` - List brand styles
- `GET /api/v1/brand-styles/{brandStyleId}` - Get brand style

All requests require `X-API-Key` header. Full API documentation is in docs/thoth-api-documentation.md.

## Key Patterns

### Adding New Tools

1. Create new file in `src/tools/` following the existing pattern
2. Define Zod input schema for validation
3. Implement async function that calls Thoth API
4. Implement formatter function for markdown output
5. Import and register in src/index.ts:
   - Add to `ListToolsRequestSchema` handler
   - Add case in `CallToolRequestSchema` handler

### Error Handling

All tool handlers in src/index.ts wrap calls in try-catch. Errors are returned as MCP error responses with `isError: true`. API errors are thrown and caught at the handler level.

### Platforms

Supported platforms are defined in `platformSchema` in src/types.ts:
`twitter`, `instagram`, `linkedin`, `facebook`, `threads`, `blog`, `reddit`

### Brand Styles

Brand styles apply consistent voice, tone, and visual styling to content. The `brandStyleId` parameter in create-post is optional but recommended. Use get-brand-styles to discover available IDs.
