// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Load environment variables using Node.js built-in
import { readFileSync } from 'fs';
import { join } from 'path';

// Read .env file manually
let envVars = {};
try {
  const envContent = readFileSync(join(process.cwd(), '.env'), 'utf8');
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
} catch (e) {
  console.log('No .env file found, using defaults');
}

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 4321,
    host: true
  },
  // Internationalization configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  // Make environment variables available to the client
  define: {
    'import.meta.env.PUBLIC_POCKETBASE_URL': JSON.stringify(
      envVars.PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090'
    )
  }
});
