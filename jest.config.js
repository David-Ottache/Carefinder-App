module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/*.test.tsx"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
};
