// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Specify the base URL for your application
  base: 'http://localhost:1227/',
  
  // Configure the development server
  server: {
    port: 1227, // Specify the port number for the development server
    open: true, // Open the default browser when the server starts
    proxy: {
      // Configure proxy options for API requests
      '/api': {
        target: 'http://localhost:1227/', // Target URL for proxying API requests
        changeOrigin: true, // Change the origin of the request to match the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the request path
      },
    },
  },
  
  // Configure build options
  build: {
    outDir: 'public', // Specify the output directory for the build
    assetsDir: 'assets', // Specify the directory for assets
    manifest: true, // Generate a manifest file for assets
    minify: 'terser', // Minify JavaScript with Terser
    sourcemap: true, // Generate source maps for debugging
  },
  
  // Configure plugin options
  plugins: [
    // Configure plugins here
  ],
});