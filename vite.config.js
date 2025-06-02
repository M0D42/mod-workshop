import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/mod-workshop/', // <-- Add this line, use your repo name!
  plugins: [react()],
});