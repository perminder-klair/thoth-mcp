import { z } from 'zod';
import { ApiResponse, PostResponse } from '../types.js';
import { createHeaders } from '../config.js';

/**
 * Zod schema for get-post tool input
 */
export const getPostInputSchema = z.object({
  postId: z
    .string()
    .uuid('Invalid post ID format')
    .describe('The UUID of the post to retrieve'),
});

export type GetPostInput = z.infer<typeof getPostInputSchema>;

/**
 * Get a post by ID via the Thoth API
 */
export async function getPost(
  params: GetPostInput,
  config: { apiKey: string; baseUrl: string }
): Promise<PostResponse> {
  const url = `${config.baseUrl}/api/v1/posts/${params.postId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: createHeaders(config.apiKey),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Post not found: ${params.postId}`);
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
 * Format the get-post response for MCP
 */
export function formatGetPostResponse(post: PostResponse): string {
  const lines: string[] = [
    `# Post Details`,
    ``,
    `**Post ID:** ${post.postId}`,
    `**Status:** ${post.status}`,
    `**Created:** ${new Date(post.createdAt).toLocaleString()}`,
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

  if (post.socialPostId) {
    lines.push(``, `**Social Post ID:** ${post.socialPostId}`);
  }

  return lines.join('\n');
}

/**
 * Get platform-specific preview for a post
 */
export function getPostPreview(
  post: PostResponse,
  platform: string
): string | undefined {
  const content = post.platformContents[platform];
  if (!content) {
    return undefined;
  }

  const lines: string[] = [
    `# ${platform.charAt(0).toUpperCase() + platform.slice(1)} Preview`,
    ``,
    content.content,
  ];

  if (content.hashtags && content.hashtags.length > 0) {
    lines.push(``, content.hashtags.join(' '));
  }

  if (post.images && post.images.length > 0) {
    lines.push(``, `## Images`);
    for (const image of post.images) {
      lines.push(`![Image](${image.url})`);
    }
  }

  return lines.join('\n');
}
