import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 20000,
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
  e2e: {
    supportFile: 'cypress/support/e2e.ts',
    testIsolation: false,
  },
});
