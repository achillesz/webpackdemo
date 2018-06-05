const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
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