var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var path = require('path');
var $ = require('jquery');
var jQuery = require('jquery');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
var webpackConfig = {
  entry: __dirname + '/src/app.module.js',
  output: {
    path: __dirname + '/build/',
    filename: "[name].bundle.js"
  },
  watchOptions: {
    aggregateTimeout: 300
  },
  // devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,
  // module: {
  //   loaders: [
  //     { test: /\.css$/, loader: ExtractTextPlugin.extract({
  //       fallback: 'style-loader',
  //       use:  'css-loader!autoprefixer-loader'
  //     })},
  //     { test: /\.sass$/, loader: ExtractTextPlugin.extract({
  //       fallback: 'style-loader',
  //       use:  'css-loader!autoprefixer-loader!sass-loader'
  //     })},
  //     { test: /\.scss$/, loader: ExtractTextPlugin.extract({
  //       fallback: 'style-loader',
  //       use:  'css-loader!autoprefixer-loader!sass-loader'
  //     })},
  //     { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
  //     { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
  //     { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
  //     { test: /\.svg/, loader: 'url-loader?limit=1000000&&mimetype=image/svg+xml' },
  //     { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1000000&name=[name].[ext]' },
  //     { test: /\.js$/, loader: 'babel-loader', exclude: /(src\/bower_components|node_modules|assets)/, query: {presets: ['es2015'],compact: true}},
  //     // { test: /\.js$/, loader: '' },
  //     { test: /\.json$/, loader: 'json-loader' },
  //     { test: /\.html$/, loader: 'raw-loader'},
  //     // { test: /\.js$/, loader: 'babel-loader'}
  //   ]
  // },
  externals: {
    'jquery': 'jQuery'
  },
  plugins: [
    // new UglifyJSPlugin({
    //   sourceMap: false,
    //   mangle: false
    // }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      // port: 80,
      proxy: 'http://localhost/',
      // server: { baseDir: ['public'] }
    },
    // plugin options
    {
      // prevent BrowserSync from reloading the page
      // and let Webpack Dev Server take care of this
      reload: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({
      "require.specified": "require.resolve"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: __dirname + '/src/index.html'
    }),
    new ExtractTextPlugin('styles.css')
  ]
};

module.exports = webpackConfig;
