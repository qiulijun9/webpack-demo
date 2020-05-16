import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Home from '../src/components/Home.jsx';
import './App.scss';
let imgUrl = require('../public/imgs/2.jpeg');
function App() {
  console.log(33, imgUrl.default);
  return (
    // <div>
    //   <span>react jsxjsx </span>
    //   <p>fdfdfd</p>
    //   <img src={imgUrl.default} />
    //   <button>按钮</button>
    // </div>
    <>
      <button>按钮</button>
      {/* <BrowserRouter>
        <Route path="/home" component={Home} />
      </BrowserRouter> */}
    </>
  );
}
export default App;
