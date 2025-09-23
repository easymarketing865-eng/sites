import PocketBase from 'pocketbase';

// Simple in-memory cache for PocketBase responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class PocketBaseCache {
  static set(key, data, duration = CACHE_DURATION) {
    const expiry = Date.now() + duration;
    cache.set(key, { data, expiry });
    console.log(`📦 Cached: ${key} (expires in ${duration/1000}s)`);
  }

  static get(key) {
    const cached = cache.get(key);
    if (!cached || Date.now() > cached.expiry) {
      cache.delete(key);
      return null;
    }
    console.log(`✨ Cache hit: ${key}`);
    return cached.data;
  }

  static createKey(collection, filter = '', sort = '', page = 1, perPage = 50) {
    return `${collection}-${filter}-${sort}-${page}-${perPage}`;
  }
}

// Load environment variables for Node.js context
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  try {
    const dotenv = await import('dotenv');
    dotenv.config();
  } catch (e) {
    // dotenv not available, that's okay
  }
}

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

// Disable auto-cancellation to prevent concurrent request conflicts
// This solves the "request was autocancelled" errors when multiple components
// make simultaneous API calls during page load
pb.autoCancellation(false);

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
        sort: 'order,-created',  // Sort by order first, then by creation date
        filter: 'visible = true',  // Only show visible projects by default
        ...options
      };
      
      // Create cache key
      const cacheKey = PocketBaseCache.createKey(
        'projects', 
        defaultOptions.filter || '', 
        defaultOptions.sort, 
        page, 
        perPage
      );
      
      // Check cache first
      const cached = PocketBaseCache.get(cacheKey);
      if (cached) {
        return cached;
      }
      
      // Fetch from PocketBase
      const result = await pb.collection('projects').getList(page, perPage, defaultOptions);
      console.log(`📊 Fetched ${result.items.length} projects from PocketBase`);
      
      // Cache the result
      PocketBaseCache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch projects from PocketBase:', error);
      return { items: [], page: 1, perPage, totalItems: 0, totalPages: 0 };
    }
  },

  async getFeatured(limit = 10) {
    try {
      const result = await pb.collection('projects').getList(1, limit, {
        filter: 'featured = true && visible = true',
        sort: 'order,-created'  // Sort by order first (ascending), then by creation date (descending)
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
        filter: `category = "${category}" && visible = true`,
        sort: '+order,-created'
      });
      console.log(`🏷️ Fetched ${result.items.length} projects in category: ${category}`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to fetch projects by category ${category}:`, error);
      return { items: [] };
    }
  },

  async getById(id) {
    try {
      const result = await pb.collection('projects').getOne(id);
      console.log(`🎯 Found project with ID: ${id}`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to fetch project by ID ${id}:`, error);
      throw error;
    }
  },

  async getBySlug(slug) {
    try {
      const result = await pb.collection('projects').getFirstListItem(`slug="${slug}"`);
      console.log(`🎯 Found project with slug: ${slug}`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to fetch project by slug ${slug}:`, error);
      throw error;
    }
  },

  async getForHero(limit = 11) {
    try {
      // Get featured projects first, ordered by custom order
      let result = await pb.collection('projects').getList(1, limit, {
        filter: 'featured = true && visible = true',
        sort: 'order,-created'  // Sort by order first, then by creation date
      });
      
      console.log(`🦸 Found ${result.items.length} featured projects`);
      
      // If we don't have enough featured projects, fill with other visible projects
      if (result.items.length < limit) {
        const remaining = limit - result.items.length;
        const otherProjects = await pb.collection('projects').getList(1, remaining, {
          filter: 'featured != true && visible = true',
          sort: '+order,-created'
        });
        
        console.log(`🦸 Added ${otherProjects.items.length} additional projects`);
        result.items = [...result.items, ...otherProjects.items];
      }
      
      console.log(`🦸 Fetched ${result.items.length} total projects for hero section`);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch hero projects:', error);
      // Fallback: try without any filters except visibility
      try {
        const result = await pb.collection('projects').getList(1, limit, {
          filter: 'visible = true',
          sort: '+order,-created'
        });
        console.log(`🦸 Fallback: Fetched ${result.items.length} projects for hero section`);
        return result;
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError);
        return { items: [] };
      }
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
  },

  // New helper functions for order and visibility management
  async setOrder(id, order) {
    try {
      const result = await pb.collection('projects').update(id, { order });
      console.log(`📊 Updated project order: ${id} -> ${order}`);
      return result;
    } catch (error) {
      console.error('❌ Failed to update project order:', error);
      throw error;
    }
  },

  async setVisibility(id, visible) {
    try {
      const result = await pb.collection('projects').update(id, { visible });
      console.log(`👁️ Updated project visibility: ${id} -> ${visible ? 'visible' : 'hidden'}`);
      return result;
    } catch (error) {
      console.error('❌ Failed to update project visibility:', error);
      throw error;
    }
  },

  async getAllWithHidden(page = 1, perPage = 50, options = {}) {
    try {
      const defaultOptions = {
        sort: 'order, -created',  // Sort by order first, then by creation date
        ...options
      };
      
      // This function returns ALL projects including hidden ones (for admin use)
      const result = await pb.collection('projects').getList(page, perPage, defaultOptions);
      console.log(`📊 Fetched ${result.items.length} projects (including hidden) from PocketBase`);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch all projects from PocketBase:', error);
      return { items: [], page: 1, perPage, totalItems: 0, totalPages: 0 };
    }
  },

  async reorderFeatured(projectOrders) {
    try {
      // projectOrders should be an array of { id, order } objects
      const updatePromises = projectOrders.map(({ id, order }) => 
        pb.collection('projects').update(id, { order })
      );
      
      await Promise.all(updatePromises);
      console.log(`📊 Reordered ${projectOrders.length} featured projects`);
      return true;
    } catch (error) {
      console.error('❌ Failed to reorder featured projects:', error);
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
    return pb.files.getURL(record, filename, thumb);
  },

  getOptimizedUrl(record, filename, options = {}) {
    if (!record || !filename) return '';
    
    const { 
      thumb = '', 
      isMobile = false,
      quality = 80 
    } = options;
    
    // Use smaller thumbnails on mobile
    const mobileThumb = isMobile ? '400x300' : thumb;
    
    try {
      return pb.files.getURL(record, filename, mobileThumb);
    } catch (error) {
      console.error('❌ Failed to generate optimized image URL:', error);
      return '';
    }
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
        filter: 'visible = true',
        sort: 'order,-featured,-created'  // Sort by order, then featured, then creation date
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

  async getPageData(page = 'home') {
    const cacheKey = `page-data-${page}`;
    
    // Check cache first
    const cached = PocketBaseCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      console.log(`🚀 Fetching fresh page data for: ${page}`);
      
      // Fetch all data in parallel instead of sequentially
      const [heroProjects, serviceProjects, showreelVideo] = await Promise.all([
        projects.getForHero(11),
        projects.getAll(1, 10, { filter: 'service_production = true && visible = true', sort: '+order,-created' }),
        pb.collection('main_showreel').getList(1, 1).catch(() => ({ items: [] }))
      ]);

      const pageData = {
        heroProjects: heroProjects.items || [],
        serviceProjects: serviceProjects.items || [],
        showreelVideo: showreelVideo.items?.[0] || null,
        timestamp: Date.now()
      };

      // Cache for 5 minutes
      PocketBaseCache.set(cacheKey, pageData);
      console.log(`🎯 Fetched combined page data for: ${page}`);
      
      return pageData;
    } catch (error) {
      console.error('❌ Failed to fetch page data:', error);
      return {
        heroProjects: [],
        serviceProjects: [],
        showreelVideo: null
      };
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