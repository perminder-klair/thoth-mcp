import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getBrandStylesInputSchema,
  getBrandStyles,
  formatGetBrandStylesResponse,
} from '../get-brand-styles.js';
import {
  createMockBrandStyle,
  mockFetchSuccess,
  mockFetchError,
  resetMocks,
} from '../../test-utils/index.js';

describe('get-brand-styles', () => {
  beforeEach(() => {
    resetMocks();
  });

  afterEach(() => {
    resetMocks();
  });

  describe('getBrandStylesInputSchema', () => {
    it('should validate empty input', () => {
      const input = {};
      const result = getBrandStylesInputSchema.safeParse(input);

      expect(result.success).toBe(true);
    });
  });

  describe('getBrandStyles', () => {
    const config = {
      apiKey: 'test-api-key',
      baseUrl: 'https://api.test.com',
    };

    it('should make GET request to correct endpoint', async () => {
      const mockStyles = [createMockBrandStyle()];
      mockFetchSuccess(mockStyles);

      await getBrandStyles(config);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/api/v1/brand-styles',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'test-api-key',
          },
        })
      );
    });

    it('should return array of brand styles on success', async () => {
      const mockStyles = [
        createMockBrandStyle({ id: '1', name: 'Style 1' }),
        createMockBrandStyle({ id: '2', name: 'Style 2' }),
      ];
      mockFetchSuccess(mockStyles);

      const result = await getBrandStyles(config);

      expect(result).toEqual(mockStyles);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no styles exist', async () => {
      mockFetchSuccess([]);

      const result = await getBrandStyles(config);

      expect(result).toEqual([]);
    });

    it('should throw error on HTTP error', async () => {
      mockFetchError('Unauthorized', 401);

      await expect(getBrandStyles(config)).rejects.toThrow(
        'API request failed: 401 - Unauthorized'
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

      await expect(getBrandStyles(config)).rejects.toThrow('API error: Database error');
    });
  });

  describe('formatGetBrandStylesResponse', () => {
    it('should format brand styles list', () => {
      const styles = [
        createMockBrandStyle({ name: 'Professional Style' }),
        createMockBrandStyle({ name: 'Casual Style' }),
      ];
      const result = formatGetBrandStylesResponse(styles);

      expect(result).toContain('# Brand Styles');
      expect(result).toContain('**Total:** 2');
      expect(result).toContain('## Your Brand Styles');
      expect(result).toContain('### Professional Style');
      expect(result).toContain('### Casual Style');
    });

    it('should include brand style IDs', () => {
      const styles = [
        createMockBrandStyle({ id: '123e4567-e89b-12d3-a456-426614174000' }),
      ];
      const result = formatGetBrandStylesResponse(styles);

      expect(result).toContain('**ID:** 123e4567-e89b-12d3-a456-426614174000');
    });

    it('should include content mode', () => {
      const styles = [createMockBrandStyle({ contentMode: 'creative' })];
      const result = formatGetBrandStylesResponse(styles);

      expect(result).toContain('**Content Mode:** creative');
    });

    it('should mark default brand style', () => {
      const styles = [createMockBrandStyle({ isDefault: 'true' })];
      const result = formatGetBrandStylesResponse(styles);

      expect(result).toContain('**Default:** Yes');
    });

    it('should not mark non-default brand styles', () => {
      const styles = [createMockBrandStyle({ isDefault: 'false' })];
      const result = formatGetBrandStylesResponse(styles);

      expect(result).not.toContain('**Default:** Yes');
    });

    it('should include tone purpose when present', () => {
      const styles = [
        createMockBrandStyle({
          tone: {
            purpose: 'educate and inform',
            voice: 'professional',
          },
        }),
      ];
      const result = formatGetBrandStylesResponse(styles);

      expect(result).toContain('**Purpose:** educate and inform');
    });

    it('should include target audience when present', () => {
      const styles = [
        createMockBrandStyle({
          tone: {
            audience: 'business professionals',
          },
        }),
      ];
      const result = formatGetBrandStylesResponse(styles);

      expect(result).toContain('**Target Audience:** business professionals');
    });

    it('should include voice and style when present', () => {
      const styles = [
        createMockBrandStyle({
          tone: {
            voice: 'friendly',
            style: 'conversational',
          },
        }),
      ];
      const result = formatGetBrandStylesResponse(styles);

      expect(result).toContain('**Voice & Style:** friendly, conversational');
    });

    it('should include visual style information', () => {
      const styles = [
        createMockBrandStyle({
          imageryStyle: {
            image_type: 'illustration',
            tone: 'vibrant',
          },
        }),
      ];
      const result = formatGetBrandStylesResponse(styles);

      expect(result).toContain('**Visual Style:** illustration, vibrant');
    });

    it('should handle empty brand styles array', () => {
      const result = formatGetBrandStylesResponse([]);

      expect(result).toContain('**Total:** 0');
      expect(result).toContain('No brand styles found.');
      expect(result).not.toContain('## Your Brand Styles');
    });

    it('should include creation and update dates', () => {
      const styles = [
        createMockBrandStyle({
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-15T00:00:00.000Z',
        }),
      ];
      const result = formatGetBrandStylesResponse(styles);

      expect(result).toContain('**Created:**');
      expect(result).toContain('**Updated:**');
    });

    it('should handle style without optional fields', () => {
      const styles = [
        createMockBrandStyle({
          tone: undefined,
          imageryStyle: undefined,
        }),
      ];
      const result = formatGetBrandStylesResponse(styles);

      expect(result).toContain('### Test Brand Style');
      expect(result).not.toContain('**Purpose:**');
      expect(result).not.toContain('**Visual Style:**');
    });

    it('should handle imageryStyle as string', () => {
      const styles = [
        createMockBrandStyle({
          imageryStyle: 'modern minimalist' as any,
        }),
      ];
      const result = formatGetBrandStylesResponse(styles);

      // Should not include visual style when it's a string
      expect(result).not.toContain('**Visual Style:**');
    });
  });
});
