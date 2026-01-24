import { getApiBaseUrl, getContactApiKey } from '../utils/api';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = getApiBaseUrl();
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Profile
  async getProfile() {
    const data = await this.request<{ results: any[] }>('/public/profile/');
    return data.results?.[0] || null;
  }

  // Social Links
  async getSocialLinks() {
    const data = await this.request<{ results: any[] }>('/public/social-links/');
    return data.results || [];
  }

  // About
  async getAbout() {
    const data = await this.request<{ results: any[] }>('/public/about/');
    return data.results?.[0] || null;
  }

  // Experience
  async getExperience() {
    const data = await this.request<{ results: any[] }>('/public/experience/');
    return data.results || [];
  }

  // Journey Cards
  async getJourneyCards() {
    const data = await this.request<{ results: any[] }>('/public/journey-cards/');
    return data.results || [];
  }

  // Projects
  async getProjects() {
    const data = await this.request<{ results: any[] }>('/public/projects/');
    return data.results || [];
  }

  // Skills
  async getSkillCategories() {
    const data = await this.request<{ results: any[] }>('/public/skill-categories/');
    return data.results || [];
  }

  // Education
  async getEducation() {
    const data = await this.request<{ results: any[] }>('/public/education/');
    return data.results || [];
  }

  // Leadership
  async getLeadership() {
    const data = await this.request<{ results: any[] }>('/public/leadership/');
    return data.results?.[0] || null;
  }

  // Contact
  async getContactInfo() {
    const data = await this.request<{ results: any[] }>('/public/contact/');
    return data.results || [];
  }

  // Send Contact Email
  async sendContactEmail(formData: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<{ message?: string; error?: string; details?: any }> {
    const apiKey = getContactApiKey();
    
    if (!apiKey) {
      throw new Error('Contact API key not configured. Please check your config.js file.');
    }

    const url = `${this.baseUrl}/public/send-email/`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify(formData),
      });

      // Handle non-JSON responses
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server error: ${text || response.statusText}`);
      }

      if (!response.ok) {
        // Handle CORS errors
        if (response.status === 0 || response.status === 403) {
          throw new Error('CORS error: The backend may not be configured to allow requests from this origin. Please check CORS settings.');
        }
        throw new Error(data.error || data.details || `Failed to send email: ${response.statusText}`);
      }

      return data;
    } catch (error: any) {
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to reach the server. Please check your internet connection and API URL.');
      }
      throw error;
    }
  }
}

export const apiService = new ApiService();

