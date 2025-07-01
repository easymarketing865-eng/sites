import { pb, projects } from './src/lib/pocketbase.js';
import portfolioData from './src/data/portfolio.json' assert { type: 'json' };

async function migrateToPocketBase() {
    try {
        console.log('🚀 Starting migration to PocketBase...');
        
        // Note: You'll need to manually create the admin user in PocketBase first
        // and update these credentials
        const ADMIN_EMAIL = 'admin@example.com';
        const ADMIN_PASSWORD = 'your-admin-password';
        
        console.log('🔐 Authenticating with PocketBase...');
        try {
            await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
            console.log('✅ Authentication successful');
        } catch (error) {
            console.log('⚠️  Admin authentication failed. Make sure PocketBase is running and admin user exists.');
            console.log('You can create an admin user by visiting: http://127.0.0.1:8090/_/');
            return;
        }

        // Migrate featured projects
        console.log('📁 Migrating featured projects...');
        for (const project of portfolioData.featured) {
            try {
                const data = {
                    id: project.id,
                    title: project.title,
                    slug: project.slug,
                    year: project.year,
                    featured: true,
                    hero: project.hero,
                    image: null, // Will be populated later when uploading to PocketBase
                    videoId: project.videoId
                };

                await projects.create(data);
                console.log(`✅ Featured: ${project.title}`);
            } catch (error) {
                if (error.message.includes('already exists')) {
                    console.log(`⚠️  Featured project already exists: ${project.title}`);
                } else {
                    console.error(`❌ Failed to create featured project ${project.title}:`, error.message);
                }
            }
        }

        // Migrate regular portfolio items
        console.log('📁 Migrating regular portfolio items...');
        for (const project of portfolioData.portfolio) {
            try {
                const data = {
                    id: project.id,
                    title: project.title,
                    slug: project.slug,
                    year: project.year,
                    featured: false,
                    hero: project.hero,
                    image: null, // Will be populated later when uploading to PocketBase
                    videoId: project.videoId
                };

                await projects.create(data);
                console.log(`✅ Regular: ${project.title}`);
            } catch (error) {
                if (error.message.includes('already exists')) {
                    console.log(`⚠️  Regular project already exists: ${project.title}`);
                } else {
                    console.error(`❌ Failed to create regular project ${project.title}:`, error.message);
                }
            }
        }

        console.log('🎉 Migration completed successfully!');
        console.log(`📊 Migrated ${portfolioData.featured.length} featured projects`);
        console.log(`📊 Migrated ${portfolioData.portfolio.length} regular projects`);
        
    } catch (error) {
        console.error('💥 Migration failed:', error);
    }
}

// Run migration
migrateToPocketBase(); 