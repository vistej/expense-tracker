import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [visualizer({ open: true })],
    },
  },
  plugins: [react()],
});
