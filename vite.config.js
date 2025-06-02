import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/m0d-workshop/', // <-- This must match your repo name!
  plugins: [react()],
});