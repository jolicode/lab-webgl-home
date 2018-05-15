const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const Config = require('./settings.config')

module.exports = {
    context: path.resolve(__dirname, './src'),
        entry: {
          app: ['./config/styles.js', './javascript/index.js'],
        },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'javascript/bundle.js',
        publicPath: '/',
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        host: Config.shared ? "0.0.0.0" : null,
        port: Config.port,
        inline: Config.inline,
        proxy: Config.proxy,
        https: Config.https
    },
    module: {
        rules: [
          {
            enforce: "pre",
            test: /\.js$/,
            exclude: [/node_modules/],
            loader : 'eslint-loader',
          },
          {
              test: /\.js$/,
              exclude: [/node_modules/],
              use: [{
                  loader: 'babel-loader',
                  options:
                  {
                      "presets": [
                          ["env", {
                              "targets": {
                                  "browsers": Config.browsersTarget
                              }
                          }]
                      ]
                  }
              }],
          },
          {
              test: /\.styl/,
              use: [
                MiniCssExtractPlugin.loader,
                      'css-loader',
                      'postcss-loader',
                      'stylus-loader'
              ]
          },
          {
              test: /\.(txt|frag|vert|glsl|svg)$/,
              use: 'raw-loader'
          },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'stylesheet/main.css',
            allChunks: true,
        }),
    ],
}
