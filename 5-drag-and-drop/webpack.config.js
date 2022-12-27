const path = require('path')

module.exports = {
  mode: 'development', // TO RUN IN DEV MODE, PARSING CODE FOR DEBUGGING
  entry: './src/app.ts', // BUNDLE THE CODE FROM HERE
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // CONSTRUCT AN ABSOLUTE PATH
    publicPath: 'dist' // FOR DEV SERVER, USED TO FIX BROKEN SRC FILE WHEN YOU RUN IN DEVELOPMENT LEVEL
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '/')
    }
  },
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
  }
}