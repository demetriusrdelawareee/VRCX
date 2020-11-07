const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mainConfig = {
    entry: './src/main.js',
    output: {
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.node$/,
                loader: 'node-loader',
            },
        ]
    },
    devtool: false,
    target: 'electron-main'
};

const appConfig = {
    entry: './src/app.js',
    output: {
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'app.html',
            inject: false,
            minify: false,
            template: './src/app.pug'
        }),
        new MiniCssExtractPlugin({
            filename: 'app.css'
        })
    ],
    devtool: false,
    target: 'electron-renderer'
};

if (process.env.NODE_ENV === 'production') {
    appConfig.plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                { from: './static', to: './' },
            ],
        })
    );
}

module.exports = [
    mainConfig,
    appConfig
];
