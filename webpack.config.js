module.exports = [{
  context: __dirname + "/src",
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  },
  devServer: {
		contentBase: "./public",
	},
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
}];