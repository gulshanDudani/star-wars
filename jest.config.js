// jest.config.js
module.exports = {
    preset: 'ts-jest', // Use ts-jest preset to handle TypeScript files
    transform: {
      '^.+\\.(ts|tsx|js|jsx|mjs)$': 'babel-jest', // Use babel-jest to transform TypeScript, JavaScript, and ESM (.mjs)
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios|@tanstack|other-esm-modules)/', // Make sure axios and other ESM modules are transformed by Babel
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mjs'], // Include .mjs for ESM support
    testEnvironment: 'jsdom',  // Make sure we use jsdom if testing React
    globals: {
      'ts-jest': {
        isolatedModules: true, // This is important for faster TypeScript transformation
      },
    },
  };
  