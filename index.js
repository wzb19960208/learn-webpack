import React , {Component} from 'react';
import ReactDom from 'react-dom';
// import App from './src/app.js';

// 测试是否成功
console.log('ok');

// 测试es6
var a = [1,2,3].map(item => {return item * 2})
console.log(a);

// 测试是否导入
console.log(React.version);
console.log(ReactDom);

// 测试React与JSX
class Test extends Comment{
    render(){
        return (<div>This is React</div>)
    }
}

// ReactDom.render(<App />,document.getElementById('root'));

