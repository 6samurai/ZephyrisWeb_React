var webpack = require('webpack');

var config = {
	context: __dirname, // `__dirname` is root of project and `src` is source
 
	entry: {
		app: './main.js',
	},

	output: {
		path: __dirname + '/dist', // `dist` is the destination
		filename: 'bundle.js',
	},

	devServer: {
		contentBase: __dirname , // `__dirname` is root of the project
	},

	devtool: 'eval-source-map',

	module: {
		rules: [
			{
				test: /\.js$/, // Check for all js files
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: { presets: ['es2015', 'react','stage-0'] }
				}]
			},
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&mimetype=image/svg+xml' }    
		]
	}, 
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
};

if (process.env.NODE_ENV === 'production') {
	config.devtool = ''; // No sourcemap for production

  // Add more configuration for production here like
  // SASS & CSS loaders
  // Offline plugin
  // Etc,
}

module.exports = config;
