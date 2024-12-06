module.exports = {
  preset: 'ts-jest',  // Use ts-jest preset for TypeScript support
  testEnvironment: 'jsdom',  // Use jsdom for React tests (instead of node)
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Transform TypeScript files using ts-jest
    '^.+\\.[t|j]sx?$': 'babel-jest',  // Transform JS and JSX files using babel-jest
    '^.+\\.js$': 'babel-jest',  // Transform JavaScript files using babel-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],  // Handle TS, TSX, JS, JSX files
  transformIgnorePatterns: [
    '/node_modules/(?!your-module-name-to-transform|another-module).+\\.js$',  // Ensure specific modules are transformed
  ],
  moduleNameMapper: {
    "^import-meta$": "<rootDir>/__mocks__/import-meta.js",  // Mock import.meta if necessary
  },
};
