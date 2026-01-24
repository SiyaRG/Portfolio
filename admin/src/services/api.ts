import axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class AdminApiService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.api = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Load token from localStorage
    this.token = localStorage.getItem('access_token');
    if (this.token) {
      this.setToken(this.token);
    }

    // Add request interceptor to include token
    this.api.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });

    // Add response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && this.token) {
          // Token expired, try to refresh
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              const response = await axios.post(`${baseUrl}/auth/refresh/`, {
                refresh: refreshToken,
              });
              const { access } = response.data;
              this.setToken(access);
              error.config.headers.Authorization = `Bearer ${access}`;
              return this.api.request(error.config);
            }
          } catch (refreshError) {
            // Refresh failed, logout
            this.logout();
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('access_token', token);
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  setRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
  }

  logout() {
    this.token = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete this.api.defaults.headers.common['Authorization'];
  }

  // Authentication
  async login(username: string, password: string) {
    const response = await this.api.post('/auth/login/', { username, password });
    const { access, refresh } = response.data;
    this.setToken(access);
    this.setRefreshToken(refresh);
    return { access, refresh };
  }

  // Profile
  async getProfile() {
    const response = await this.api.get('/admin/profile/');
    return response.data;
  }

  async createProfile(data: FormData) {
    const response = await this.api.post('/admin/profile/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async updateProfile(id: number, data: FormData) {
    const response = await this.api.patch(`/admin/profile/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async deleteProfile(id: number) {
    await this.api.delete(`/admin/profile/${id}/`);
  }

  // Social Links
  async getSocialLinks() {
    const response = await this.api.get('/admin/social-links/');
    return response.data;
  }

  async createSocialLink(data: any) {
    const response = await this.api.post('/admin/social-links/', data);
    return response.data;
  }

  async updateSocialLink(id: number, data: any) {
    const response = await this.api.patch(`/admin/social-links/${id}/`, data);
    return response.data;
  }

  async deleteSocialLink(id: number) {
    await this.api.delete(`/admin/social-links/${id}/`);
  }

  async getSocialLink(id: number) {
    const response = await this.api.get(`/admin/social-links/${id}/`);
    return response.data;
  }

  // About
  async getAbout() {
    const response = await this.api.get('/admin/about/');
    return response.data;
  }

  async createAbout(data: FormData) {
    const response = await this.api.post('/admin/about/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async updateAbout(id: number, data: FormData) {
    const response = await this.api.patch(`/admin/about/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async deleteAbout(id: number) {
    await this.api.delete(`/admin/about/${id}/`);
  }

  // Experience
  async getExperiences() {
    const response = await this.api.get('/admin/experience/');
    return response.data;
  }

  async createExperience(data: any) {
    const response = await this.api.post('/admin/experience/', data);
    return response.data;
  }

  async updateExperience(id: number, data: any) {
    const response = await this.api.patch(`/admin/experience/${id}/`, data);
    return response.data;
  }

  async deleteExperience(id: number) {
    await this.api.delete(`/admin/experience/${id}/`);
  }

  async getExperienceItem(id: number) {
    const response = await this.api.get(`/admin/experience-items/${id}/`);
    return response.data;
  }

  async getExperienceItems() {
    const response = await this.api.get('/admin/experience-items/');
    return response.data;
  }

  // Experience Items
  async createExperienceItem(data: any) {
    const response = await this.api.post('/admin/experience-items/', data);
    return response.data;
  }

  async updateExperienceItem(id: number, data: any) {
    const response = await this.api.patch(`/admin/experience-items/${id}/`, data);
    return response.data;
  }

  async deleteExperienceItem(id: number) {
    await this.api.delete(`/admin/experience-items/${id}/`);
  }

  // Journey Cards
  async getJourneyCards() {
    const response = await this.api.get('/admin/journey-cards/');
    return response.data;
  }

  async createJourneyCard(data: FormData) {
    const response = await this.api.post('/admin/journey-cards/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async updateJourneyCard(id: number, data: FormData) {
    const response = await this.api.patch(`/admin/journey-cards/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async deleteJourneyCard(id: number) {
    await this.api.delete(`/admin/journey-cards/${id}/`);
  }

  async getJourneyCard(id: number) {
    const response = await this.api.get(`/admin/journey-cards/${id}/`);
    return response.data;
  }

  // Projects
  async getProjects() {
    const response = await this.api.get('/admin/projects/');
    return response.data;
  }

  async createProject(data: any) {
    const response = await this.api.post('/admin/projects/', data);
    return response.data;
  }

  async updateProject(id: number, data: any) {
    const response = await this.api.patch(`/admin/projects/${id}/`, data);
    return response.data;
  }

  async deleteProject(id: number) {
    await this.api.delete(`/admin/projects/${id}/`);
  }

  async getProject(id: number) {
    const response = await this.api.get(`/admin/projects/${id}/`);
    return response.data;
  }

  async getProjectAchievements() {
    const response = await this.api.get('/admin/project-achievements/');
    return response.data;
  }

  async getProjectAchievement(id: number) {
    const response = await this.api.get(`/admin/project-achievements/${id}/`);
    return response.data;
  }

  // Project Achievements
  async createProjectAchievement(data: any) {
    const response = await this.api.post('/admin/project-achievements/', data);
    return response.data;
  }

  async updateProjectAchievement(id: number, data: any) {
    const response = await this.api.patch(`/admin/project-achievements/${id}/`, data);
    return response.data;
  }

  async deleteProjectAchievement(id: number) {
    await this.api.delete(`/admin/project-achievements/${id}/`);
  }

  // Skills
  async getSkillCategories() {
    const response = await this.api.get('/admin/skill-categories/');
    return response.data;
  }

  async createSkillCategory(data: any) {
    const response = await this.api.post('/admin/skill-categories/', data);
    return response.data;
  }

  async updateSkillCategory(id: number, data: any) {
    const response = await this.api.patch(`/admin/skill-categories/${id}/`, data);
    return response.data;
  }

  async deleteSkillCategory(id: number) {
    await this.api.delete(`/admin/skill-categories/${id}/`);
  }

  async getSkillCategory(id: number) {
    const response = await this.api.get(`/admin/skill-categories/${id}/`);
    return response.data;
  }

  async getSkills() {
    const response = await this.api.get('/admin/skills/');
    return response.data;
  }

  async getSkill(id: number) {
    const response = await this.api.get(`/admin/skills/${id}/`);
    return response.data;
  }

  async createSkill(data: any) {
    const response = await this.api.post('/admin/skills/', data);
    return response.data;
  }

  async updateSkill(id: number, data: any) {
    const response = await this.api.patch(`/admin/skills/${id}/`, data);
    return response.data;
  }

  async deleteSkill(id: number) {
    await this.api.delete(`/admin/skills/${id}/`);
  }

  // Education
  async getEducation() {
    const response = await this.api.get('/admin/education/');
    return response.data;
  }

  async createEducation(data: any) {
    const response = await this.api.post('/admin/education/', data);
    return response.data;
  }

  async updateEducation(id: number, data: any) {
    const response = await this.api.patch(`/admin/education/${id}/`, data);
    return response.data;
  }

  async deleteEducation(id: number) {
    await this.api.delete(`/admin/education/${id}/`);
  }

  async getEducationEntry(id: number) {
    const response = await this.api.get(`/admin/education/${id}/`);
    return response.data;
  }

  // Leadership
  async getLeadership() {
    const response = await this.api.get('/admin/leadership/');
    return response.data;
  }

  async createLeadership(data: any) {
    const response = await this.api.post('/admin/leadership/', data);
    return response.data;
  }

  async updateLeadership(id: number, data: any) {
    const response = await this.api.patch(`/admin/leadership/${id}/`, data);
    return response.data;
  }

  async deleteLeadership(id: number) {
    await this.api.delete(`/admin/leadership/${id}/`);
  }

  async getLeadershipEntry(id: number) {
    const response = await this.api.get(`/admin/leadership/${id}/`);
    return response.data;
  }

  async getLeadershipAchievements() {
    const response = await this.api.get('/admin/leadership-achievements/');
    return response.data;
  }

  async getLeadershipAchievement(id: number) {
    const response = await this.api.get(`/admin/leadership-achievements/${id}/`);
    return response.data;
  }

  async createLeadershipAchievement(data: any) {
    const response = await this.api.post('/admin/leadership-achievements/', data);
    return response.data;
  }

  async updateLeadershipAchievement(id: number, data: any) {
    const response = await this.api.patch(`/admin/leadership-achievements/${id}/`, data);
    return response.data;
  }

  async deleteLeadershipAchievement(id: number) {
    await this.api.delete(`/admin/leadership-achievements/${id}/`);
  }

  // Contact
  async getContactInfo() {
    const response = await this.api.get('/admin/contact/');
    return response.data;
  }

  async createContactInfo(data: FormData) {
    const response = await this.api.post('/admin/contact/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async updateContactInfo(id: number, data: FormData) {
    const response = await this.api.patch(`/admin/contact/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async deleteContactInfo(id: number) {
    await this.api.delete(`/admin/contact/${id}/`);
  }

  async getContactInfoEntry(id: number) {
    const response = await this.api.get(`/admin/contact/${id}/`);
    return response.data;
  }
}

export const adminApi = new AdminApiService(API_BASE_URL);

