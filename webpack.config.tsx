const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/, // Add .mjs here
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Assuming you're using Babel
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/, // For CSS files
        use: ['style-loader', 'css-loader'],
      },
      // Add other loaders as needed
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs', '.json','mjs'], // Resolve .mjs files
    alias: {
      '@': path.resolve(__dirname, 'src'), // Example alias for your src directory
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000, // Port for the dev server
  },
};
