import React, {Fragment} from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Banner from "./Banner";
import NavBar from "./NavBar";
import GamePage from "./GamePage";
import NoPage from "./NoPage";
import UserPage from "./UserPage";
function App() {

  return(
    <Fragment>
    <BrowserRouter>
    <Banner/>
    <NavBar/>
      <Switch>
        <Route exact path='/'>  <Home/>   </Route>
        <Route path='/play/:id'> <GamePage/> </Route>
        <Route path='/user/:id'> <UserPage/>  </Route>
        <Route path='/user/edit/:id'> <UserPage/>  </Route>
        <Route path='*'> <NoPage/> </Route>
      </Switch>
    </BrowserRouter>
    </Fragment>
  )
}

export default App;
