const { defineConfig } = require('cypress');
const codeCoverageTask = require('@cypress/code-coverage/task');

module.exports = defineConfig({
  env: {
    coverageFolder: 'coverage',
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
