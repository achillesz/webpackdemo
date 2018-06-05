const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

console.log(process.env.NODE_ENV, devMode, '...')

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
               /*     {
                        loader: 'style-loader',
                    },*/
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },  {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [require('@babel/plugin-proposal-object-rest-spread')]
                    }
                }
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        open: true,
        openPage: 'admin.html',
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080,
        inline:true,
        hot: true,
        hotOnly: true,
        https: true,
        historyApiFallback:true,
        host: "0.0.0.0",
        headers: {
            "X-Custom-Foo": "bar"
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'app',
            inject: true,
            filename: 'admin.html',
            template: 'template/index.html',
            meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
       /*     templateParameters: '',
            favicon: ''*/
        }),
        new webpack.ProvidePlugin({
            $: 'jquery', // 前提是存在
            jQuery: 'jquery'
        })
    ],
    devtool: 'source-map',
    watch: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
};