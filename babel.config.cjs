module.exports = {
  presets: [
    '@babel/preset-env', // For compiling modern JavaScript to compatible versions
    ['@babel/preset-react', { runtime: 'automatic' }], // For React with JSX transform
    '@babel/preset-typescript', // For TypeScript support
  ],
  // You can add other configurations as needed
};