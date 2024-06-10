module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest', 
    },
    transformIgnorePatterns: [
      'node_modules/(?!some-es-module)', 
    ],
};
