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

至此，webpack能够从app.js递归寻找依赖，转译ES6，并把多个js文件打包成一个app.bundle.js文件供index.html使用了

## HtmlWebpackPlugin
在上面的方式中，我们需要手动在dist文件夹下编写index.html，再引入生成的app.bundle.js。如果生成的文件是带hash的，那么每次打包都要重新修改，非常麻烦。

```js
// 安装相应插件
cnpm install html-webpack-plugin --save-dev
```

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 直接new即可
plugins: [
        new HtmlWebpackPlugin({
            // 输出的文件名
            // 输出的路径就是上面的output定义的文件夹
            filename:'index.html',
            // 选定模板
            template:'./index.html'
        })
    ],
```

```html
<!-- 模板 -->
<!DOCTYPE html>
<head>
    <title>首页</title>
</head>
<body>
    <p1>Hello World</p1>
</body>
```

```html
<!-- 转换之后 -->
<!DOCTYPE html>
<head>
    <title>首页</title>
</head>
<body>
    <p1>Hello World</p1>
<script type="text/javascript" src="app.bundle.js"></script></body>
```

## 生产和开发模式
生产环境下会自动Tree-shaking以及启用uglifyjs对代码进行压缩，不需要自己再配置了

```js
"build": "webpack --mode production",
"dev": "webpack --mode development"
```

```js
// 生产环境
app.bundle.js   1.04 KiB

// 开发环境
app.bundle.js   4.49 KiB
```