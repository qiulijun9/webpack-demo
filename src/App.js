import React from 'react';
import "./App.scss";
let imgUrl=require('../public/imgs/2.jpeg');
function App() {
  console.log(33,imgUrl.default)
  return (
    <div>
      <span>react jsxjsx </span> 
      <p>fdfdfd</p>
      <img src={imgUrl.default}/> 
      <button>按钮</button>
      
    </div>
  );
}
export default App;
