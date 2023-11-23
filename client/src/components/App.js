import React, {Fragment} from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Banner from "./Banner";
import NavBar from "./NavBar";
import GamePage from "./GamePage";
import NoPage from "./NoPage";
import UserPage from "./UserPage";
import EditProfile from "./EditProfile";
import UploadGameForm from "./UploadGameForm";
import CategoryGames from "./CategoryGames";
import AllCategories from "./AllCategories";
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
        <Route path='/edit-profile/:id'> <EditProfile/> </Route>
        <Route path='/upload-game'><UploadGameForm/></Route>
        <Route path='/categories'><AllCategories/></Route>
        <Route path='/games/category/:category'> <CategoryGames/> </Route>
        <Route path='/search-games/:query'> <NoPage/> </Route>
        <Route path='*'> <NoPage/> </Route>
      </Switch>
    </BrowserRouter>
    </Fragment>
  )
}

export default App;
