export async function GET() {
  try {
    const pbUrl = import.meta.env.PUBLIC_POCKETBASE_URL;
    
    return new Response(JSON.stringify({
      success: true,
      pocketbaseUrl: pbUrl,
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
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 