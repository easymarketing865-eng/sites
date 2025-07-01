import { pb } from './src/lib/pocketbase.js';

async function setupPocketBase() {
    try {
        console.log('🚀 Setting up PocketBase for development...');
        
        // Check if PocketBase is running
        try {
            await pb.health.check();
            console.log('✅ PocketBase is running');
        } catch (error) {
            console.log('❌ PocketBase is not running or not accessible');
            console.log('Please start PocketBase first:');
            console.log('1. Download PocketBase from https://pocketbase.io/docs/');
            console.log('2. Run: ./pocketbase serve');
            console.log('3. Visit http://127.0.0.1:8090/_/ to create an admin user');
            return;
        }

        // Collection schema for projects
        const projectsSchema = {
            name: 'projects',
            type: 'base',
            schema: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    options: {
                        min: 1,
                        max: 200
                    }
                },
                {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    unique: true,
                    options: {
                        min: 1,
                        max: 100,
                        pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
                    }
                },
                {
                    name: 'year',
                    type: 'text',
                    required: true,
                    options: {
                        min: 4,
                        max: 4,
                        pattern: '^[0-9]{4}$'
                    }
                },
                {
                    name: 'featured',
                    type: 'bool',
                    required: false,
                    options: {
                        default: false
                    }
                },
                {
                    name: 'hero',
                    type: 'url',
                    required: true
                },
                {
                    name: 'image',
                    type: 'file',
                    required: false,
                    options: {
                        maxSelect: 1,
                        maxSize: 5242880,
                        mimeTypes: [
                            'image/jpeg',
                            'image/png',
                            'image/svg+xml',
                            'image/gif',
                            'image/webp'
                        ]
                    }
                },
                {
                    name: 'videoId',
                    type: 'text',
                    required: true,
                    options: {
                        min: 1,
                        max: 50
                    }
                }
            ],
            indexes: [
                'CREATE INDEX idx_projects_featured ON projects (featured)',
                'CREATE INDEX idx_projects_year ON projects (year)',
                'CREATE UNIQUE INDEX idx_projects_slug ON projects (slug)'
            ]
        };

        console.log('📝 Collection schema ready:');
        console.log('- Projects collection with simplified fields');
        console.log('- Unique slug validation');
        console.log('- Year format validation (YYYY)');
        console.log('- Image upload support');
        console.log('- Featured project filtering');
        
        console.log('\n📋 Next steps:');
        console.log('1. Visit http://127.0.0.1:8090/_/ to access PocketBase admin');
        console.log('2. Create the "projects" collection with the schema above');
        console.log('3. Update admin credentials in migrate-to-pocketbase.js');
        console.log('4. Run: node migrate-to-pocketbase.js');
        
        console.log('\n🔧 Environment setup:');
        console.log('- Development: http://127.0.0.1:8090');
        console.log('- Production: Set POCKETBASE_URL environment variable');
        
        console.log('\n✅ Setup information displayed!');
        
    } catch (error) {
        console.error('💥 Setup failed:', error);
    }
}

// Show setup information
setupPocketBase(); 