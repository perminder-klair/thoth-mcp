import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getBrandStyleInputSchema,
  getBrandStyle,
  formatGetBrandStyleResponse,
} from '../get-brand-style.js';
import {
  createMockBrandStyle,
  mockFetchSuccess,
  mockFetchError,
  resetMocks,
} from '../../test-utils/index.js';

describe('get-brand-style', () => {
  beforeEach(() => {
    resetMocks();
  });

  afterEach(() => {
    resetMocks();
  });

  describe('getBrandStyleInputSchema', () => {
    it('should validate valid brand style ID', () => {
      const validInput = {
        brandStyleId: '123e4567-e89b-12d3-a456-426614174000',
      };

      const result = getBrandStyleInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject empty brand style ID', () => {
      const invalidInput = {
        brandStyleId: '',
      };

      const result = getBrandStyleInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject missing brand style ID', () => {
      const invalidInput = {};

      const result = getBrandStyleInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  describe('getBrandStyle', () => {
    const config = {
      apiKey: 'test-api-key',
      baseUrl: 'https://api.test.com',
    };

    it('should make GET request to correct endpoint', async () => {
      const mockStyle = createMockBrandStyle();
      mockFetchSuccess(mockStyle);

      const params = {
        brandStyleId: '123e4567-e89b-12d3-a456-426614174000',
      };

      await getBrandStyle(params, config);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/api/v1/brand-styles/123e4567-e89b-12d3-a456-426614174000',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'test-api-key',
          },
        })
      );
    });

    it('should return brand style data on success', async () => {
      const mockStyle = createMockBrandStyle();
      mockFetchSuccess(mockStyle);

      const params = {
        brandStyleId: '123e4567-e89b-12d3-a456-426614174000',
      };

      const result = await getBrandStyle(params, config);

      expect(result).toEqual(mockStyle);
    });

    it('should throw "Brand style not found" error for 404', async () => {
      mockFetchError('Not found', 404);

      const params = {
        brandStyleId: '123e4567-e89b-12d3-a456-426614174000',
      };

      await expect(getBrandStyle(params, config)).rejects.toThrow(
        'Brand style not found: 123e4567-e89b-12d3-a456-426614174000'
      );
    });

    it('should throw error on HTTP error', async () => {
      mockFetchError('Bad Request', 400);

      const params = {
        brandStyleId: '123e4567-e89b-12d3-a456-426614174000',
      };

      await expect(getBrandStyle(params, config)).rejects.toThrow(
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
        brandStyleId: '123e4567-e89b-12d3-a456-426614174000',
      };

      await expect(getBrandStyle(params, config)).rejects.toThrow(
        'API error: Internal error'
      );
    });
  });

  describe('formatGetBrandStyleResponse', () => {
    it('should format basic brand style', () => {
      const style = createMockBrandStyle({ name: 'Professional Style' });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('# Brand Style: Professional Style');
      expect(result).toContain('**Content Mode:** balanced');
      expect(result).toContain('**Created:**');
    });

    it('should mark default brand style', () => {
      const style = createMockBrandStyle({ isDefault: 'true' });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('**Default Style:** Yes');
    });

    it('should include brand identity section', () => {
      const style = createMockBrandStyle({
        brandIdentity: {
          brand_name: 'Acme Corp',
          tagline: 'Innovation at its best',
          primary_colors: ['#FF5733', '#C70039'],
          secondary_colors: ['#900C3F', '#581845'],
        },
      });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('## Brand Identity');
      expect(result).toContain('**Brand Name:** Acme Corp');
      expect(result).toContain('**Tagline:** Innovation at its best');
      expect(result).toContain('**Primary Colors:** #FF5733, #C70039');
      expect(result).toContain('**Secondary Colors:** #900C3F, #581845');
    });

    it('should include brand colors section', () => {
      const style = createMockBrandStyle({
        colors: {
          primary1: '#FF5733',
          primary2: '#C70039',
          primary3: '#900C3F',
          secondary1: '#581845',
          secondary2: '#FFC300',
          background1: '#FFFFFF',
          background2: '#F0F0F0',
        },
      });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('## Brand Colors');
      expect(result).toContain('**Primary 1:** #FF5733');
      expect(result).toContain('**Primary 2:** #C70039');
      expect(result).toContain('**Background 1:** #FFFFFF');
    });

    it('should include brand tone section', () => {
      const style = createMockBrandStyle({
        tone: {
          voice: 'professional',
          style: 'informative',
          purpose: 'educate',
          audience: 'developers',
          syntax: ['active voice', 'clear'],
          emotion: ['confident', 'friendly'],
          keywords: ['innovation', 'quality'],
          language: ['technical', 'precise'],
          character: ['authoritative', 'helpful'],
        },
      });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('## Brand Tone');
      expect(result).toContain('**Voice:** professional');
      expect(result).toContain('**Style:** informative');
      expect(result).toContain('**Purpose:** educate');
      expect(result).toContain('**Target Audience:** developers');
      expect(result).toContain('**Syntax:** active voice, clear');
      expect(result).toContain('**Emotions:** confident, friendly');
      expect(result).toContain('**Keywords:** innovation, quality');
      expect(result).toContain('**Language Style:** technical, precise');
      expect(result).toContain('**Brand Character:** authoritative, helpful');
    });

    it('should handle imagery style as string', () => {
      const style = createMockBrandStyle({
        imageryStyle: 'Modern minimalist photography' as any,
      });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('## Imagery Style');
      expect(result).toContain('Modern minimalist photography');
    });

    it('should format imagery style object', () => {
      const style = createMockBrandStyle({
        imageryStyle: {
          tone: 'vibrant',
          image_type: 'photography',
          subject_focus: 'product',
          quality_assessment: 'high-quality',
        },
      });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('## Imagery Style');
      expect(result).toContain('**Tone:** vibrant');
      expect(result).toContain('**Image Type:** photography');
      expect(result).toContain('**Subject Focus:** product');
      expect(result).toContain('**Quality:** high-quality');
    });

    it('should include visual mood subsection', () => {
      const style = createMockBrandStyle({
        imageryStyle: {
          visual_mood: {
            energy_level: 'high',
            time_preference: 'daytime',
            emotional_keywords: ['energetic', 'inspiring'],
          },
        },
      });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('### Visual Mood');
      expect(result).toContain('**Energy Level:** high');
      expect(result).toContain('**Time Preference:** daytime');
      expect(result).toContain('**Emotional Keywords:** energetic, inspiring');
    });

    it('should include artistic style subsection', () => {
      const style = createMockBrandStyle({
        imageryStyle: {
          artistic_style: {
            texture: 'smooth',
            detail_level: 'high',
          },
        },
      });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('### Artistic Style');
      expect(result).toContain('**Texture:** smooth');
      expect(result).toContain('**Detail Level:** high');
    });

    it('should include brand visual elements subsection', () => {
      const style = createMockBrandStyle({
        imageryStyle: {
          brand_visual_elements: {
            must_include_elements: ['logo', 'brand colors'],
            recurring_motifs: ['geometric shapes', 'gradients'],
            avoid_elements: ['cluttered backgrounds', 'harsh lighting'],
          },
        },
      });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('### Brand Visual Elements');
      expect(result).toContain('**Must Include:** logo, brand colors');
      expect(result).toContain('**Recurring Motifs:** geometric shapes, gradients');
      expect(result).toContain('**Avoid:** cluttered backgrounds, harsh lighting');
    });

    it('should include medium preferences section', () => {
      const style = createMockBrandStyle({
        mediumInfo: {
          language: 'English',
          text_density: 'medium',
        },
      });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('## Medium Preferences');
      expect(result).toContain('**Language:** English');
      expect(result).toContain('**Text Density:** medium');
    });

    it('should handle minimal brand style with few fields', () => {
      const style = createMockBrandStyle({
        brandIdentity: undefined,
        colors: undefined,
        tone: undefined,
        imageryStyle: undefined,
        mediumInfo: undefined,
      });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('# Brand Style: Test Brand Style');
      expect(result).not.toContain('## Brand Identity');
      expect(result).not.toContain('## Brand Colors');
      expect(result).not.toContain('## Brand Tone');
      expect(result).not.toContain('## Imagery Style');
      expect(result).not.toContain('## Medium Preferences');
    });

    it('should handle brand identity with null tagline', () => {
      const style = createMockBrandStyle({
        brandIdentity: {
          brand_name: 'Test Brand',
          tagline: null,
        },
      });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('## Brand Identity');
      expect(result).toContain('**Brand Name:** Test Brand');
      expect(result).not.toContain('**Tagline:**');
    });

    it('should handle empty arrays in brand identity', () => {
      const style = createMockBrandStyle({
        brandIdentity: {
          primary_colors: [],
          secondary_colors: [],
        },
      });
      const result = formatGetBrandStyleResponse(style);

      expect(result).toContain('## Brand Identity');
      expect(result).not.toContain('**Primary Colors:**');
      expect(result).not.toContain('**Secondary Colors:**');
    });
  });
});
