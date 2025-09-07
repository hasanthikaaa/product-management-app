/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest", // tells Jest to use ts-jest
  testEnvironment: "node", // Node.js environment
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/test/**/*.test.ts"], // adjust according to your test folder
  transform: {
    "^.+\\.ts$": "ts-jest", // transform TS files
  },
  // Optional: if you want to include some node_modules for transformation
  transformIgnorePatterns: ["node_modules/(?!(some-esm-package)/)"],
};
