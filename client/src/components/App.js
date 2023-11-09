import React, {Fragment} from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Banner from "./Banner";
import NavBar from "./NavBar";

function App() {
  return(
    <Fragment>
    <Banner/>
    <NavBar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </Fragment>
  )
}

export default App;
