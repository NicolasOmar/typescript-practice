const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production', // TO RUN IN DEV MODE, PARSING CODE FOR DEBUGGING
  entry: './src/app.ts', // BUNDLE THE CODE FROM HERE
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // CONSTRUCT AN ABSOLUTE PATH
  },
  devtool: 'hidden-source-map',
  module: { // HOW TS HAS TO WORK WITH THE FINDED FILES
    rules: [
      {
        test: /\.ts$/, // GRAB ALL .TS FILES
        use: 'ts-loader', // HANDLE THEM WITH TS-LOADER LIBRARY
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin()
  ]
}