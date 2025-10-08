#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import express from 'express';
import cors from 'cors';
import type { Request, Response } from 'express';
import { parseConfig, parseQueryConfig } from './config.js';
import {
  createPost,
  createPostInputSchema,
  formatCreatePostResponse,
} from './tools/create-post.js';
import {
  getPost,
  getPostInputSchema,
  formatGetPostResponse,
  getPostPreview,
} from './tools/get-post.js';
import {
  getAllPosts,
  getAllPostsInputSchema,
  formatGetAllPostsResponse,
} from './tools/get-all-posts.js';
import {
  updatePost,
  updatePostInputSchema,
  formatUpdatePostResponse,
} from './tools/update-post.js';
import {
  getBrandStyles,
  getBrandStylesInputSchema,
  formatGetBrandStylesResponse,
} from './tools/get-brand-styles.js';
import {
  getBrandStyle,
  getBrandStyleInputSchema,
  formatGetBrandStyleResponse,
} from './tools/get-brand-style.js';

/**
 * Create and configure the MCP server with all handlers
 */
function createMCPServer(config: ReturnType<typeof parseConfig>): Server {
  // Create MCP server instance
  const server = new Server(
    {
      name: 'thoth-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    }
  );

  // Register tools
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: 'create-post',
        description:
          'Create a new content post with platform-specific variations. Enhances the content for each platform, optionally generates images, and can schedule or publish to social networks.',
        inputSchema: {
          type: 'object',
          properties: {
            content: {
              type: 'string',
              description: 'The original content to be enhanced and posted',
            },
            platforms: {
              type: 'array',
              items: {
                type: 'string',
                enum: [
                  'twitter',
                  'instagram',
                  'linkedin',
                  'facebook',
                  'threads',
                  'blog',
                  'reddit',
                ],
              },
              description: 'Target platforms for the content',
            },
            scheduleTime: {
              type: 'string',
              description: 'Optional ISO 8601 datetime to schedule the post',
            },
            createImage: {
              type: 'boolean',
              description: 'Whether to generate an image for the post',
            },
            length: {
              type: 'string',
              enum: ['very-short', 'short', 'medium', 'long'],
              description: 'Desired content length',
            },
            createHashtags: {
              type: 'boolean',
              description: 'Whether to generate hashtags for the content',
            },
            postToSocialNetworks: {
              type: 'boolean',
              description: 'Whether to immediately post to connected social networks',
            },
            brandStyleId: {
              type: 'string',
              description: 'Optional brand style ID to apply to the content',
            },
          },
          required: ['content', 'platforms'],
        },
      },
      {
        name: 'get-post',
        description:
          'Retrieve a post by its ID. Returns the original content, platform-specific variations, generated images, and metadata.',
        inputSchema: {
          type: 'object',
          properties: {
            postId: {
              type: 'string',
              description: 'The UUID of the post to retrieve',
            },
          },
          required: ['postId'],
        },
      },
      {
        name: 'get-all-posts',
        description:
          'Retrieve all posts with pagination and optional filtering by status. Returns a list of posts with their metadata.',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination (default: 1)',
            },
            limit: {
              type: 'number',
              description: 'Number of posts per page (default: 10, max: 100)',
            },
            status: {
              type: 'string',
              enum: ['draft', 'scheduled', 'published', 'archived'],
              description: 'Filter posts by status',
            },
          },
          required: [],
        },
      },
      {
        name: 'update-post',
        description:
          'Update an existing post. Can modify title, content, platform-specific variations, and status.',
        inputSchema: {
          type: 'object',
          properties: {
            postId: {
              type: 'string',
              description: 'The UUID of the post to update',
            },
            title: {
              type: 'string',
              description: 'Updated title for the post',
            },
            originalContent: {
              type: 'string',
              description: 'Updated original content',
            },
            platformContents: {
              type: 'object',
              description: 'Updated platform-specific content variations',
            },
            status: {
              type: 'string',
              enum: ['draft', 'scheduled', 'published', 'archived'],
              description: 'Updated post status',
            },
          },
          required: ['postId'],
        },
      },
      {
        name: 'get-brand-styles',
        description:
          'Retrieve all brand styles for the authenticated user. Returns a list of brand styles with their basic information.',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
      {
        name: 'get-brand-style',
        description:
          'Retrieve a specific brand style by ID with full details including colors, tone, and imagery style.',
        inputSchema: {
          type: 'object',
          properties: {
            brandStyleId: {
              type: 'string',
              description: 'The unique identifier of the brand style',
            },
          },
          required: ['brandStyleId'],
        },
      },
    ],
  }));

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const { name, arguments: args } = request.params;

      if (name === 'create-post') {
        const params = createPostInputSchema.parse(args);
        const post = await createPost(params, {
          apiKey: config.apiKey,
          baseUrl: config.baseUrl,
        });
        const response = formatCreatePostResponse(post);

        return {
          content: [
            {
              type: 'text',
              text: response,
            },
          ],
        };
      }

      if (name === 'get-post') {
        const params = getPostInputSchema.parse(args);
        const post = await getPost(params, {
          apiKey: config.apiKey,
          baseUrl: config.baseUrl,
        });
        const response = formatGetPostResponse(post);

        return {
          content: [
            {
              type: 'text',
              text: response,
            },
          ],
        };
      }

      if (name === 'get-all-posts') {
        const params = getAllPostsInputSchema.parse(args);
        const postsData = await getAllPosts(params, {
          apiKey: config.apiKey,
          baseUrl: config.baseUrl,
        });
        const response = formatGetAllPostsResponse(postsData);

        return {
          content: [
            {
              type: 'text',
              text: response,
            },
          ],
        };
      }

      if (name === 'update-post') {
        const params = updatePostInputSchema.parse(args);
        const post = await updatePost(params, {
          apiKey: config.apiKey,
          baseUrl: config.baseUrl,
        });
        const response = formatUpdatePostResponse(post);

        return {
          content: [
            {
              type: 'text',
              text: response,
            },
          ],
        };
      }

      if (name === 'get-brand-styles') {
        getBrandStylesInputSchema.parse(args);
        const brandStyles = await getBrandStyles({
          apiKey: config.apiKey,
          baseUrl: config.baseUrl,
        });
        const response = formatGetBrandStylesResponse(brandStyles);

        return {
          content: [
            {
              type: 'text',
              text: response,
            },
          ],
        };
      }

      if (name === 'get-brand-style') {
        const params = getBrandStyleInputSchema.parse(args);
        const brandStyle = await getBrandStyle(params, {
          apiKey: config.apiKey,
          baseUrl: config.baseUrl,
        });
        const response = formatGetBrandStyleResponse(brandStyle);

        return {
          content: [
            {
              type: 'text',
              text: response,
            },
          ],
        };
      }

      throw new Error(`Unknown tool: ${name}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';

      return {
        content: [
          {
            type: 'text',
            text: `Error: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  });

  // Register resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: [
      {
        uri: 'post://example-id',
        name: 'Post',
        description: 'Access post data by ID using URI format: post://{postId}',
        mimeType: 'text/markdown',
      },
      {
        uri: 'preview://example-id/twitter',
        name: 'Post Preview',
        description:
          'Get platform-specific preview using URI format: preview://{postId}/{platform}',
        mimeType: 'text/markdown',
      },
    ],
  }));

  // Handle resource reads
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    try {
      const { uri } = request.params;

      // Handle post:// URIs
      if (uri.startsWith('post://')) {
        const postId = uri.replace('post://', '');
        const post = await getPost(
          { postId },
          {
            apiKey: config.apiKey,
            baseUrl: config.baseUrl,
          }
        );
        const response = formatGetPostResponse(post);

        return {
          contents: [
            {
              uri,
              mimeType: 'text/markdown',
              text: response,
            },
          ],
        };
      }

      // Handle preview:// URIs
      if (uri.startsWith('preview://')) {
        const parts = uri.replace('preview://', '').split('/');
        if (parts.length !== 2) {
          throw new Error(
            'Invalid preview URI format. Use: preview://{postId}/{platform}'
          );
        }

        const [postId, platform] = parts;
        const post = await getPost(
          { postId },
          {
            apiKey: config.apiKey,
            baseUrl: config.baseUrl,
          }
        );
        const preview = getPostPreview(post, platform);

        if (!preview) {
          throw new Error(`No content found for platform: ${platform}`);
        }

        return {
          contents: [
            {
              uri,
              mimeType: 'text/markdown',
              text: preview,
            },
          ],
        };
      }

      throw new Error(`Unsupported URI scheme: ${uri}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';

      return {
        contents: [
          {
            uri: request.params.uri,
            mimeType: 'text/plain',
            text: `Error: ${errorMessage}`,
          },
        ],
      };
    }
  });

  return server;
}

/**
 * Main function to start the MCP server
 */
async function main(): Promise<void> {
  const config = parseConfig();

  // Start server with appropriate transport
  if (config.remote) {
    // HTTP mode for Smithery deployment
    const app = express();
    const port = parseInt(process.env.PORT || '8081');

    // Configure CORS for MCP
    app.use(
      cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['*'],
        exposedHeaders: ['mcp-session-id', 'mcp-protocol-version'],
        maxAge: 86400,
      })
    );

    // Parse JSON bodies
    app.use(express.json());

    // Health check endpoint
    app.get('/health', (_req, res) => {
      res.json({ status: 'ok', service: 'thoth-mcp' });
    });

    // MCP endpoint
    app.post('/mcp', async (req: Request, res: Response) => {
      try {
        // Parse configuration from query parameters
        const queryConfig = parseQueryConfig(req.query);

        // Validate API key from query params
        if (!queryConfig.apiKey) {
          res.status(400).json({
            error: 'Bad Request',
            message: 'apiKey query parameter is required',
          });
          return;
        }

        // Merge with base config (for things like remote flag, port)
        const requestConfig = { ...config, ...queryConfig };

        // Create a new transport for each request to avoid ID collisions
        const transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
          enableJsonResponse: true,
        });

        // Create a new server instance with request-specific config
        const server = createMCPServer(requestConfig);

        // Clean up transport when response closes
        res.on('close', () => {
          transport.close();
        });

        // Connect and handle the request
        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);
      } catch (error) {
        console.error('Error handling MCP request:', error);
        if (!res.headersSent) {
          res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    });

    // Start HTTP server
    app.listen(port, '0.0.0.0', () => {
      console.error(`Thoth MCP Server started (HTTP mode)`);
      console.error(`Listening on port ${port}`);
      console.error(`MCP endpoint: http://0.0.0.0:${port}/mcp`);
    });
  } else {
    // Stdio mode for local/Claude Desktop use
    const server = createMCPServer(config);
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Thoth MCP Server started (stdio mode)');
  }
}

// Run the server
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
