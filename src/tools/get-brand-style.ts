import { z } from 'zod';
import { ApiResponse, BrandStyle } from '../types.js';
import { createHeaders } from '../config.js';

/**
 * Zod schema for get-brand-style tool input
 */
export const getBrandStyleInputSchema = z.object({
  brandStyleId: z
    .string()
    .min(1, 'Brand style ID is required')
    .describe('The unique identifier of the brand style to retrieve'),
});

export type GetBrandStyleInput = z.infer<typeof getBrandStyleInputSchema>;

/**
 * Get a brand style by ID via the Thoth API
 */
export async function getBrandStyle(
  params: GetBrandStyleInput,
  config: { apiKey: string; baseUrl: string }
): Promise<BrandStyle> {
  const url = `${config.baseUrl}/api/v1/brand-styles/${params.brandStyleId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: createHeaders(config.apiKey),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Brand style not found: ${params.brandStyleId}`);
    }

    const errorData = (await response.json()) as ApiResponse<never>;
    throw new Error(
      `API request failed: ${response.status} - ${
        'error' in errorData ? errorData.error : 'Unknown error'
      }`
    );
  }

  const data = (await response.json()) as ApiResponse<BrandStyle>;

  if (!data.success) {
    throw new Error(`API error: ${'error' in data ? data.error : 'Unknown error'}`);
  }

  return data.data;
}

/**
 * Format the get-brand-style response for MCP
 */
