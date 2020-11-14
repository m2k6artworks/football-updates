const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const serviceWorkerConfig = merge(common, {
    entry: {
        'service-worker': './src/js/service-worker/service-worker.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js'
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.json$/i, 
                loader: 'file-loader?name=[name].json',
                options: {
                    name: '[name].[ext]',
                }
            },
            {
                test: /\.ttf$/i, 
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            },
            {
                test: /\.woff2$/i, 
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            },
            {
                test: /\.(jpe?g|png|webp)$/i, 
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/'
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
              { from: './src/json/manifest.json', to: './' },
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: './src/js/service-worker/regis-sw.js', to: './' },
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/images', to: './images' },
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/fonts', to: './fonts' },
            ]
        }),
    ]
});

const mainConfig  = merge(common, {
    entry: {
        'main': './src/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: '[name].bundle.js'
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/views/index.html",
            filename: "../index.html",
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: "src/views/league.html",
            filename: "../views/league.html",
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: "src/views/favorite-team.html",
            filename: "../views/favorite-team.html",
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: "src/views/contact.html",
            filename: "../views/contact.html",
            inject: false
        })
    ]
});

const viewsConfig = merge(common, {
    entry: {
        'standings': './src/js/standings.js',
        'detail-team': './src/js/detail-team.js'
    },
    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: '[name].bundle.js'
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|webp)$/i, 
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: '../images/'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/views/standings.html",
            filename: "../views/standings.html",
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: "src/views/detail-team.html",
            filename: "../views/detail-team.html",
            inject: false
        })
    ]
});

module.exports = [
    serviceWorkerConfig, mainConfig, viewsConfig
]