import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    react(),
    // Note: Tailwind is usually used via PostCSS and doesn't need to be here.
    // If you're using Tailwind through PostCSS config, you can remove this line.
  ],
  base: process.env.VITE_BASE_PATH || "/student-deploy",
});