export function formatGetBrandStyleResponse(brandStyle: BrandStyle): string {
  const lines: string[] = [
    `# Brand Style: ${brandStyle.name}`,
    ``,
    `**Content Mode:** ${brandStyle.contentMode}`,
  ];

  if (brandStyle.isDefault === 'true') {
    lines.push(`**Default Style:** Yes`);
  }

  lines.push(`**Created:** ${new Date(brandStyle.createdAt).toLocaleString()}`);
  if (brandStyle.updatedAt) {
    lines.push(`**Updated:** ${new Date(brandStyle.updatedAt).toLocaleString()}`);
  }

  // Add brand identity section if available
  if (brandStyle.brandIdentity) {
    lines.push('', '## Brand Identity');
    if (brandStyle.brandIdentity.brand_name) {
      lines.push(`- **Brand Name:** ${brandStyle.brandIdentity.brand_name}`);
    }
    if (brandStyle.brandIdentity.tagline) {
      lines.push(`- **Tagline:** ${brandStyle.brandIdentity.tagline}`);
    }
    if (brandStyle.brandIdentity.primary_colors && brandStyle.brandIdentity.primary_colors.length > 0) {
      lines.push(`- **Primary Colors:** ${brandStyle.brandIdentity.primary_colors.join(', ')}`);
    }
    if (brandStyle.brandIdentity.secondary_colors && brandStyle.brandIdentity.secondary_colors.length > 0) {
      lines.push(`- **Secondary Colors:** ${brandStyle.brandIdentity.secondary_colors.join(', ')}`);
    }
  }

  // Add colors section if available
  if (brandStyle.colors) {
    lines.push('', '## Brand Colors');
    if (brandStyle.colors.primary1) {
      lines.push(`- **Primary 1:** ${brandStyle.colors.primary1}`);
    }
    if (brandStyle.colors.primary2) {
      lines.push(`- **Primary 2:** ${brandStyle.colors.primary2}`);
    }
    if (brandStyle.colors.primary3) {
      lines.push(`- **Primary 3:** ${brandStyle.colors.primary3}`);
    }
    if (brandStyle.colors.secondary1) {
      lines.push(`- **Secondary 1:** ${brandStyle.colors.secondary1}`);
    }
    if (brandStyle.colors.secondary2) {
      lines.push(`- **Secondary 2:** ${brandStyle.colors.secondary2}`);
    }
    if (brandStyle.colors.background1) {
      lines.push(`- **Background 1:** ${brandStyle.colors.background1}`);
    }
    if (brandStyle.colors.background2) {
      lines.push(`- **Background 2:** ${brandStyle.colors.background2}`);
    }
  }

  // Add tone section if available
  if (brandStyle.tone) {
    lines.push('', '## Brand Tone');
    if (brandStyle.tone.voice) {
      lines.push(`- **Voice:** ${brandStyle.tone.voice}`);
    }
    if (brandStyle.tone.style) {
      lines.push(`- **Style:** ${brandStyle.tone.style}`);
    }
    if (brandStyle.tone.purpose) {
      lines.push(`- **Purpose:** ${brandStyle.tone.purpose}`);
    }
    if (brandStyle.tone.audience) {
      lines.push(`- **Target Audience:** ${brandStyle.tone.audience}`);
    }
    if (brandStyle.tone.syntax && brandStyle.tone.syntax.length > 0) {
      lines.push(`- **Syntax:** ${brandStyle.tone.syntax.join(', ')}`);
    }
    if (brandStyle.tone.emotion && brandStyle.tone.emotion.length > 0) {
      lines.push(`- **Emotions:** ${brandStyle.tone.emotion.join(', ')}`);
    }
    if (brandStyle.tone.keywords && brandStyle.tone.keywords.length > 0) {
      lines.push(`- **Keywords:** ${brandStyle.tone.keywords.join(', ')}`);
    }
    if (brandStyle.tone.language && brandStyle.tone.language.length > 0) {
      lines.push(`- **Language Style:** ${brandStyle.tone.language.join(', ')}`);
    }
    if (brandStyle.tone.character && brandStyle.tone.character.length > 0) {
      lines.push(`- **Brand Character:** ${brandStyle.tone.character.join(', ')}`);
    }
  }

  // Add imagery style if available
  if (brandStyle.imageryStyle) {
    lines.push('', '## Imagery Style');
    if (typeof brandStyle.imageryStyle === 'string') {
      lines.push(brandStyle.imageryStyle);
    } else {
      if (brandStyle.imageryStyle.tone) {
        lines.push(`- **Tone:** ${brandStyle.imageryStyle.tone}`);
      }
      if (brandStyle.imageryStyle.image_type) {
        lines.push(`- **Image Type:** ${brandStyle.imageryStyle.image_type}`);
      }
      if (brandStyle.imageryStyle.subject_focus) {
        lines.push(`- **Subject Focus:** ${brandStyle.imageryStyle.subject_focus}`);
      }
      if (brandStyle.imageryStyle.quality_assessment) {
        lines.push(`- **Quality:** ${brandStyle.imageryStyle.quality_assessment}`);
      }

      if (brandStyle.imageryStyle.visual_mood) {
        lines.push('', '### Visual Mood');
        if (brandStyle.imageryStyle.visual_mood.energy_level) {
          lines.push(`- **Energy Level:** ${brandStyle.imageryStyle.visual_mood.energy_level}`);
        }
        if (brandStyle.imageryStyle.visual_mood.time_preference) {
          lines.push(`- **Time Preference:** ${brandStyle.imageryStyle.visual_mood.time_preference}`);
        }
        if (brandStyle.imageryStyle.visual_mood.emotional_keywords && brandStyle.imageryStyle.visual_mood.emotional_keywords.length > 0) {
          lines.push(`- **Emotional Keywords:** ${brandStyle.imageryStyle.visual_mood.emotional_keywords.join(', ')}`);
        }
      }

      if (brandStyle.imageryStyle.artistic_style) {
        lines.push('', '### Artistic Style');
        if (brandStyle.imageryStyle.artistic_style.texture) {
          lines.push(`- **Texture:** ${brandStyle.imageryStyle.artistic_style.texture}`);
        }
        if (brandStyle.imageryStyle.artistic_style.detail_level) {
          lines.push(`- **Detail Level:** ${brandStyle.imageryStyle.artistic_style.detail_level}`);
        }
      }

      if (brandStyle.imageryStyle.brand_visual_elements) {
        lines.push('', '### Brand Visual Elements');
        if (brandStyle.imageryStyle.brand_visual_elements.must_include_elements && brandStyle.imageryStyle.brand_visual_elements.must_include_elements.length > 0) {
          lines.push(`- **Must Include:** ${brandStyle.imageryStyle.brand_visual_elements.must_include_elements.join(', ')}`);
        }
        if (brandStyle.imageryStyle.brand_visual_elements.recurring_motifs && brandStyle.imageryStyle.brand_visual_elements.recurring_motifs.length > 0) {
          lines.push(`- **Recurring Motifs:** ${brandStyle.imageryStyle.brand_visual_elements.recurring_motifs.join(', ')}`);
        }
        if (brandStyle.imageryStyle.brand_visual_elements.avoid_elements && brandStyle.imageryStyle.brand_visual_elements.avoid_elements.length > 0) {
          lines.push(`- **Avoid:** ${brandStyle.imageryStyle.brand_visual_elements.avoid_elements.join(', ')}`);
        }
      }
    }
  }

  // Add medium info if available
  if (brandStyle.mediumInfo) {
    lines.push('', '## Medium Preferences');
    if (brandStyle.mediumInfo.language) {
      lines.push(`- **Language:** ${brandStyle.mediumInfo.language}`);
    }
    if (brandStyle.mediumInfo.text_density) {
      lines.push(`- **Text Density:** ${brandStyle.mediumInfo.text_density}`);
    }
  }

  return lines.join('\n');
}
