import { resolve } from 'path';

export default {
  base: '/Aromatic-Avenues/',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist'
  },
  server: {
    port: 8080
  }
};
