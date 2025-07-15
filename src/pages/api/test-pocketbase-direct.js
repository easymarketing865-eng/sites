import PocketBase from 'pocketbase';

export async function GET() {
  try {
    // Test with both possible URLs
    const envUrl = import.meta.env.PUBLIC_POCKETBASE_URL;
    const httpsUrl = envUrl.startsWith('http') ? envUrl : `https://${envUrl}`;
    
    console.log(`Testing direct PocketBase connection to: ${httpsUrl}`);
    
    const pb = new PocketBase(httpsUrl);
    
    // Test 1: Basic connection by trying to list collections
    let collectionsTest = 'Not tested';
    try {
      // This doesn't require auth for basic info
      const collections = await pb.collections.getFullList();
      collectionsTest = `Found ${collections.length} collections`;
    } catch (e) {
      collectionsTest = `Collections error: ${e.message}`;
    }
    
    // Test 2: Try to fetch projects without auth
    let projectsTest = 'Not tested';
    let projectCount = 0;
    try {
      const result = await pb.collection('projects').getList(1, 10);
      projectCount = result.items.length;
      projectsTest = `Success: Found ${projectCount} projects`;
    } catch (e) {
      projectsTest = `Projects error: ${e.message}`;
    }
    
    // Test 3: Check if authentication is required
    let authTest = 'Not tested';
    try {
      const adminEmail = import.meta.env.POCKETBASE_ADMIN_EMAIL || 'admin@example.com';
      const adminPassword = import.meta.env.POCKETBASE_ADMIN_PASSWORD || 'password123';
      
      await pb.admins.authWithPassword(adminEmail, adminPassword);
      authTest = 'Admin auth successful';
      
      // Try fetching projects with auth
      const authResult = await pb.collection('projects').getList(1, 10);
      projectsTest += ` | With auth: ${authResult.items.length} projects`;
    } catch (e) {
      authTest = `Auth error: ${e.message}`;
    }
    
    return new Response(JSON.stringify({
      success: true,
      originalUrl: envUrl,
      testUrl: httpsUrl,
      collectionsTest,
      projectsTest,
      authTest,
      projectCount,
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
      envUrl: import.meta.env.PUBLIC_POCKETBASE_URL,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 