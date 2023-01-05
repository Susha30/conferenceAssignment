const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
    mode: 'production',
    //mode: 'development',
    entry: {
      style : './sass/style.scss'
    },
    output: {
        path: path.resolve(__dirname, '../js'),
        filename: '[name].js'
    },

    plugins: [
        // Extracts CSS into separate files
        // Note: style-loader is for development, MiniCssExtractPlugin is for production
        new MiniCssExtractPlugin({
            filename: '../css/[name].css',
            chunkFilename: '[id].css',
        }),
    ],


    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false,
                            url: false
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },

        ],
    },
  optimization: {
    minimize: true
  },


   optimization: {
        minimize: true,
        //minimizer: [new CssMinimizerPlugin()],

        // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
        // instead of having their own. This also helps with long-term caching, since the chunks will only
        // change when actual code changes, not the webpack runtime.
      /*  runtimeChunk: {
            name: 'runtime',
        },

       */
    },


    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },

};
