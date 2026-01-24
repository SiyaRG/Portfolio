/**
 * Get the API base URL from environment variables
 * @returns The API base URL (e.g., 'http://localhost:8000/api')
 */
export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
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

