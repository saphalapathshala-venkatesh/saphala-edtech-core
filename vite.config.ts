// File: vite.config.js (MUST BE IN ROOT FOLDER)

import { defineConfig } from 'vite';

export default defineConfig({
  // Base directory for serving files
  root: './', 
  // Directory where the index.html file is located
  publicDir: 'public', 
  
  build: {
    // Defines the entry point for the build process (important for production)
    rollupOptions: {
      input: 'index.html', // Assumes index.html is in the root or specified publicDir
    },
  },
});