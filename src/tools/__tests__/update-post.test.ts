import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  updatePostInputSchema,
  updatePost,
  formatUpdatePostResponse,
} from '../update-post.js';
import {
  createMockPost,
  mockFetchSuccess,
  mockFetchError,
  resetMocks,
} from '../../test-utils/index.js';

describe('update-post', () => {
  beforeEach(() => {
    resetMocks();
  });

  afterEach(() => {
    resetMocks();
  });

  describe('updatePostInputSchema', () => {
    it('should validate valid input with only postId', () => {
      const validInput = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
      };

      const result = updatePostInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should validate input with all optional fields', () => {
      const validInput = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Updated Title',
        originalContent: 'Updated content',
        status: 'published',
      };

      const result = updatePostInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should validate with optional fields omitted', () => {
      const validInput = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Just updating title',
      };

      const result = updatePostInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject invalid postId', () => {
      const invalidInput = {
        postId: 'not-a-uuid',
      };

      const result = updatePostInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should validate all status options', () => {
      const statuses = ['draft', 'scheduled', 'published', 'archived'];

      for (const status of statuses) {
        const input = {
          postId: '123e4567-e89b-12d3-a456-426614174000',
          status,
        };

        const result = updatePostInputSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid status', () => {
      const invalidInput = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
        status: 'invalid',
      };

      const result = updatePostInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject invalid platform in platformContents', () => {
      const invalidInput = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
        platformContents: {
          'invalid-platform': {
            content: 'Content',
          },
        },
      };

      const result = updatePostInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  describe('updatePost', () => {
    const config = {
      apiKey: 'test-api-key',
      baseUrl: 'https://api.test.com',
    };

    it('should make PUT request to correct endpoint', async () => {
      const mockPost = createMockPost();
      mockFetchSuccess(mockPost);

      const params = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Updated Title',
      };

      await updatePost(params, config);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/api/v1/posts/123e4567-e89b-12d3-a456-426614174000',
        expect.objectContaining({
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'test-api-key',
          },
          body: JSON.stringify({ title: 'Updated Title' }),
        })
      );
    });

    it('should exclude postId from request body', async () => {
      const mockPost = createMockPost();
      mockFetchSuccess(mockPost);

      const params = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Updated Title',
        status: 'published' as const,
      };

      await updatePost(params, config);

      const callArgs = (global.fetch as any).mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody).toEqual({
        title: 'Updated Title',
        status: 'published',
      });
      expect(requestBody.postId).toBeUndefined();
    });

    it('should return updated post data on success', async () => {
      const mockPost = createMockPost({ status: 'published' });
      mockFetchSuccess(mockPost);

      const params = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
        status: 'published' as const,
      };

      const result = await updatePost(params, config);

      expect(result).toEqual(mockPost);
    });

    it('should throw "Post not found" error for 404', async () => {
      mockFetchError('Not found', 404);

      const params = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Updated',
      };

      await expect(updatePost(params, config)).rejects.toThrow(
        'Post not found: 123e4567-e89b-12d3-a456-426614174000'
      );
    });

    it('should throw error on HTTP error', async () => {
      mockFetchError('Bad Request', 400);

      const params = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Updated',
      };

      await expect(updatePost(params, config)).rejects.toThrow(
        'API request failed: 400 - Bad Request'
      );
    });

    it('should throw error on API error response', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          success: false,
          error: 'Validation error',
        }),
      } as Response);

      const params = {
        postId: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Updated',
      };

      await expect(updatePost(params, config)).rejects.toThrow(
        'API error: Validation error'
      );
    });
  });

  describe('formatUpdatePostResponse', () => {
    it('should format basic update response', () => {
      const post = createMockPost();
      const result = formatUpdatePostResponse(post);

      expect(result).toContain('# Post Updated Successfully');
      expect(result).toContain('**Status:** draft');
      expect(result).toContain('**Updated:**');
      expect(result).toContain('## Original Content');
    });

    it('should format platform contents', () => {
      const post = createMockPost();
      const result = formatUpdatePostResponse(post);

      expect(result).toContain('## Platform-Specific Content');
      expect(result).toContain('### Twitter');
      expect(result).toContain('### Linkedin');
    });

    it('should format hashtags when present', () => {
      const post = createMockPost();
      const result = formatUpdatePostResponse(post);

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
      const result = formatUpdatePostResponse(post);

      expect(result).toContain('## Generated Images');
      expect(result).toContain('![Image](https://example.com/image.jpg)');
    });

    it('should format scheduled time when present', () => {
      const post = createMockPost({ scheduledAt: '2024-12-31T23:59:59Z' });
      const result = formatUpdatePostResponse(post);

      expect(result).toContain('**Scheduled for:**');
    });

    it('should format published time when present', () => {
      const post = createMockPost({ publishedAt: '2024-01-01T12:00:00Z' });
      const result = formatUpdatePostResponse(post);

      expect(result).toContain('**Published at:**');
    });
  });
});
