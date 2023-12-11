import React, {Fragment, useState} from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import PlayHome from "./PlayHome";


function App() {

  return(
    <Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path='/'><Home/></Route>
        <Route exact path='/play'><PlayHome/></Route>
        <Route path='*'><NotFound/></Route>
      </Switch>
    </BrowserRouter>
    </Fragment>
  )
}

export default App;
