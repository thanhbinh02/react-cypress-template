import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 30000,
  viewportWidth: 1440,
  viewportHeight: 1200,
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
  e2e: {
    projectId: 'bzew3n',
    supportFile: 'cypress/support/e2e.ts',
    testIsolation: false,
    specPattern: 'cypress/e2e/pages/**/*.cy.ts',
  },
});
