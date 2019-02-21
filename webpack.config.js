var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry:{
        app:'./index.js'
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'app.bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/ ,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.css$/,
                use : [ 
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./index.html'
        }),

        new MiniCssExtractPlugin({
            filename: "app.bundle.css"
        })
    ],

    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },

    devServer:{
        contentBase:'./dist/',
        inline:true,
        port:'3000'
    }

}