import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getPostInputSchema,
  getPost,
  formatGetPostResponse,
  getPostPreview,
} from '../get-post.js';
import {
  createMockPost,
  mockFetchSuccess,
  mockFetchError,
  resetMocks,
} from '../../test-utils/index.js';

describe('get-post', () => {
  beforeEach(() => {
    resetMocks();
  });

  afterEach(() => {
    resetMocks();
  });

  describe('getPostInputSchema', () => {
    it('should validate valid UUID', () => {
      const validInput = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
      };

      const result = getPostInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject invalid UUID', () => {
      const invalidInput = {
        postId: 'not-a-uuid',
      };

      const result = getPostInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject missing postId', () => {
      const invalidInput = {};

      const result = getPostInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  describe('getPost', () => {
    const config = {
      apiKey: 'test-api-key',
      baseUrl: 'https://api.test.com',
    };

    it('should make GET request to correct endpoint', async () => {
      const mockPost = createMockPost();
      mockFetchSuccess(mockPost);

      const params = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
      };

      await getPost(params, config);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/api/v1/posts/123e4567-e89b-12d3-a456-426614174000',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'test-api-key',
          },
        })
      );
    });

    it('should return post data on success', async () => {
      const mockPost = createMockPost();
      mockFetchSuccess(mockPost);

      const params = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
      };

      const result = await getPost(params, config);

      expect(result).toEqual(mockPost);
    });

    it('should throw "Post not found" error for 404', async () => {
      mockFetchError('Not found', 404);

      const params = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
      };

      await expect(getPost(params, config)).rejects.toThrow(
        'Post not found: 123e4567-e89b-12d3-a456-426614174000'
      );
    });

    it('should throw error on HTTP error', async () => {
      mockFetchError('Bad Request', 400);

      const params = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
      };

      await expect(getPost(params, config)).rejects.toThrow(
        'API request failed: 400 - Bad Request'
      );
    });

    it('should throw error on API error response', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          success: false,
          error: 'Internal error',
        }),
      } as Response);

      const params = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
      };

      await expect(getPost(params, config)).rejects.toThrow('API error: Internal error');
    });
  });

  describe('formatGetPostResponse', () => {
    it('should format basic post response', () => {
      const post = createMockPost();
      const result = formatGetPostResponse(post);

      expect(result).toContain('# Post Details');
      expect(result).toContain('**Status:** draft');
      expect(result).toContain('**Created:**');
      expect(result).toContain('**Updated:**');
      expect(result).toContain('## Original Content');
      expect(result).toContain('Test post content');
    });

    it('should format platform contents', () => {
      const post = createMockPost();
      const result = formatGetPostResponse(post);

      expect(result).toContain('## Platform-Specific Content');
      expect(result).toContain('### Twitter');
      expect(result).toContain('### Linkedin');
    });

    it('should format hashtags when present', () => {
      const post = createMockPost();
      const result = formatGetPostResponse(post);

      expect(result).toContain('**Hashtags:** #test #twitter');
    });

    it('should format images when present', () => {
      const post = createMockPost({
        images: [
          {
            id: '1',
            url: 'https://example.com/image.jpg',
            prompt: 'Test image',
            style: 'modern',
          },
        ],
      });
      const result = formatGetPostResponse(post);

      expect(result).toContain('## Generated Images');
      expect(result).toContain('![Image](https://example.com/image.jpg)');
    });

    it('should format scheduled time when present', () => {
      const post = createMockPost({ scheduledAt: '2024-12-31T23:59:59Z' });
      const result = formatGetPostResponse(post);

      expect(result).toContain('**Scheduled for:**');
    });

    it('should format published time when present', () => {
      const post = createMockPost({ publishedAt: '2024-01-01T12:00:00Z' });
      const result = formatGetPostResponse(post);

      expect(result).toContain('**Published at:**');
    });
  });

  describe('getPostPreview', () => {
    it('should return platform-specific preview', () => {
      const post = createMockPost();
      const result = getPostPreview(post, 'twitter');

      expect(result).toContain('# Twitter Preview');
      expect(result).toContain('Twitter version of the content');
      expect(result).toContain('#test #twitter');
    });

    it('should return undefined for non-existent platform', () => {
      const post = createMockPost();
      const result = getPostPreview(post, 'instagram');

      expect(result).toBeUndefined();
    });

    it('should include images in preview', () => {
      const post = createMockPost({
        images: [
          {
            id: '1',
            url: 'https://example.com/image.jpg',
            prompt: 'Test',
            style: 'modern',
          },
        ],
      });
      const result = getPostPreview(post, 'twitter');

      expect(result).toContain('## Images');
      expect(result).toContain('![Image](https://example.com/image.jpg)');
    });

    it('should handle platform without hashtags', () => {
      const post = createMockPost({
        platformContents: {
          twitter: {
            content: 'Content without hashtags',
          },
        },
      });
      const result = getPostPreview(post, 'twitter');

      expect(result).toContain('Content without hashtags');
      expect(result).not.toContain('**Hashtags:**');
    });
  });
});
