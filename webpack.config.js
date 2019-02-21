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
                test:'/(\.js|\.jsx)$/',
                exclude:'/node_modules/',
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-react','@babel/preset-env']
                    }
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

    externals: {
        "react": 'React',
        'react-dom': 'ReactDOM'
    },

    resolve: {
        extensions: ['.js', '.css']
    },

    devServer:{
        contentBase:'./dist/',
        inline:true,
        port:'3000'
    }

}