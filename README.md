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

## 自动生成html
在上面的方式中，我们需要手动在dist文件夹下编写index.html，再引入生成的app.bundle.js。如果生成的文件是带hash的，那么每次打包都要重新修改，非常麻烦。  

所以可以使用HtmlWebpackPlugin插件，通过模板html生成对应的html文件

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

## 提取CSS文件

好处
 - 可以将项目依赖的css文件都打包成一份进行压缩
 - 在js文件中可以直接 import 导入 css 文件

需要的插件
 - css-loader 提取css
 - style-loader 将css样式通过 style 标签的形式插入到html中

单纯通过这两个loader打包，会使得css被打包到js文件中，以字符串的形式存在，并且整个app.bundle.js比平常大了不少。

![](https://upload-images.jianshu.io/upload_images/4122026-39b17fce708f5bdc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/777/format/webp)

浏览器打开index.html，就会发现css以style的形式被插到了html中

![](https://upload-images.jianshu.io/upload_images/4122026-9a299a1c0ca06680.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/766/format/webp)

这样子打包出来的html不是很美观，也存在js与css混用的情况

可以使用MiniCssExtractPlugin，将css提取到单独的app.bundle.css中，并进行转换，给html添加一个唯一的link 标签

```js
var MiniCssExtractPlugin = require('mini-css-extract-plugin');


module : {
        rules:[
            
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

        // 抽取成一个文件
        new MiniCssExtractPlugin({
            filename: "app.bundle.css"
        })
    ]
```
```js
// app.js

// 在此处引入的css文件，最终都会打包成一个app.bundle.css
import './asset/css/style1.css'
import './asset/css/style2.css'

var root = document.getElementById('root');

var redBox = document.createElement('div');

redBox.setAttribute('class','red-box');

var greenBox = document.createElement('div');

greenBox.setAttribute('class','green-box');

root.appendChild(redBox);

root.appendChild(greenBox);
```

