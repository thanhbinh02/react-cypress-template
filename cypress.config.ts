import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  e2e: {
    supportFile: "cypress/support/e2e.ts",
    testIsolation: false,
  },
});
