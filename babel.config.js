// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-env',        // For transforming modern JS (ES modules, etc.)
    '@babel/preset-react',      // For React JSX support
    '@babel/preset-typescript', // For TypeScript support
  ],
  plugins: [
    // Any additional Babel plugins can go here
  ],
};
