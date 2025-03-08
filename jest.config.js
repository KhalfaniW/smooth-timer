export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx)?$": ["babel-jest", { presets: ["@babel/preset-react"] }],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["<rootDir>/tests/.*\\.(spec)\\.(js|jsx|ts|tsx)?$"],
  testMatch: [
    "<rootDir>/jest-tests/**/*.test.jsx",
    "<rootDir>/jest-tests/**/*.test.js",
  ],
  testPathIgnorePatterns: ["<rootDir>/tests/.*\\.spec\\.js$"],
  modulePathIgnorePatterns: ["<rootDir>/tests/tests/"],
};
