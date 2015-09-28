module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: __dirname + '/javascripts/',
    filename: '../bundle.js'
  },
  module: {
    loaders: [{ 
      test: /\.jsx?$/, 
      loader: 'babel'
    }]
  }
};
