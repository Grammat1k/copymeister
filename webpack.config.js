const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    video_creator: './src/VideoCreator/index.js',
    scheduler: './src/Scheduler/index.js',
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src/'),
    }
  },
  externals: nodeExternals(),
  node: {
    __dirname: false,
  }
}
