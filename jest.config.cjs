module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest', '^.+\\.[t|j]sx?$': 'babel-jest', //handle TypeScript
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transformIgnorePatterns: [
        '/node_modules/(?!your-module-name-to-transform|another-module).+\\.js$', // If needed for specific node_modules
      ],
    };
  
  