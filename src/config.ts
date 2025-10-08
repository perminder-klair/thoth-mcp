import { ServerConfig } from './types.js';

/**
 * Parse command-line arguments and environment variables
 * to create server configuration
 */
export function parseConfig(): ServerConfig {
  const args = process.argv.slice(2);

  // Parse command-line arguments
  const config: Partial<ServerConfig> = {
    apiKey: process.env.THOTH_API_KEY || '',
    baseUrl: process.env.THOTH_BASE_URL || 'https://www.usethoth.com',
    port: parseInt(process.env.PORT || '3001'),
    remote: false,
  };

  // Parse flags
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--api-key':
      case '-k':
        config.apiKey = args[++i];
        break;
      case '--base-url':
      case '-u':
        config.baseUrl = args[++i];
        break;
      case '--port':
      case '-p':
        config.port = parseInt(args[++i]);
        break;
      case '--remote':
      case '-r':
        config.remote = true;
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
    }
  }

  // Validate required configuration (skip for remote mode, config comes per-request)
  if (!config.apiKey && !config.remote) {
    console.error('Error: API key is required');
    console.error('Provide it via --api-key flag or THOTH_API_KEY environment variable');
    printHelp();
    process.exit(1);
  }

  return config as ServerConfig;
}

/**
 * Parse configuration from query parameters (for HTTP mode)
 */
export function parseQueryConfig(query: Record<string, unknown>): Pick<ServerConfig, 'apiKey' | 'baseUrl'> {
  return {
    apiKey: (query.apiKey as string) || '',
    baseUrl: (query.baseUrl as string) || 'https://www.usethoth.com',
  };
}

/**
 * Print usage help
 */
function printHelp(): void {
  console.error(`
Thoth MCP Server - Model Context Protocol server for Thoth content creation

Usage:
  thoth-mcp [options]

Options:
  -k, --api-key <key>      Thoth API key (required)
  -u, --base-url <url>     Base URL for Thoth API (default: https://www.usethoth.com)
  -p, --port <number>      Port for remote server mode (default: 3001)
  -r, --remote             Run as remote HTTP server instead of stdio
  -h, --help               Show this help message

Environment Variables:
  THOTH_API_KEY           Thoth API key
  THOTH_BASE_URL          Base URL for Thoth API
  PORT                     Port for remote server mode

Examples:
  # Run with stdio transport (local)
  npx thoth-mcp --api-key YOUR_API_KEY

  # Run with custom base URL
  npx thoth-mcp --api-key YOUR_API_KEY --base-url https://app.usethoth.com

  # Run as remote HTTP server
  npx thoth-mcp --api-key YOUR_API_KEY --remote --port 3001

MCP Client Configuration:
  {
    "mcpServers": {
      "thoth": {
        "command": "npx",
        "args": ["thoth-mcp", "--api-key", "YOUR_API_KEY"]
      }
    }
  }
`);
}

/**
 * Create headers for API requests
 */
export function createHeaders(apiKey: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'X-API-Key': apiKey,
  };
}
