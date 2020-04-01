import "./index.css";
import App, {
  a
} from "./app.js";
App();

console.log(a);
// console.log(b);
import imgsrc from "../public/imgs/dog.jpg";
let img = new Image();
img.onload = function () {
  document.body.appendChild(img);
};
img.src = imgsrc;