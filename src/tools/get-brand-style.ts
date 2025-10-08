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
    `**ID:** ${brandStyle.id}`,
    `**Content Mode:** ${brandStyle.contentMode}`,
  ];

  if (brandStyle.isDefault === 'true') {
    lines.push(`**Default Style:** Yes`);
  }

  lines.push(`**Created:** ${new Date(brandStyle.createdAt).toLocaleString()}`);
  if (brandStyle.updatedAt) {
    lines.push(`**Updated:** ${new Date(brandStyle.updatedAt).toLocaleString()}`);
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
    if (brandStyle.colors.secondary1) {
      lines.push(`- **Secondary 1:** ${brandStyle.colors.secondary1}`);
    }
    if (brandStyle.colors.secondary2) {
      lines.push(`- **Secondary 2:** ${brandStyle.colors.secondary2}`);
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
  }

  // Add imagery style if available
  if (brandStyle.imageryStyle) {
    lines.push('', '## Imagery Style');
    lines.push(brandStyle.imageryStyle);
  }

  return lines.join('\n');
}
