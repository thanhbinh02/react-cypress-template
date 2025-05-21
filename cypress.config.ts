import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 30000,
  viewportWidth: 1440,
  viewportHeight: 1200,
  video: true,
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/results',
    charts: true,
    reportPageTitle: 'Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
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
    setupNodeEvents: async (on, config) => {
      const { default: plugin } = await import(
        'cypress-mochawesome-reporter/plugin'
      );
      plugin(on);
      return config;
    },
  },
});
