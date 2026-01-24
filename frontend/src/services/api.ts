const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
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
    const apiKey = import.meta.env.VITE_CONTACT_API_KEY || '';
    
    // Debug logging
    console.log('API Key from env:', apiKey ? `${apiKey.substring(0, 5)}...` : 'NOT FOUND');
    console.log('Full API Key length:', apiKey.length);
    
    if (!apiKey) {
      throw new Error('Contact API key not configured');
    }

    const url = `${this.baseUrl}/public/send-email/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Failed to send email: ${response.statusText}`);
    }

    return data;
  }
}

export const apiService = new ApiService(API_BASE_URL);

