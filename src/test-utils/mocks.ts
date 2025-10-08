import { vi } from 'vitest';
import type { ApiResponse } from '../types.js';

/**
 * Create a mock successful API response
 */
export function createMockApiResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
  };
}

/**
 * Create a mock error API response
 */
export function createMockApiError(error: string, code?: string): ApiResponse<never> {
  return {
    success: false,
    error,
    ...(code && { code }),
  };
}

/**
 * Mock fetch with a successful response
 */
export function mockFetchSuccess<T>(data: T, status = 200) {
  global.fetch = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => createMockApiResponse(data),
  } as Response);
}

/**
 * Mock fetch with an error response
 */
export function mockFetchError(error: string, status = 400, code?: string) {
  global.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status,
    json: async () => createMockApiError(error, code),
  } as Response);
}

/**
 * Mock fetch to throw a network error
 */
export function mockFetchNetworkError(message = 'Network error') {
  global.fetch = vi.fn().mockRejectedValue(new Error(message));
}

/**
 * Reset all mocks
 */
export function resetMocks() {
  vi.restoreAllMocks();
}
