import PocketBase from 'pocketbase';

// PocketBase configuration with Railway support
// Handle both browser (import.meta.env) and Node.js (process.env) environments
let PB_URL;

if (typeof import.meta !== 'undefined' && import.meta.env) {
  // Browser environment (Astro)
  PB_URL = import.meta.env.PUBLIC_POCKETBASE_URL;
} else {
  // Node.js environment (migration scripts)
  PB_URL = process.env.PUBLIC_POCKETBASE_URL;
}

// Fallback to localhost for development
PB_URL = PB_URL || 'http://127.0.0.1:8090';

console.log(`🔌 Connecting to PocketBase at: ${PB_URL}`);

// Create PocketBase instance
export const pb = new PocketBase(PB_URL);

// Helper functions for common operations
export const collections = {
  projects: 'projects',
  team: 'team',
  settings: 'settings',
};

// Authentication helpers
export const auth = {
  async login(email, password) {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      console.log('✅ PocketBase login successful');
      return { success: true, user: authData.record };
    } catch (error) {
      console.error('❌ PocketBase login failed:', error);
      return { success: false, error: error.message };
    }
  },

  async logout() {
    pb.authStore.clear();
    console.log('👋 PocketBase logout');
  },

  isLoggedIn() {
    return pb.authStore.isValid;
  },

  getCurrentUser() {
    return pb.authStore.model;
  }
};

