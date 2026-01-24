// Declare global config type
declare global {
  interface Window {
    __APP_CONFIG__?: {
      API_URL?: string;
      CONTACT_API_KEY?: string;
    };
  }
}

/**
 * Get the API base URL from environment variables or runtime config
 * @returns The API base URL (e.g., 'http://localhost:8000/api')
 */
export const getApiBaseUrl = (): string => {
  // Check for runtime config (for GitHub Pages)
  if (typeof window !== 'undefined' && window.__APP_CONFIG__?.API_URL) {
    return window.__APP_CONFIG__.API_URL;
  }
  // Fall back to build-time env variable (for Vite)
  return import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
};

/**
 * Get the contact API key from environment variables or runtime config
 * @returns The contact API key
 */
export const getContactApiKey = (): string => {
  // Check for runtime config (for GitHub Pages)
  if (typeof window !== 'undefined' && window.__APP_CONFIG__?.CONTACT_API_KEY) {
    return window.__APP_CONFIG__.CONTACT_API_KEY;
  }
  // Fall back to build-time env variable (for Vite)
  return import.meta.env.VITE_CONTACT_API_KEY || '';
};

/**
 * Get the backend base URL (without /api) for media files
 * @returns The backend base URL (e.g., 'http://localhost:8000')
 */
export const getBackendBaseUrl = (): string => {
  const apiUrl = getApiBaseUrl();
  // Remove /api suffix if present
  return apiUrl.replace(/\/api\/?$/, '');
};

/**
 * Get the full URL for a media file
 * @param path - The media file path (e.g., '/media/about/image.png' or 'about/image.png')
 * @returns The full URL to the media file
 */
export const getMediaUrl = (path: string | null | undefined): string | undefined => {
  if (!path) return undefined;
  
  // If it's already a full URL, return it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getBackendBaseUrl()}${normalizedPath}`;
};

