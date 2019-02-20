import a from './src/a';
import './asset/css/style1.css'
import './asset/css/style2.css'

console.log(a.name);
console.log(a.age);

var root = document.getElementById('root');

var redBox = document.createElement('div');

redBox.setAttribute('class','red-box');

var greenBox = document.createElement('div');

greenBox.setAttribute('class','green-box');

root.appendChild(redBox);

root.appendChild(greenBox);