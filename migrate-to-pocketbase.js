import PocketBase from 'pocketbase';
import portfolioData from './src/data/portfolio.json' assert { type: 'json' };

const pb = new PocketBase('http://127.0.0.1:8090'); // Your PocketBase URL

async function migratePortfolio() {
    try {
        // Authenticate admin user
        await pb.admins.authWithPassword('admin@example.com', 'password');

        // Migrate featured projects
        for (const project of portfolioData.featured) {
            const data = {
                title: project.title,
                slug: project.slug,
                shortDescription: project.shortDescription,
                fullDescription: project.fullDescription,
                category: project.category,
                year: parseInt(project.year),
                featured: true,
                videoId: project.videoId,
                services: project.services,
                techStack: project.techStack,
                results: project.results,
                testimonial: project.testimonial || null
            };

            await pb.collection('projects').create(data);
            console.log(`Migrated featured project: ${project.title}`);
        }

        // Migrate regular portfolio items
        for (const project of portfolioData.portfolio) {
            const data = {
                title: project.title,
                slug: project.slug,
                shortDescription: project.shortDescription,
                fullDescription: project.fullDescription,
                category: project.category,
                year: parseInt(project.year),
                featured: false,
                videoId: project.videoId,
                services: project.services,
                techStack: project.techStack,
                testimonial: project.testimonial || null
            };

            await pb.collection('projects').create(data);
            console.log(`Migrated project: ${project.title}`);
        }

    } catch (error) {
        console.error('Migration failed:', error);
    }
}

migratePortfolio(); 