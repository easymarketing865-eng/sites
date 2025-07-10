import PocketBase from 'pocketbase';
import portfolioData from './src/data/portfolio.json' assert { type: 'json' };

const pb = new PocketBase('http://127.0.0.1:8090');

async function migrateSimplified() {
    try {
        await pb.admins.authWithPassword('admin@example.com', 'password');

        // Migrate featured projects
        for (const project of portfolioData.featured) {
            const data = {
                id: project.id,
                title: project.title,
                slug: project.slug,
                year: project.year,
                featured: true,
                hero: project.hero,
                videoId: project.videoId,
                // Add video thumbnail field (optional)
                videoThumbnail: null // Will be populated later with video file paths
            };

            await pb.collection('projects').create(data);
            console.log(`✅ Featured: ${project.title}`);
        }

        // Migrate regular portfolio items
        for (const project of portfolioData.portfolio) {
            const data = {
                id: project.id,
                title: project.title,
                slug: project.slug,
                year: project.year,
                featured: false,
                hero: project.hero,
                videoId: project.videoId,
                // Add video thumbnail field (optional)
                videoThumbnail: null // Will be populated later with video file paths
            };

            await pb.collection('projects').create(data);
            console.log(`✅ Regular: ${project.title}`);
        }

        console.log('🎉 Migration completed!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
    }
}

migrateSimplified(); 