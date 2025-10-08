import { z } from 'zod';
import {
  ApiResponse,
  lengthSchema,
  platformSchema,
  PostResponse,
} from '../types.js';
import { createHeaders } from '../config.js';

/**
 * Zod schema for create-post tool input
 */
export const createPostInputSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(10000, 'Content must be less than 10,000 characters')
    .describe('The idea or prompt for Thoth to generate platform-specific content from'),
  platforms: z
    .array(platformSchema)
    .min(1, 'At least one platform is required')
    .max(7, 'Maximum 7 platforms allowed')
    .describe('Target platforms for the content'),
  scheduleTime: z
    .string()
    .datetime('Invalid datetime format')
    .optional()
    .describe('Optional ISO 8601 datetime to schedule the post'),
  createImage: z
    .boolean()
    .optional()
    .default(false)
    .describe('Whether to generate an image for the post'),
  length: lengthSchema
    .optional()
    .default('medium')
    .describe('Desired content length: very-short, short, medium, or long'),
  createHashtags: z
    .boolean()
    .optional()
    .default(true)
    .describe('Whether to generate hashtags for the content'),
  postToSocialNetworks: z
    .boolean()
    .optional()
    .default(false)
    .describe('Whether to immediately post to connected social networks'),
  brandStyleId: z
    .string()
    .uuid('Invalid brand style ID')
    .optional()
    .describe('Brand style ID to apply to the content (recommended for consistent brand voice and tone). Use get-brand-styles tool to see available styles'),
});

export type CreatePostInput = z.infer<typeof createPostInputSchema>;

/**
 * Create a new post via the Thoth API
 */
export async function createPost(
  params: CreatePostInput,
  config: { apiKey: string; baseUrl: string }
): Promise<PostResponse> {
  const url = `${config.baseUrl}/api/v1/posts`;

  const response = await fetch(url, {
    method: 'POST',
    headers: createHeaders(config.apiKey),
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as ApiResponse<never>;
    throw new Error(
      `API request failed: ${response.status} - ${
        'error' in errorData ? errorData.error : 'Unknown error'
      }`
    );
  }

  const data = (await response.json()) as ApiResponse<PostResponse>;

  if (!data.success) {
    throw new Error(`API error: ${'error' in data ? data.error : 'Unknown error'}`);
  }

  return data.data;
}

/**
 * Format the create-post response for MCP
 */
export function formatCreatePostResponse(post: PostResponse): string {
  const lines: string[] = [
    `# Post Created Successfully`,
    ``,
    `**Status:** ${post.status}`,
    `**Created:** ${new Date(post.createdAt).toLocaleString()}`,
    ``,
    `## Original Content`,
    post.originalContent,
    ``,
    `## Platform-Specific Content`,
  ];

  for (const [platform, content] of Object.entries(post.platformContents)) {
    lines.push(``, `### ${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
    lines.push(content.content);

    if (content.hashtags && content.hashtags.length > 0) {
      lines.push(``, `**Hashtags:** ${content.hashtags.join(' ')}`);
    }
  }

  if (post.images && post.images.length > 0) {
    lines.push(``, `## Generated Images`);
    for (const image of post.images) {
      lines.push(`- ![Image](${image.url})`);
      lines.push(`  - **Style:** ${image.style}`);
      lines.push(`  - **Prompt:** ${image.prompt}`);
    }
  }

  if (post.scheduledAt) {
    lines.push(
      ``,
      `**Scheduled for:** ${new Date(post.scheduledAt).toLocaleString()}`
    );
  }

  return lines.join('\n');
}
