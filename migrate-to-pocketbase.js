import PocketBase from 'pocketbase';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Read the portfolio data from the JSON file
const portfolioData = JSON.parse(fs.readFileSync('src/data/portfolio.json', 'utf8'));

const pb = new PocketBase(process.env.PUBLIC_POCKETBASE_URL);

async function migrateToPocketBase() {
    try {
        console.log(`🔌 Connecting to PocketBase at: ${process.env.PUBLIC_POCKETBASE_URL}`);
        console.log('🚀 Starting migration to PocketBase...');
        
        // Authenticate with PocketBase
        console.log('🔐 Authenticating with PocketBase...');
        await pb.admins.authWithPassword(
            process.env.POCKETBASE_ADMIN_EMAIL || 'admin@example.com',
            process.env.POCKETBASE_ADMIN_PASSWORD || '1234567890'
        );
        console.log('✅ Authentication successful');

        // Migrate featured projects
        console.log('📁 Migrating featured projects...');
        let featuredCount = 0;
        for (const project of portfolioData.featured) {
            try {
                const data = {
                    title: project.title,
                    slug: project.slug,
                    year: project.year,
                    featured: true,
                    hero: project.hero,
                    videoId: project.videoId
                };
                
                // Debug: Log the data being sent
                console.log('🔍 Debug - Data being sent:', JSON.stringify(data, null, 2));
                
                await pb.collection('projects').create(data);
                console.log(`✅ Created featured project: ${project.title}`);
                featuredCount++;
            } catch (error) {
                console.error(`❌ Failed to create featured project ${project.title}:`, error.message);
                console.error('🔍 Debug - Error details:', error);
            }
        }

        // Migrate regular portfolio items  
        console.log('📁 Migrating regular portfolio items...');
        let regularCount = 0;
        for (const project of portfolioData.portfolio) {
            try {
                const data = {
                    title: project.title,
                    slug: project.slug,
                    year: project.year,
                    featured: false,
                    hero: project.hero,
                    videoId: project.videoId
                };
                
                // Debug: Log the data being sent
                console.log('🔍 Debug - Data being sent:', JSON.stringify(data, null, 2));
                
                await pb.collection('projects').create(data);
                console.log(`✅ Created regular project: ${project.title}`);
                regularCount++;
            } catch (error) {
                console.error(`❌ Failed to create regular project ${project.title}:`, error.message);
                console.error('🔍 Debug - Error details:', error);
            }
        }

        console.log('🎉 Migration completed successfully!');
        console.log(`📊 Migrated ${featuredCount} featured projects`);
        console.log(`📊 Migrated ${regularCount} regular projects`);

    } catch (error) {
        console.error('💥 Migration failed:', error);
        console.error('🔍 Debug - Auth error details:', error);
    }
}

migrateToPocketBase(); 