// Projects helpers
export const projects = {
  async getAll(page = 1, perPage = 50, options = {}) {
    try {
      const defaultOptions = {
        sort: '-sortOrder, -created',
        filter: 'published = true',
        ...options
      };
      
      const result = await pb.collection('projects').getList(page, perPage, defaultOptions);
      console.log(`📊 Fetched ${result.items.length} projects from PocketBase`);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch projects from PocketBase:', error);
      return { items: [], page: 1, perPage, totalItems: 0, totalPages: 0 };
    }
  },

  async getFeatured(limit = 10) {
    try {
      const result = await pb.collection('projects').getList(1, limit, {
        filter: 'featured = true && published = true',
        sort: '-sortOrder, -year, -created'
      });
      console.log(`⭐ Fetched ${result.items.length} featured projects from PocketBase`);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch featured projects from PocketBase:', error);
      return { items: [] };
    }
  },

  async getByCategory(category, page = 1, perPage = 20) {
    try {
      const result = await pb.collection('projects').getList(page, perPage, {
        filter: `category = "${category}" && published = true`,
        sort: '-sortOrder, -year, -created'
      });
      console.log(`🏷️ Fetched ${result.items.length} projects in category: ${category}`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to fetch projects by category ${category}:`, error);
      return { items: [] };
    }
  },

  async getBySlug(slug) {
    try {
      const result = await pb.collection('projects').getFirstListItem(`slug="${slug}" && published = true`);
      console.log(`🎯 Found project with slug: ${slug}`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to fetch project by slug ${slug}:`, error);
      return null;
    }
  },

  async getForHero(limit = 11) {
    try {
      const result = await pb.collection('projects').getList(1, limit, {
        filter: 'published = true',
        sort: '-featured, -sortOrder, -created'
      });
      console.log(`🦸 Fetched ${result.items.length} projects for hero section`);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch hero projects:', error);
      return { items: [] };
    }
  },

  async create(data) {
    try {
      const result = await pb.collection('projects').create(data);
      console.log(`✅ Created project: ${data.title}`);
      return result;
    } catch (error) {
      console.error('❌ Failed to create project:', error);
      throw error;
    }
  },

  async update(id, data) {
    try {
      const result = await pb.collection('projects').update(id, data);
      console.log(`✅ Updated project: ${id}`);
      return result;
    } catch (error) {
      console.error('❌ Failed to update project:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const result = await pb.collection('projects').delete(id);
      console.log(`🗑️ Deleted project: ${id}`);
      return result;
    } catch (error) {
      console.error('❌ Failed to delete project:', error);
      throw error;
    }
  }
};

// Team members helpers
export const team = {
  async getAll(page = 1, perPage = 50) {
    try {
      const result = await pb.collection('team').getList(page, perPage, {
        filter: 'active = true',
        sort: 'order, created'
      });
      console.log(`👥 Fetched ${result.items.length} team members from PocketBase`);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch team members from PocketBase:', error);
      return { items: [] };
    }
  },

  async getById(id) {
    try {
      const result = await pb.collection('team').getOne(id);
      console.log(`👤 Found team member: ${result.name}`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to fetch team member ${id}:`, error);
      return null;
    }
  },

  async create(data) {
    try {
      const result = await pb.collection('team').create(data);
      console.log(`✅ Created team member: ${data.name}`);
      return result;
    } catch (error) {
      console.error('❌ Failed to create team member:', error);
      throw error;
    }
  },

  async update(id, data) {
    try {
      const result = await pb.collection('team').update(id, data);
      console.log(`✅ Updated team member: ${id}`);
      return result;
    } catch (error) {
      console.error('❌ Failed to update team member:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const result = await pb.collection('team').delete(id);
      console.log(`🗑️ Deleted team member: ${id}`);
      return result;
    } catch (error) {
      console.error('❌ Failed to delete team member:', error);
      throw error;
    }
  }
};

// Settings helpers
export const settings = {
  async get(key) {
    try {
      const result = await pb.collection('settings').getFirstListItem(`key="${key}"`);
      console.log(`⚙️ Found setting: ${key}`);
      return result.value;
    } catch (error) {
      console.error(`❌ Failed to fetch setting ${key}:`, error);
      return null;
    }
  },

  async set(key, value, description = '') {
    try {
      let result;
      try {
        // Try to update existing setting
        const existing = await pb.collection('settings').getFirstListItem(`key="${key}"`);
        result = await pb.collection('settings').update(existing.id, { value, description });
      } catch {
        // Create new setting if it doesn't exist
        result = await pb.collection('settings').create({ key, value, description });
      }
      console.log(`⚙️ Set setting: ${key}`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to set setting ${key}:`, error);
      throw error;
    }
  },

  async getAll() {
    try {
      const result = await pb.collection('settings').getFullList({
        sort: 'key'
      });
      console.log(`⚙️ Fetched ${result.length} settings`);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch settings:', error);
      return [];
    }
  },

  async delete(key) {
    try {
      const existing = await pb.collection('settings').getFirstListItem(`key="${key}"`);
      await pb.collection('settings').delete(existing.id);
      console.log(`🗑️ Deleted setting: ${key}`);
    } catch (error) {
      console.error(`❌ Failed to delete setting ${key}:`, error);
      throw error;
    }
  }
};

// File helpers
export const files = {
  getUrl(record, filename, thumb = '') {
    return pb.files.getUrl(record, filename, thumb);
  },

  async upload(collection, recordId, fieldName, file) {
    try {
      const formData = new FormData();
      formData.append(fieldName, file);
      
      const result = await pb.collection(collection).update(recordId, formData);
      console.log(`📁 Uploaded file to ${collection}/${recordId}/${fieldName}`);
      return result;
    } catch (error) {
      console.error('❌ Failed to upload file:', error);
      throw error;
    }
  }
};

// Content management helpers
export const content = {
  async getHeroProjects(limit = 11) {
    return await projects.getForHero(limit);
  },

  async getPortfolioPreview(startIndex = 0, count = 6) {
    try {
      const result = await projects.getAll(1, startIndex + count, {
        filter: 'published = true',
        sort: '-featured, -sortOrder, -created'
      });
      
      // Return only the requested slice
      const items = result.items.slice(startIndex, startIndex + count);
      console.log(`🎨 Fetched portfolio preview: ${items.length} items`);
      return { ...result, items };
    } catch (error) {
      console.error('❌ Failed to fetch portfolio preview:', error);
      return { items: [] };
    }
  },

  async getSiteSettings() {
    try {
      const allSettings = await settings.getAll();
      const settingsObj = {};
      
      allSettings.forEach(setting => {
        settingsObj[setting.key] = setting.value;
      });
      
      console.log(`🌐 Loaded site settings: ${Object.keys(settingsObj).length} keys`);
      return settingsObj;
    } catch (error) {
      console.error('❌ Failed to fetch site settings:', error);
      return {};
    }
  }
};

// Export everything
export default {
  pb,
  auth,
  projects,
  team,
  settings,
  files,
  content,
  collections
}; 