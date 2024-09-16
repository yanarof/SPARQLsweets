import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import serverUrl from './src/config.js';


const subParts = serverUrl.replace(/https?:\/\//, '').split('/').slice(1).join('/');


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  base: `/${subParts}/`,

})


