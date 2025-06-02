import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/m0d-workshop/', // <-- Add this line, use your repo name!
  plugins: [react()],
});