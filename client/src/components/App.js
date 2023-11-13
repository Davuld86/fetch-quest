import React, {Fragment} from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Banner from "./Banner";
import NavBar from "./NavBar";

function App() {
  return(
    <Fragment>
    <Banner/>
    <NavBar/>
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
    </Fragment>
  )
}

export default App;
