module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest', //handle TypeScript
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  };
  