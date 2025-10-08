import type {
  PostResponse,
  BrandStyle,
  PaginatedPostsResponse,
  PostListItem,
} from '../types.js';

/**
 * Create a mock post response for testing
 */
export function createMockPost(overrides: Partial<PostResponse> = {}): PostResponse {
  return {
    postId: '123e4567-e89b-12d3-a456-426614174000',
    originalContent: 'Test post content',
    platformContents: {
      twitter: {
        content: 'Twitter version of the content',
        hashtags: ['#test', '#twitter'],
      },
      linkedin: {
        content: 'LinkedIn version of the content',
        hashtags: ['#professional', '#linkedin'],
      },
    },
    status: 'draft',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    ...overrides,
  };
}

/**
 * Create a mock post list item for testing
 */
export function createMockPostListItem(
  overrides: Partial<PostListItem> = {}
): PostListItem {
  return {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Post',
    status: 'draft',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    ...overrides,
  };
}

/**
 * Create a mock paginated posts response for testing
 */
export function createMockPaginatedPosts(
  overrides: Partial<PaginatedPostsResponse> = {}
): PaginatedPostsResponse {
  return {
    posts: [
      createMockPostListItem({ id: '1', title: 'Post 1' }),
      createMockPostListItem({ id: '2', title: 'Post 2' }),
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 2,
    },
    ...overrides,
  };
}

/**
 * Create a mock brand style for testing
 */
export function createMockBrandStyle(overrides: Partial<BrandStyle> = {}): BrandStyle {
  return {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Brand Style',
    contentMode: 'balanced',
    colors: {
      primary1: '#FF5733',
      primary2: '#C70039',
      background1: '#FFFFFF',
    },
    tone: {
      voice: 'professional',
      style: 'informative',
      purpose: 'educate',
      audience: 'developers',
      keywords: ['tech', 'innovation'],
    },
    imageryStyle: {
      tone: 'modern',
      image_type: 'photography',
      subject_focus: 'product',
    },
    isDefault: 'false',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    ...overrides,
  };
}
