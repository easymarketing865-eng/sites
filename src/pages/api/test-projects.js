import { projects, pb } from '../../lib/pocketbase.js';

export async function GET() {
  try {
    const pbUrl = import.meta.env.PUBLIC_POCKETBASE_URL;
    
    // Test basic connection
    console.log(`Testing PocketBase connection to: ${pbUrl}`);
    
    // Try to fetch projects
    const result = await projects.getAll(1, 5);
    const projectsData = result.items || [];
    
    // Try to fetch featured projects specifically
    const featuredResult = await projects.getFeatured(3);
    const featuredData = featuredResult.items || [];
    
    return new Response(JSON.stringify({
      success: true,
      pocketbaseUrl: pbUrl,
      totalProjects: projectsData.length,
      totalFeatured: featuredData.length,
      sampleProject: projectsData[0] || null,
      timestamp: new Date().toISOString(),
      environment: import.meta.env.MODE
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack,
      pocketbaseUrl: import.meta.env.PUBLIC_POCKETBASE_URL,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 