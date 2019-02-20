var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
        app:'./app.js'
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'app.bundle.js'
    },
    module:{
        rules:[
            {
                test:'/\.js$/',
                exclude:'/node_modules/',
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            }
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./index.html'
        })
    ],

    mode: 'development'
}