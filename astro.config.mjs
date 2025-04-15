// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node'

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  image: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.shopify.com',
    }]
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [solidJs()]
});