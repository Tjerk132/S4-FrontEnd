const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  devServer : {
    historyApiFallback : true
  },
  entry: './routing/main.js',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
      { test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=./images/[name].[ext]' }
      // { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './routing/index.html',
    }),
    new VueLoaderPlugin(),
  ]
};