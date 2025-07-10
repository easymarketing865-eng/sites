import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import portfolioData from './src/data/portfolio.json' assert { type: 'json' };

// Load environment variables
dotenv.config();

// Configuration
const PB_URL = process.env.PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || 'password123';

const pb = new PocketBase(PB_URL);

// Collection schemas
const collections = {
  projects: {
    name: 'projects',
    type: 'base',
    schema: [
      {
        name: 'title',
        type: 'text',
        required: true,
        options: { min: 1, max: 200 }
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        unique: true,
        options: { min: 1, max: 100, pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' }
      },
      {
        name: 'year',
        type: 'text',
        required: true,
        options: { min: 4, max: 4, pattern: '^[0-9]{4}$' }
      },
      {
        name: 'featured',
        type: 'bool',
        required: false
      },
      {
        name: 'published',
        type: 'bool',
        required: false
      },
      {
        name: 'hero',
        type: 'url',
        required: false
      },
      {
        name: 'videoId',
        type: 'text',
        required: true,
        options: { min: 1, max: 50 }
      },
      {
        name: 'videoThumbnail',
        type: 'url',
        required: false
      },
      {
        name: 'description',
        type: 'editor',
        required: false
      },
      {
        name: 'shortDescription',
        type: 'text',
        required: false,
        options: { max: 300 }
      },
      {
        name: 'category',
        type: 'select',
        required: false,
        options: {
          maxSelect: 1,
          values: ['commercial', 'fashion', 'corporate', 'music_video', 'documentary', 'animation', 'real_estate', 'other']
        }
      },
      {
        name: 'services',
        type: 'select',
        required: false,
        options: {
          maxSelect: 10,
          values: ['video_production', 'cinematography', 'editing', 'color_grading', 'motion_graphics', '3d_animation', 'sound_design', 'music_composition', 'drone_filming', 'photography']
        }
      },
      {
        name: 'client',
        type: 'text',
        required: false,
        options: { max: 100 }
      },
      {
        name: 'duration',
        type: 'text',
        required: false,
        options: { max: 20 }
      },
      {
        name: 'sortOrder',
        type: 'number',
        required: false,
        options: { min: 0, noDecimal: true }
      },
      {
        name: 'gallery',
        type: 'file',
        required: false,
        options: {
          mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
          thumbs: ['100x100', '400x300', '800x600'],
          maxSelect: 20,
          maxSize: 5242880
        }
      },
      {
        name: 'seoTitle',
        type: 'text',
        required: false,
        options: { max: 60 }
      },
      {
        name: 'seoDescription',
        type: 'text',
        required: false,
        options: { max: 160 }
      }
    ],
    indexes: [
      'CREATE INDEX idx_projects_featured ON projects (featured)',
      'CREATE INDEX idx_projects_published ON projects (published)',
      'CREATE INDEX idx_projects_year ON projects (year)',
      'CREATE INDEX idx_projects_sort_order ON projects (sortOrder)'
    ],
    listRule: 'published = true || @request.auth.id != ""',
    viewRule: 'published = true || @request.auth.id != ""',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""'
  },
  
  team: {
    name: 'team',
    type: 'base',
    schema: [
      {
        name: 'name',
        type: 'text',
        required: true,
        options: { min: 1, max: 100 }
      },
      {
        name: 'role',
        type: 'text',
        required: true,
        options: { min: 1, max: 100 }
      },
      {
        name: 'bio',
        type: 'editor',
        required: false
      },
      {
        name: 'photo',
        type: 'file',
        required: false,
        options: {
          mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
          thumbs: ['100x100', '300x300'],
          maxSelect: 1,
          maxSize: 5242880
        }
      },
      {
        name: 'order',
        type: 'number',
        required: false,
        options: { min: 0, noDecimal: true }
      },
      {
        name: 'active',
        type: 'bool',
        required: false
      }
    ],
    indexes: [
      'CREATE INDEX idx_team_order ON team (order)',
      'CREATE INDEX idx_team_active ON team (active)'
    ],
    listRule: 'active = true || @request.auth.id != ""',
    viewRule: 'active = true || @request.auth.id != ""',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""'
  },
  
  settings: {
    name: 'settings',
    type: 'base',
    schema: [
      {
        name: 'key',
        type: 'text',
        required: true,
        unique: true,
        options: { min: 1, max: 100 }
      },
      {
        name: 'value',
        type: 'json',
        required: false,
        options: { maxSize: 1000000 }
      },
      {
        name: 'description',
        type: 'text',
        required: false,
        options: { max: 500 }
      }
    ],
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""'
  }
};

// Default team data
const defaultTeam = [
  {
    name: 'Timur Vagizov',
    role: 'Creative Director',
    bio: '<p>Creative visionary with over 5 years of experience in video production and storytelling.</p>',
    order: 1,
    active: true
  },
  {
    name: 'Alina Saiitova',
    role: 'Producer',
    bio: '<p>Project management expert ensuring smooth production workflows.</p>',
    order: 2,
    active: true
  },
  {
    name: 'Arsenii Morozov',
    role: 'Director of Photography',
    bio: '<p>Master of cinematography with an eye for compelling visual narratives.</p>',
    order: 3,
    active: true
  }
];

// Default settings
const defaultSettings = [
  {
    key: 'site_title',
    value: 'Easy Production - Video Production Studio',
    description: 'Main site title'
  },
  {
    key: 'site_description',
    value: 'Professional video production services in Kyrgyzstan. We create stunning commercials, corporate videos, and creative content.',
    description: 'Site meta description'
  },
  {
    key: 'contact_email',
    value: 'hello@easyproduction.kg',
    description: 'Main contact email'
  },
  {
    key: 'contact_phone',
    value: '+996 XXX XXX XXX',
    description: 'Contact phone number'
  },
  {
    key: 'social_instagram',
    value: 'https://instagram.com/easyproduction',
    description: 'Instagram URL'
  },
  {
    key: 'social_youtube',
    value: 'https://youtube.com/@easyproduction',
    description: 'YouTube URL'
  },
  {
    key: 'hero_enabled',
    value: true,
    description: 'Enable hero section'
  },
  {
    key: 'maintenance_mode',
    value: false,
    description: 'Enable maintenance mode'
  }
];

async function setupPocketBase() {
  try {
    console.log('🚀 Starting PocketBase setup...');
    console.log(`🔌 Connecting to: ${PB_URL}`);

    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Admin authentication successful');

    // Create collections
    console.log('\n📁 Creating collections...');
    for (const [collectionKey, collectionData] of Object.entries(collections)) {
      try {
        await pb.collections.create(collectionData);
        console.log(`✅ Created collection: ${collectionData.name}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚡ Collection already exists: ${collectionData.name}`);
        } else {
          console.error(`❌ Failed to create collection ${collectionData.name}:`, error.message);
        }
      }
    }

    // Migrate project data
    console.log('\n📊 Migrating project data...');
    let projectCount = 0;
    
    // Migrate featured projects
    for (const project of portfolioData.featured) {
      try {
        const data = {
          title: project.title,
          slug: project.slug,
          year: project.year,
          featured: true,
          published: true,
          hero: project.hero,
          videoId: project.videoId,
          category: 'commercial', // Default category
          sortOrder: projectCount,
          shortDescription: `Featured project: ${project.title}`,
          seoTitle: project.title,
          seoDescription: `Watch ${project.title} - Professional video production by Easy Production`
        };
        
        await pb.collection('projects').create(data);
        console.log(`✅ Migrated featured project: ${project.title}`);
        projectCount++;
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚡ Project already exists: ${project.title}`);
        } else {
          console.error(`❌ Failed to migrate featured project ${project.title}:`, error.message);
        }
      }
    }

    // Migrate regular portfolio projects
    for (const project of portfolioData.portfolio) {
      try {
        const data = {
          title: project.title,
          slug: project.slug,
          year: project.year,
          featured: false,
          published: true,
          hero: project.hero,
          videoId: project.videoId,
          category: 'commercial', // Default category
          sortOrder: projectCount,
          shortDescription: `Portfolio project: ${project.title}`,
          seoTitle: project.title,
          seoDescription: `Watch ${project.title} - Professional video production by Easy Production`
        };
        
        await pb.collection('projects').create(data);
        console.log(`✅ Migrated portfolio project: ${project.title}`);
        projectCount++;
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚡ Project already exists: ${project.title}`);
        } else {
          console.error(`❌ Failed to migrate portfolio project ${project.title}:`, error.message);
        }
      }
    }

    // Create default team members
    console.log('\n👥 Creating default team members...');
    for (const member of defaultTeam) {
      try {
        await pb.collection('team').create(member);
        console.log(`✅ Created team member: ${member.name}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚡ Team member already exists: ${member.name}`);
        } else {
          console.error(`❌ Failed to create team member ${member.name}:`, error.message);
        }
      }
    }

    // Create default settings
    console.log('\n⚙️ Creating default settings...');
    for (const setting of defaultSettings) {
      try {
        await pb.collection('settings').create(setting);
        console.log(`✅ Created setting: ${setting.key}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚡ Setting already exists: ${setting.key}`);
        } else {
          console.error(`❌ Failed to create setting ${setting.key}:`, error.message);
        }
      }
    }

    console.log('\n🎉 PocketBase setup completed successfully!');
    console.log(`📊 Migrated ${projectCount} projects`);
    console.log(`👥 Created ${defaultTeam.length} team members`);
    console.log(`⚙️ Created ${defaultSettings.length} settings`);
    console.log('\n🌐 Admin Panel: http://127.0.0.1:8090/_/');
    console.log(`📧 Admin Email: ${ADMIN_EMAIL}`);
    console.log(`🔒 Admin Password: ${ADMIN_PASSWORD}`);

  } catch (error) {
    console.error('💥 Setup failed:', error);
    console.error('🔍 Error details:', error.message);
    process.exit(1);
  }
}

// Run setup
setupPocketBase(); 