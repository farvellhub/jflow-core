/* eslint-disable no-undef */
const path = require( "path" ),
    cssExtract = require( "mini-css-extract-plugin" );

module.exports = {
    mode: "development",
    target: "web",

    entry: path.resolve( "src", "main.js"),

    output: {
        filename: "bundle.js",
        path: path.resolve( __dirname, "public/build" )
    },

    stats: {
        colors: true
    },

    devtool: "source-map",

    devServer: {
        contentBase: path.join( __dirname, "public" ),
        compress: true,
        open: true,
        hot: true,
        port: 3000
    },

    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    cssExtract.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },

            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: "file-loader",
                },
            }
        ]
    },

    plugins: [
        new cssExtract()
    ]
};
