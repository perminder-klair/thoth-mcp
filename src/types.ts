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
  secondary1?: string;
  secondary2?: string;
}

/**
 * Brand tone configuration
 */
export interface BrandTone {
  voice?: string;
  style?: string;
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
  imageryStyle?: string;
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
