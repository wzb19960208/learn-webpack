# learn-webpack
学习webpack的基本功能

## 构建基本的webpack配置

```js
// 初始化项目环境
npm init

// 安装webpack与webpack命令行工具
npm install webpack webpack-cli --save-dev

// 安装babel相关依赖
cnpm install babel-loader @babel/core @babel/preset-env --save-dev

//  添加npm script
"scripts": {
    "build": "webpack"
},
```
webpack.config.js
```js
var path = require('path')

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
    mode: 'development'
}
```