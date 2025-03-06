export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.jsx?$": ["babel-jest", { presets: ["@babel/preset-react"] }],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["<rootDir>/tests/.*\\.(spec)\\.(js|jsx|ts|tsx)?$"],
};
