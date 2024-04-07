const path = require('path');

module.exports = {
  mode: 'development', // Use 'production' for production builds
  entry: './src/index.jsx', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'out.js', // Name of the bundled file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Target .js and .jsx files
        exclude: /node_modules/, // Exclude the node_modules directory
        use: {
          loader: 'babel-loader', // Use babel-loader
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Use the env and react presets
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
