import { z } from 'zod';

/**
 * Platform types supported by Thoth
 */
export const platformSchema = z.enum([
  'twitter',
  'instagram',
  'linkedin',
  'facebook',
  'threads',
  'blog',
  'reddit',
]);

export type Platform = z.infer<typeof platformSchema>;

/**
 * Content length options
 */
export const lengthSchema = z.enum(['very-short', 'short', 'medium', 'long']);

export type ContentLength = z.infer<typeof lengthSchema>;

/**
 * Post status types
 */
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

/**
 * Platform-specific content
 */
export interface PlatformContent {
  content: string;
  hashtags?: string[];
}

/**
 * Generated image data
 */
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: string;
}

/**
 * Create post request parameters
 */
export interface CreatePostParams {
  content: string;
  platforms: Platform[];
  scheduleTime?: string;
  createImage?: boolean;
  length?: ContentLength;
  createHashtags?: boolean;
  postToSocialNetworks?: boolean;
  brandStyleId?: string;
}

/**
 * Post response from API
 */
export interface PostResponse {
  postId: string;
  originalContent: string;
  platformContents: Record<string, PlatformContent>;
  status: PostStatus;
  scheduledAt?: string;
  publishedAt?: string;
  images?: GeneratedImage[];
  socialPostId?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * API error response
 */
export interface ApiError {
  success: false;
  error: string;
  code?: string;
}

/**
 * API success response
 */
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/**
 * Brand colors configuration
 */
export interface BrandColors {
  primary1?: string;
  primary2?: string;
  primary3?: string;
  secondary1?: string;
  secondary2?: string;
  background1?: string;
  background2?: string;
}

/**
 * Brand logo information
 */
export interface BrandLogo {
  style?: string;
  exists?: boolean;
  position?: string;
  confidence?: number;
  extracted_colors?: string[];
}

/**
 * Brand identity information
 */
export interface BrandIdentity {
  logo?: BrandLogo;
  tagline?: string | null;
  brand_name?: string;
  primary_colors?: string[];
  secondary_colors?: string[];
}

/**
 * Brand tone configuration
 */
export interface BrandTone {
  voice?: string;
  style?: string;
  syntax?: string[];
  emotion?: string[];
  purpose?: string;
  audience?: string;
  keywords?: string[];
  language?: string[];
  character?: string[];
}

/**
 * Visual mood configuration
 */
export interface VisualMood {
  energy_level?: string;
  time_preference?: string;
  emotional_keywords?: string[];
}

/**
 * Artistic style configuration
 */
export interface ArtisticStyle {
  texture?: string;
  detail_level?: string;
}

/**
 * Brand visual elements configuration
 */
export interface BrandVisualElements {
  avoid_elements?: string[];
  recurring_motifs?: string[];
  must_include_elements?: string[];
}

/**
 * Imagery style configuration
 */
export interface ImageryStyle {
  tone?: string;
  image_type?: string;
  visual_mood?: VisualMood;
  subject_focus?: string;
  artistic_style?: ArtisticStyle;
  quality_assessment?: string;
  brand_visual_elements?: BrandVisualElements;
}

/**
 * Medium information configuration
 */
export interface MediumInfo {
  language?: string;
  text_density?: string;
}

/**
 * Brand style response from API
 */
export interface BrandStyle {
  id: string;
  name: string;
  contentMode: string;
  colors?: BrandColors;
  tone?: BrandTone;
  imageryStyle?: ImageryStyle;
  logo?: string;
  brandIdentity?: BrandIdentity;
  mediumInfo?: MediumInfo;
  isDefault?: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Pagination metadata
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

/**
 * Paginated posts list response
 */
export interface PostListItem {
  id: string;
  title?: string;
  status: PostStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface PaginatedPostsResponse {
  posts: PostListItem[];
  pagination: Pagination;
}

/**
 * Update post request parameters
 */
export interface UpdatePostParams {
  postId: string;
  title?: string;
  originalContent?: string;
  platformContents?: Record<string, PlatformContent>;
  status?: PostStatus;
}

/**
 * Configuration for the MCP server
 */
export interface ServerConfig {
  apiKey: string;
  baseUrl: string;
  port?: number;
  remote?: boolean;
}
