if (typeof process.env.NODE_ENV === 'undefined') process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackConfigForIde = require('./webpack-config-for-ide');
const alias = webpackConfigForIde.resolve.alias;
const rulesForSass = [
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
        data: `
          @import "variables";
          @import "mixins";
        `,
        includePaths: [
          path.resolve(__dirname, './src/config/styles')
        ]
      },
    },
  },
];
const rulesForCss = [
  'vue-style-loader',
  'style-loader',
  { loader: 'css-loader', options: { sourceMap: true } },
  { loader: 'postcss-loader', options: { sourceMap: true } },
];

const config = {
  mode: process.env.NODE_ENV,
  context: path.join(__dirname, '/src'),
  entry: [ '@babel/polyfill', 'index.js' ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new VueLoaderPlugin(),
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
  ],
  resolve: {
    extensions: [ '.js', '.vue', '.json' ],
    modules: [ path.resolve(__dirname, 'src'), 'node_modules' ],
    alias: {
      // 'vue$': process.env.NODE_ENV === 'development' ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
      vue$: 'vue/dist/vue.esm.js',
      ...alias,
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
          css: rulesForCss,
          sass: rulesForSass,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.sass$/,
        use: rulesForSass,
      },
      {
        test: /\.css$/,
        use: rulesForCss,
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.(svg|png|swf|jpg|otf|eot|ttf|woff|woff2)(\?.*)?$/,
        use: [ { loader: 'url-loader', options: { limit: 1000, name: 'assets/[hash].[ext]', esModule: false } } ],
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
        baseURL: '',
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
