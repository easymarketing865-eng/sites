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
  // Add more collections as needed
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
  async getAll(page = 1, perPage = 50) {
    try {
      const result = await pb.collection('projects').getList(page, perPage, {
        sort: '-created',
      });
      console.log(`📊 Fetched ${result.items.length} projects from PocketBase`);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch projects from PocketBase:', error);
      return { items: [], page: 1, perPage, totalItems: 0, totalPages: 0 };
    }
  },

  async getFeatured() {
    try {
      const result = await pb.collection('projects').getList(1, 10, {
        filter: 'featured = true',
        sort: '-year, -created'
      });
      console.log(`⭐ Fetched ${result.items.length} featured projects from PocketBase`);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch featured projects from PocketBase:', error);
      return { items: [] };
    }
  },

  async getBySlug(slug) {
    try {
      const result = await pb.collection('projects').getFirstListItem(`slug="${slug}"`);
      console.log(`🎯 Found project with slug: ${slug}`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to fetch project by slug ${slug}:`, error);
      return null;
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

// File helpers
export const files = {
  getUrl(record, filename, thumb = '') {
    return pb.files.getUrl(record, filename, thumb);
  }
}; 