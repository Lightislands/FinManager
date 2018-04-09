var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [

		  {
			test: /\.vue$/,
			loader: 'vue',
			options: {
			  // vue-loader options go here
			}
		  },
		  {
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/
		  },
		  
		  {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallbackLoader: 'style-loader',
				loader: ['css-loader','sass-loader'],
				publicPath: '/dist'
			})
		},
		
		  
		  
		  {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file',
			options: {
			  name: '[name].[ext]?[hash]'
			}
		  }
    ]
  },
  
  plugins: [
    new ExtractTextPlugin({
		filename: 'bundle.css',
		disable: false,
		allChunks: true
	})
  ],
  
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    inline:true,
    port: 8008
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
