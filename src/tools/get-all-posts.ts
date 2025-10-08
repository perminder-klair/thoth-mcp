import { z } from 'zod';
import { ApiResponse, PaginatedPostsResponse } from '../types.js';
import { createHeaders } from '../config.js';

/**
 * Zod schema for get-all-posts tool input
 */
export const getAllPostsInputSchema = z.object({
  page: z
    .number()
    .int()
    .positive('Page must be a positive integer')
    .optional()
    .default(1)
    .describe('Page number for pagination'),
  limit: z
    .number()
    .int()
    .positive('Limit must be a positive integer')
    .max(100, 'Limit cannot exceed 100')
    .optional()
    .default(10)
    .describe('Number of posts per page'),
  status: z
    .enum(['draft', 'scheduled', 'published', 'archived'])
    .optional()
    .describe('Filter posts by status'),
});

export type GetAllPostsInput = z.infer<typeof getAllPostsInputSchema>;

/**
 * Get all posts via the Thoth API
 */
export async function getAllPosts(
  params: GetAllPostsInput,
  config: { apiKey: string; baseUrl: string }
): Promise<PaginatedPostsResponse> {
  const queryParams = new URLSearchParams();
  queryParams.set('page', params.page.toString());
  queryParams.set('limit', params.limit.toString());
  if (params.status) {
    queryParams.set('status', params.status);
  }

  const url = `${config.baseUrl}/api/v1/posts?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: createHeaders(config.apiKey),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as ApiResponse<never>;
    throw new Error(
      `API request failed: ${response.status} - ${
        'error' in errorData ? errorData.error : 'Unknown error'
      }`
    );
  }

  const data = (await response.json()) as ApiResponse<PaginatedPostsResponse>;

  if (!data.success) {
    throw new Error(`API error: ${'error' in data ? data.error : 'Unknown error'}`);
  }

  return data.data;
}

/**
 * Format the get-all-posts response for MCP
 */
export function formatGetAllPostsResponse(
  response: PaginatedPostsResponse
): string {
  const { posts, pagination } = response;
  const lines: string[] = [
    `# Posts (Page ${pagination.page} of ${Math.ceil(pagination.total / pagination.limit)})`,
    ``,
    `**Total Posts:** ${pagination.total}`,
    `**Showing:** ${posts.length} posts`,
    ``,
  ];

  if (posts.length === 0) {
    lines.push('No posts found.');
    return lines.join('\n');
  }

  lines.push('## Posts');
  for (const post of posts) {
    lines.push('');
    lines.push(`### ${post.title || 'Untitled'}`);
    lines.push(`- **Status:** ${post.status}`);
    lines.push(`- **Created:** ${new Date(post.createdAt).toLocaleString()}`);
    if (post.updatedAt) {
      lines.push(`- **Updated:** ${new Date(post.updatedAt).toLocaleString()}`);
    }
  }

  return lines.join('\n');
}
