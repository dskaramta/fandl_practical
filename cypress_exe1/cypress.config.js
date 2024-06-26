const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.founderandlightning.com',
    pageLoadTimeout: 90000,
    testIsolation: false,
  },
});
