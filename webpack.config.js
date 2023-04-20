const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src'); 
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin"); 



module.exports = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './client/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: path.join(__dirname, './client/dist'),
    port: 3001,
    hot: true,
    open: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      }),
    ],
  }, 
  resolve: {
    fallback: { 
        "url": require.resolve("url/"), 
        "fs": false
     }
  }, 
  plugins: [
    new NodePolyfillPlugin()
    ]   
};
