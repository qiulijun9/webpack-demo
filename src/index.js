 import "./index.css";
 import "./index.less";
 import App, {
   a
 } from "./app.js";
 console.log(a, App);
 import imgsrc from "./img/2.jpeg";
 let img = new Image();
 img.onload = function () {
   document.body.appendChild(img);
 };
 img.src = imgsrc;

 let b = 666;
 console.log(b);