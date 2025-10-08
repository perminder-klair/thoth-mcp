import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  createPostInputSchema,
  createPost,
  formatCreatePostResponse,
} from '../create-post.js';
import {
  createMockPost,
  mockFetchSuccess,
  mockFetchError,
  mockFetchNetworkError,
  resetMocks,
} from '../../test-utils/index.js';

describe('create-post', () => {
  beforeEach(() => {
    resetMocks();
  });

  afterEach(() => {
    resetMocks();
  });

  describe('createPostInputSchema', () => {
    it('should validate valid input', () => {
      const validInput = {
        content: 'Test content',
        platforms: ['twitter', 'linkedin'],
      };

      const result = createPostInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should apply default values', () => {
      const input = {
        content: 'Test content',
        platforms: ['twitter'],
      };

      const result = createPostInputSchema.parse(input);
      expect(result.createImage).toBe(false);
      expect(result.length).toBe('medium');
      expect(result.createHashtags).toBe(true);
      expect(result.postToSocialNetworks).toBe(false);
    });

    it('should reject empty content', () => {
      const invalidInput = {
        content: '',
        platforms: ['twitter'],
      };

      const result = createPostInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject content over 10,000 characters', () => {
      const invalidInput = {
        content: 'a'.repeat(10001),
        platforms: ['twitter'],
      };

      const result = createPostInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject empty platforms array', () => {
      const invalidInput = {
        content: 'Test content',
        platforms: [],
      };

      const result = createPostInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject more than 7 platforms', () => {
      const invalidInput = {
        content: 'Test content',
        platforms: [
          'twitter',
          'instagram',
          'linkedin',
          'facebook',
          'threads',
          'blog',
          'reddit',
          'twitter',
        ],
      };

      const result = createPostInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject invalid platform names', () => {
      const invalidInput = {
        content: 'Test content',
        platforms: ['invalid-platform'],
      };

      const result = createPostInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should validate ISO 8601 datetime for scheduleTime', () => {
      const validInput = {
        content: 'Test content',
        platforms: ['twitter'],
        scheduleTime: '2024-12-31T23:59:59Z',
      };

      const result = createPostInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject invalid datetime format', () => {
      const invalidInput = {
        content: 'Test content',
        platforms: ['twitter'],
        scheduleTime: '2024-12-31 23:59:59',
      };

      const result = createPostInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should validate content length options', () => {
      const lengths = ['very-short', 'short', 'medium', 'long'];

      for (const length of lengths) {
        const input = {
          content: 'Test content',
          platforms: ['twitter'],
          length,
        };

        const result = createPostInputSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid length option', () => {
      const invalidInput = {
        content: 'Test content',
        platforms: ['twitter'],
        length: 'extra-long',
      };

      const result = createPostInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should validate UUID for brandStyleId', () => {
      const validInput = {
        content: 'Test content',
        platforms: ['twitter'],
        brandStyleId: '123e4567-e89b-12d3-a456-426614174000',
      };

      const result = createPostInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject invalid UUID for brandStyleId', () => {
      const invalidInput = {
        content: 'Test content',
        platforms: ['twitter'],
        brandStyleId: 'not-a-uuid',
      };

      const result = createPostInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  describe('createPost', () => {
    const config = {
      apiKey: 'test-api-key',
      baseUrl: 'https://api.test.com',
    };

    it('should make POST request to correct endpoint', async () => {
      const mockPost = createMockPost();
      mockFetchSuccess(mockPost);

      const params = {
        content: 'Test content',
        platforms: ['twitter' as const],
      };

      await createPost(params, config);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/api/v1/posts',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'test-api-key',
          },
          body: JSON.stringify(params),
        })
      );
    });

    it('should return post data on success', async () => {
      const mockPost = createMockPost();
      mockFetchSuccess(mockPost);

      const params = {
        content: 'Test content',
        platforms: ['twitter' as const],
      };

      const result = await createPost(params, config);

      expect(result).toEqual(mockPost);
    });

    it('should throw error on HTTP error', async () => {
      mockFetchError('Bad Request', 400);

      const params = {
        content: 'Test content',
        platforms: ['twitter' as const],
      };

      await expect(createPost(params, config)).rejects.toThrow(
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
        content: 'Test content',
        platforms: ['twitter' as const],
      };

      await expect(createPost(params, config)).rejects.toThrow(
        'API error: Validation error'
      );
    });

    it('should throw error on network failure', async () => {
      mockFetchNetworkError('Network timeout');

      const params = {
        content: 'Test content',
        platforms: ['twitter' as const],
      };

      await expect(createPost(params, config)).rejects.toThrow('Network timeout');
    });
  });

  describe('formatCreatePostResponse', () => {
    it('should format basic post response', () => {
      const post = createMockPost();
      const result = formatCreatePostResponse(post);

      expect(result).toContain('# Post Created Successfully');
      expect(result).toContain('**Status:** draft');
      expect(result).toContain('## Original Content');
      expect(result).toContain('Test post content');
    });

    it('should format platform contents', () => {
      const post = createMockPost();
      const result = formatCreatePostResponse(post);

      expect(result).toContain('## Platform-Specific Content');
      expect(result).toContain('### Twitter');
      expect(result).toContain('Twitter version of the content');
      expect(result).toContain('### Linkedin');
      expect(result).toContain('LinkedIn version of the content');
    });

    it('should format hashtags when present', () => {
      const post = createMockPost();
      const result = formatCreatePostResponse(post);

      expect(result).toContain('**Hashtags:** #test #twitter');
      expect(result).toContain('**Hashtags:** #professional #linkedin');
    });

    it('should format images when present', () => {
      const post = createMockPost({
        images: [
          {
            id: '1',
            url: 'https://example.com/image.jpg',
            prompt: 'Test image prompt',
            style: 'photorealistic',
          },
        ],
      });
      const result = formatCreatePostResponse(post);

      expect(result).toContain('## Generated Images');
      expect(result).toContain('![Image](https://example.com/image.jpg)');
      expect(result).toContain('**Style:** photorealistic');
      expect(result).toContain('**Prompt:** Test image prompt');
    });

    it('should format scheduled time when present', () => {
      const scheduledAt = '2024-12-31T23:59:59Z';
      const post = createMockPost({ scheduledAt });
      const result = formatCreatePostResponse(post);

      expect(result).toContain('**Scheduled for:**');
    });

    it('should handle post without hashtags', () => {
      const post = createMockPost({
        platformContents: {
          twitter: {
            content: 'Twitter content',
          },
        },
      });
      const result = formatCreatePostResponse(post);

      expect(result).toContain('Twitter content');
      expect(result).not.toContain('**Hashtags:**');
    });
  });
});
