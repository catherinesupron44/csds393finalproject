module.exports = {
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest', // Transforms JavaScript, TypeScript, and JSX files
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
      'node_modules/(?!(lucide-react)/)', // Add any dependencies using ES Modules here
    ],
    moduleNameMapper: {
      '\\.jsx$': 'babel-jest', // Add support for .jsx files
    }
  };