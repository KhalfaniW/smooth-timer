const { defineConfig } = require("@playwright/test");

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: "./tests",
  testMatch: ["*.spec.js"],
};

module.exports = defineConfig(config);
