import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    https: process.env.VITE_HTTPS === 'true' ? {
      key: fs.readFileSync(process.env.VITE_SSL_KEY_FILE || '', 'utf-8'),
      cert: fs.readFileSync(process.env.VITE_SSL_CRT_FILE || '', 'utf-8'),
    } : undefined, // Changed to undefined instead of false
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
});
