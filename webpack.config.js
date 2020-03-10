const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  devServer : {
    historyApiFallback : true,
    //enable to look on external ip on same network
    port: 8008, 
    host: '0.0.0.0',
    // disableHostCheck: true,
  },  
  entry: './routing/main.js',
  module: {
    rules: [
      { 
        test: /\.js$/, 
        use: 'babel-loader'
      },
      { 
        test: /\.vue$/,
        use: 'vue-loader'
      },
      { 
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      { 
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=./images/[name].[ext]' 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './routing/index.html',
    }),
    new VueLoaderPlugin(),
  ]
};