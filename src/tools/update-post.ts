import { z } from 'zod';
import { ApiResponse, PostResponse, platformSchema } from '../types.js';
import { createHeaders } from '../config.js';

/**
 * Zod schema for platform content
 */
const platformContentSchema = z.object({
  content: z.string(),
  hashtags: z.array(z.string()).optional(),
});

/**
 * Zod schema for update-post tool input
 */
export const updatePostInputSchema = z.object({
  postId: z
    .string()
    .uuid('Invalid post ID format')
    .describe('The UUID of the post to update'),
  title: z.string().optional().describe('Updated title for the post'),
  originalContent: z
    .string()
    .optional()
    .describe('Updated original content'),
  platformContents: z
    .record(platformSchema, platformContentSchema)
    .optional()
    .describe('Updated platform-specific content variations'),
  status: z
    .enum(['draft', 'scheduled', 'published', 'archived'])
    .optional()
    .describe('Updated post status'),
});

export type UpdatePostInput = z.infer<typeof updatePostInputSchema>;

/**
 * Update a post via the Thoth API
 */
export async function updatePost(
  params: UpdatePostInput,
  config: { apiKey: string; baseUrl: string }
): Promise<PostResponse> {
  const { postId, ...updateData } = params;
  const url = `${config.baseUrl}/api/v1/posts/${postId}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: createHeaders(config.apiKey),
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Post not found: ${postId}`);
    }

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
 * Format the update-post response for MCP
 */
export function formatUpdatePostResponse(post: PostResponse): string {
  const lines: string[] = [
    `# Post Updated Successfully`,
    ``,
    `**Status:** ${post.status}`,
    `**Updated:** ${new Date(post.updatedAt).toLocaleString()}`,
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

  if (post.publishedAt) {
    lines.push(``, `**Published at:** ${new Date(post.publishedAt).toLocaleString()}`);
  }

  return lines.join('\n');
}
