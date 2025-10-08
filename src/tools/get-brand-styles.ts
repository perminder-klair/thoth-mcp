import { z } from 'zod';
import { ApiResponse, BrandStyle } from '../types.js';
import { createHeaders } from '../config.js';

/**
 * Zod schema for get-brand-styles tool input
 * No parameters required for this endpoint
 */
export const getBrandStylesInputSchema = z.object({});

export type GetBrandStylesInput = z.infer<typeof getBrandStylesInputSchema>;

/**
 * Get all brand styles via the Thoth API
 */
export async function getBrandStyles(
  config: { apiKey: string; baseUrl: string }
): Promise<BrandStyle[]> {
  const url = `${config.baseUrl}/api/v1/brand-styles`;

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

  const data = (await response.json()) as ApiResponse<BrandStyle[]>;

  if (!data.success) {
    throw new Error(`API error: ${'error' in data ? data.error : 'Unknown error'}`);
  }

  return data.data;
}

/**
 * Format the get-brand-styles response for MCP
 */
export function formatGetBrandStylesResponse(brandStyles: BrandStyle[]): string {
  const lines: string[] = [`# Brand Styles`, ``, `**Total:** ${brandStyles.length}`, ``];

  if (brandStyles.length === 0) {
    lines.push('No brand styles found.');
    return lines.join('\n');
  }

  lines.push('## Your Brand Styles');
  for (const style of brandStyles) {
    lines.push('');
    lines.push(`### ${style.name}`);
    lines.push(`- **Content Mode:** ${style.contentMode}`);
    if (style.isDefault === 'true') {
      lines.push(`- **Default:** Yes`);
    }
    lines.push(`- **Created:** ${new Date(style.createdAt).toLocaleString()}`);
    if (style.updatedAt) {
      lines.push(`- **Updated:** ${new Date(style.updatedAt).toLocaleString()}`);
    }
  }

  return lines.join('\n');
}
