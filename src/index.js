import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import "./index.less";
import App from "./App";
import moment from 'moment';
//动态引入moment语言
import 'moment/locale/zh-cn';
import message from './other';
console.log(2277772,moment.locale());

//引入lodash
let  isEqual = require('lodash/_baseIsEqual');
let object = { 'a': 1 };
let other = { 'a': 1 };
 
console.log(isEqual(object, other));
//引入echarts
// let echarts = require('echarts');
 //按需引入
// let echarts = require('echarts/lib/echarts');
// // 引入柱状图
// require('echarts/lib/chart/bar');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
 //import imgsrc from "./img/2.jpeg";
//  let img = new Image();
//  img.onload = function () {
//    document.body.appendChild(img);
//  };
//  img.src = imgsrc;

// 懒加载 import 
// setTimeout(()=>{
//    import ('./other').then(res =>{
//      console.log(res.default.message)
//    })
// },3000)


let inputEl = document.createElement("input");
document.body.appendChild(inputEl);


// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
    title: { text: 'ECharts 入门示例' },
    tooltip: {},
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});

//开启热更新
if(module.hot){
  module.hot.accept(["./other.js"],()=>{
    //热更新之后的回调
    console.log(333,message)
  })
}
const noUse = 8888;
console.log(noUse)
function foo(){
  console.log("foo")
}
foo()
 ReactDOM.render(<App />, document.getElementById('root'));