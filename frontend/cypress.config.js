// // const { defineConfig } = require('cypress');
// // const codeCoverageTask = require('@cypress/code-coverage/task');

// // module.exports = defineConfig({
// //   component: {
// //     devServer: {
// //       framework: 'create-react-app',
// //       bundler: 'webpack',
// //     },
// //   },
// //   e2e: {
// //     setupNodeEvents(on, config) {
// //       // Integrate the code coverage task
// //       codeCoverageTask(on, config);
// //       on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));
// //       // You can add additional event listeners or tasks here

// //       // Make sure to return the updated config object
// //       return config;
// //     },
// //     // Include other e2e testing configuration options as needed
// //     // For example, to specify the base URL of your application:
// //     baseUrl: 'http://localhost:3000',
// //     env: {
// //       coverageFolder: 'coverage',
// //       nyc: {
// //         'report-dir': './coverage',
// //         reporter: ['text-summary', 'html'],
// //       },
// //     },
// //   },
// //   // You can set global configuration options here
// //   // For example, to change the default test files location:
// //   // testFiles: '**/*.spec.js',
// // });
// const codeCoverageTask = require("@cypress/code-coverage/task");

// module.exports = {
//   pluginsFile: "./node_modules/@cypress/code-coverage/support",
//   supportFile: "./node_modules/@cypress/code-coverage/support",

//   env: {
//     coverageFolder: "coverage",
//     nyc: {
//       reportDir: "./coverage",
//       reporter: ["text-summary", "html"],
//     },
//   },

//   experimentalComponentTesting: true,
//   experimentalFetchPolyfill: true,
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//   testEnvironment: "./cypress/support/EnzymeEnvironment.js",
//   setupFiles: ["./cypress/support/cypressGlobal.js"],
//   watchPlugins: ["cypress-watch-and-reload/plugins"],

//   on: {
//     beforeBrowserLaunch(browser = {}, launchOptions) {
//       console.log("browser", browser, "launchOptions", launchOptions);
//       codeCoverageTask(browser, launchOptions);
//       return launchOptions;
//     },
//   },

//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// };
const { defineConfig } = require('cypress');
const codeCoverageTask = require('@cypress/code-coverage/task');

module.exports = defineConfig({
  env: {
    coverageFolder: 'coverage',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // Integrate the code coverage task
      codeCoverageTask(on, config);
      // You can add additional event listeners or tasks here
      // Ensure you've configured the preprocessor kkkcorrectly for code coverage
      // require('@cypress/code-coverage/use-browserify-istanbul')(on, config);
      // Make sure to return the updated config object
      return config;
    },
    // Adjust specPattern according to where your test files are located
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  // If you're using component testing, configure it separately here
  component: {
    // Configuration for component testing
  },
});
