import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getAllPostsInputSchema,
  getAllPosts,
  formatGetAllPostsResponse,
} from '../get-all-posts.js';
import {
  createMockPaginatedPosts,
  mockFetchSuccess,
  mockFetchError,
  resetMocks,
} from '../../test-utils/index.js';

describe('get-all-posts', () => {
  beforeEach(() => {
    resetMocks();
  });

  afterEach(() => {
    resetMocks();
  });

  describe('getAllPostsInputSchema', () => {
    it('should validate empty input with defaults', () => {
      const input = {};
      const result = getAllPostsInputSchema.parse(input);

      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.status).toBeUndefined();
    });

    it('should validate valid input', () => {
      const input = {
        page: 2,
        limit: 20,
        status: 'published',
      };

      const result = getAllPostsInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject non-positive page number', () => {
      const invalidInput = {
        page: 0,
      };

      const result = getAllPostsInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject negative page number', () => {
      const invalidInput = {
        page: -1,
      };

      const result = getAllPostsInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject non-positive limit', () => {
      const invalidInput = {
        limit: 0,
      };

      const result = getAllPostsInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject limit over 100', () => {
      const invalidInput = {
        limit: 101,
      };

      const result = getAllPostsInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should validate all status options', () => {
      const statuses = ['draft', 'scheduled', 'published', 'archived'];

      for (const status of statuses) {
        const input = { status };
        const result = getAllPostsInputSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid status', () => {
      const invalidInput = {
        status: 'invalid-status',
      };

      const result = getAllPostsInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  describe('getAllPosts', () => {
    const config = {
      apiKey: 'test-api-key',
      baseUrl: 'https://api.test.com',
    };

    it('should make GET request with default parameters', async () => {
      const mockPosts = createMockPaginatedPosts();
      mockFetchSuccess(mockPosts);

      const params = {
        page: 1,
        limit: 10,
      };

      await getAllPosts(params, config);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/api/v1/posts?page=1&limit=10',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'test-api-key',
          },
        })
      );
    });

    it('should include status in query params when provided', async () => {
      const mockPosts = createMockPaginatedPosts();
      mockFetchSuccess(mockPosts);

      const params = {
        page: 1,
        limit: 10,
        status: 'published' as const,
      };

      await getAllPosts(params, config);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/api/v1/posts?page=1&limit=10&status=published',
        expect.any(Object)
      );
    });

    it('should return paginated posts on success', async () => {
      const mockPosts = createMockPaginatedPosts();
      mockFetchSuccess(mockPosts);

      const params = {
        page: 1,
        limit: 10,
      };

      const result = await getAllPosts(params, config);

      expect(result).toEqual(mockPosts);
    });

    it('should throw error on HTTP error', async () => {
      mockFetchError('Bad Request', 400);

      const params = {
        page: 1,
        limit: 10,
      };

      await expect(getAllPosts(params, config)).rejects.toThrow(
        'API request failed: 400 - Bad Request'
      );
    });

    it('should throw error on API error response', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          success: false,
          error: 'Database error',
        }),
      } as Response);

      const params = {
        page: 1,
        limit: 10,
      };

      await expect(getAllPosts(params, config)).rejects.toThrow(
        'API error: Database error'
      );
    });
  });

  describe('formatGetAllPostsResponse', () => {
    it('should format paginated posts response', () => {
      const paginatedPosts = createMockPaginatedPosts();
      const result = formatGetAllPostsResponse(paginatedPosts);

      expect(result).toContain('# Posts (Page 1 of 1)');
      expect(result).toContain('**Total Posts:** 2');
      expect(result).toContain('**Showing:** 2 posts');
      expect(result).toContain('## Posts');
    });

    it('should format individual posts', () => {
      const paginatedPosts = createMockPaginatedPosts();
      const result = formatGetAllPostsResponse(paginatedPosts);

      expect(result).toContain('### Post 1');
      expect(result).toContain('### Post 2');
      expect(result).toContain('**Status:** draft');
      expect(result).toContain('**Created:**');
    });

    it('should show "Untitled" for posts without title', () => {
      const paginatedPosts = createMockPaginatedPosts({
        posts: [
          {
            id: '1',
            status: 'draft',
            createdAt: '2024-01-01T00:00:00.000Z',
          },
        ],
      });
      const result = formatGetAllPostsResponse(paginatedPosts);

      expect(result).toContain('### Untitled');
    });

    it('should handle empty posts array', () => {
      const paginatedPosts = createMockPaginatedPosts({
        posts: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
        },
      });
      const result = formatGetAllPostsResponse(paginatedPosts);

      expect(result).toContain('No posts found.');
      expect(result).not.toContain('## Posts');
    });

    it('should calculate correct page count', () => {
      const paginatedPosts = createMockPaginatedPosts({
        pagination: {
          page: 2,
          limit: 10,
          total: 25,
        },
      });
      const result = formatGetAllPostsResponse(paginatedPosts);

      expect(result).toContain('# Posts (Page 2 of 3)');
    });

    it('should include updatedAt when present', () => {
      const paginatedPosts = createMockPaginatedPosts();
      const result = formatGetAllPostsResponse(paginatedPosts);

      expect(result).toContain('**Updated:**');
    });
  });
});
