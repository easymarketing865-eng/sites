# PocketBase Content Management Setup Guide

## Overview

This guide will help you set up PocketBase as your content backend for the Easy Production website. PocketBase provides a complete content management system with admin interface, API, and real-time subscriptions.

## 🚀 Quick Start

### 1. Install PocketBase

**Option A: Use existing binary**
```bash
# Already included in project
./pocketbase.exe serve
```

**Option B: Download latest**
```bash
# Download from https://pocketbase.io/docs/
# Extract and run:
./pocketbase serve
```

### 2. Environment Configuration

Create `.env` file in project root:
```env
# Development
PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090

# Admin credentials (for setup only)
POCKETBASE_ADMIN_EMAIL=admin@example.com
POCKETBASE_ADMIN_PASSWORD=password123

# Production (update with your URLs)
# PUBLIC_POCKETBASE_URL=https://your-pocketbase-instance.com
```

### 3. Run Setup Script

```bash
# Install dependencies if needed
npm install

# Run the comprehensive setup
node setup-pocketbase.js
```

This will:
- Create all collections (projects, team, settings)
- Migrate your existing portfolio data
- Set up default team members
- Configure site settings

## 📊 Collections Schema

### Projects Collection
- **title** (text) - Project name
- **slug** (text, unique) - URL-friendly identifier
- **year** (text) - Project year (YYYY format)
- **featured** (bool) - Show in featured section
- **published** (bool) - Visible to public
- **hero** (url) - Hero image URL
- **videoId** (text) - YouTube video ID
- **videoThumbnail** (url) - Video thumbnail for hero
- **description** (editor) - Rich text description
- **shortDescription** (text) - Brief summary
- **category** (select) - Project category
- **services** (select, multiple) - Services provided
- **client** (text) - Client name
- **duration** (text) - Video duration
- **sortOrder** (number) - Display order
- **gallery** (file, multiple) - Additional images
- **seoTitle** (text) - SEO title
- **seoDescription** (text) - SEO description

### Team Collection
- **name** (text) - Team member name
- **role** (text) - Job title
- **bio** (editor) - Biography
- **photo** (file) - Profile photo
- **order** (number) - Display order
- **active** (bool) - Show/hide member

### Settings Collection
- **key** (text, unique) - Setting identifier
- **value** (json) - Setting value
- **description** (text) - Setting description

## 🛠️ Content Management

### Access Admin Panel
1. Start PocketBase: `./pocketbase serve`
2. Open: http://127.0.0.1:8090/_/
3. Login with your admin credentials

### Managing Projects
1. Go to **Collections** → **projects**
2. Add new projects or edit existing ones
3. Upload video thumbnails for hero section
4. Set `published: true` to make visible
5. Adjust `sortOrder` for display order

### Managing Team
1. Go to **Collections** → **team**
2. Upload team member photos
3. Write bios with rich text editor
4. Set `active: true` to show member
5. Use `order` field to arrange display

### Site Settings
1. Go to **Collections** → **settings**
2. Update values like:
   - `site_title`
   - `contact_email`
   - `social_instagram`
   - `social_youtube`

## 🌐 Production Deployment

### Option 1: Railway
1. Fork this repository
2. Connect to Railway
3. Add environment variables:
   ```
   PUBLIC_POCKETBASE_URL=https://your-app.railway.app
   ```
4. Deploy using `pocketbase-railway.dockerfile`

### Option 2: VPS/Server
1. Upload PocketBase binary to server
2. Run: `./pocketbase serve --http=0.0.0.0:8090`
3. Set up reverse proxy (nginx/Apache)
4. Configure SSL certificate
5. Update environment variables

### Option 3: Fly.io
1. Install flyctl
2. Create `fly.toml`:
   ```toml
   app = "your-pocketbase-app"
   
   [build]
   dockerfile = "pocketbase-railway.dockerfile"
   
   [[services]]
   http_checks = []
   internal_port = 8090
   processes = ["app"]
   protocol = "tcp"
   script_checks = []
   ```
3. Deploy: `fly deploy`

## 🔧 Development Workflow

### Adding New Content Types

1. **Update Schema** in `pocketbase-collection-schema.json`
2. **Add Helper Functions** in `src/lib/pocketbase.js`:
   ```javascript
   export const newCollection = {
     async getAll() {
       return await pb.collection('new_collection').getFullList();
     }
   };
   ```
3. **Update Components** to use new helpers
4. **Run Migration** to update database

### Backup & Migration

```bash
# Backup data
./pocketbase export backup.zip

# Restore data
./pocketbase import backup.zip
```

## 📈 Performance Optimization

### Image Optimization
- Use WebP format for images
- Set appropriate thumbnail sizes in schema
- Enable CDN for file serving

### Caching
- Enable PocketBase file caching
- Use Astro's static site generation
- Cache API responses in production

### Security
- Use environment variables for sensitive data
- Enable CORS for production domains
- Set up proper access rules in collections

## 🔍 API Usage Examples

### Fetch Projects
```javascript
import { projects } from './src/lib/pocketbase.js';

// Get all published projects
const allProjects = await projects.getAll();

// Get featured projects
const featured = await projects.getFeatured();

// Get by category
const commercials = await projects.getByCategory('commercial');
```

### Fetch Team
```javascript
import { team } from './src/lib/pocketbase.js';

// Get active team members
const teamMembers = await team.getAll();
```

### Site Settings
```javascript
import { settings } from './src/lib/pocketbase.js';

// Get specific setting
const siteTitle = await settings.get('site_title');

// Update setting
await settings.set('contact_email', 'new@email.com');
```

## 🎯 Next Steps

1. **Content Migration**: Run `node setup-pocketbase.js`
2. **Admin Setup**: Access admin panel and configure
3. **Video Thumbnails**: Upload video files for hero section
4. **Production Deploy**: Choose deployment option
5. **Domain Setup**: Configure custom domain
6. **SSL Certificate**: Enable HTTPS
7. **Monitoring**: Set up uptime monitoring

## 📞 Support

- **PocketBase Docs**: https://pocketbase.io/docs/
- **GitHub Issues**: Create issue in repository
- **Community**: PocketBase Discord/GitHub discussions

## 🔄 Migration from JSON

The setup script automatically migrates your existing `portfolio.json` data. Your existing data structure is preserved while adding new CMS capabilities.

After migration:
- ✅ All projects transferred
- ✅ Featured flags preserved  
- ✅ SEO fields added
- ✅ Admin interface available
- ✅ API endpoints ready
- ✅ Team management enabled

Your website will continue working with JSON fallback if PocketBase is unavailable, ensuring reliability. 