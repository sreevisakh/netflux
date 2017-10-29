const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const env = (process.env.NODE_ENV === 'production')? 'PROD': 'DEV';

/////////////////////////////////////////////////////
// Common Configuration for both dev & prod builds //
/////////////////////////////////////////////////////
const config = {
  entry: {
    app: [
      './src/client/App.js'
    ],
    vendor: ['react', 'react-dom', 'axios',
      'react-redux', 'redux', 'redux-thunk', 'redux-logger']
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: ''
  },
  resolve: {
    modules: ['node_modules', './src/client/']
  },
  module: {
    rules: [{
      test: /\.js$/, 
      loader: 'babel-loader',
      exclude: [/node_modules/],
      query: {
        presets: [
          'env', 'react'
        ],
        plugins: [
          'transform-object-rest-spread',
          'transform-decorators-legacy',
          'transform-class-properties'
        ]
      }
    }, {
      test: /\.less|\.css$/,
      loaders: ['style-loader', 'css-loader?sourceMap', 'scss-loader?sourceMap']
    }, {
      test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: module => module.context && module.context.indexOf('node_modules') !== -1 }),
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      inject: true
    })
  ]
};

//////////////////////////////////////////////////////////
// add hot-reload, sourcemaps, dev server for DEV build //
//////////////////////////////////////////////////////////

if (env === 'DEV') {
  config.output.path = path.resolve('dist/public')
  config.output.publicPath = ''
  config.devtool = 'inline-source-map'
  config.devServer = {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        changeOrigin: true
      },
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin())
}

// //////////////////////////////////////////////////////
// add uglify, cheap source code for production build  //
// //////////////////////////////////////////////////////

else if (env === 'PROD') {
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  
  config.output.path = path.join(__dirname, 'dist/')
  config.output.sourceMapFilename = '[name].[hash].map'
  config.devtool = 'inline-source-map'
  config.plugins.unshift(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  )
  config.plugins.unshift(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  )
  config.plugins.unshift(
    new ExtractTextPlugin('style.css')
  )
}

module.exports = config

