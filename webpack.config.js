if (typeof process.env.NODE_ENV === 'undefined') process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const VueLoader = require('vue-loader');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackConfigForIde = require('./webpack-config-for-ide');
const alias = webpackConfigForIde.resolve.alias;

const config = {
  mode: process.env.NODE_ENV,
  context: path.join(__dirname, '/src'),
  entry: [ '@babel/polyfill', 'index.js' ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
      // favicon: './favicon.ico',
    }),
    new VueLoader.VueLoaderPlugin(),
  ],
  resolve: {
    extensions: [ '.js', '.vue', '.json', '.sass', '.css' ],
    modules: [ path.resolve(__dirname, 'src'), 'node_modules' ],
    alias: {
      ...alias,
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          css: [
            'vue-style-loader',
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: true } },
            'postcss-loader',
          ],
          sass: [
            'vue-style-loader',
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: true } },
            {
              loader: 'sass-loader',
              options: {
                indentedSyntax: true,
                sourceMap: true,
              },
            },
          ],
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentedSyntax: true,
                sourceMap: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  config.devtool = 'nosources-source-map';
  config.optimization = {
    minimize: true,
    minimizer: [ new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({}) ],
  };
} else {
  config.devtool = 'inline-source-map'; //
  config.plugins.push(new webpack.NamedModulesPlugin());
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    port: 8030,
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
    },
    proxy: {
      '/api/**': {
        target: '',
        secure: true,
        changeOrigin: true,
      },
    },
  };
}

if (process.env.BUILD_ANALYZE) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
