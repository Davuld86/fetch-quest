import React, {Fragment, createContext, useEffect, useState} from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import PlayHome from "./PlayHome";
import './App.css'
import Register from "./Register";
import CreateCharacter from "./CreateCharacter";
import NavBar from "./NavBar";
import EditAccount from "./EditAccount";
import FriendContainer from "./FriendContainer";
import Messages from "./Messages";
import Account from "./Account";
import EditCharacter from "./EditCharacter";
import Shop from "./Shop";
import Game from "./Game";
import TreeHouse from "./TreeHouse";
import Plaza from "./Plaza";
import Graveyard from "./Graveyard";
import Forest from "./Forest";
import Boneyard from "./Boneyard";
import Bridge from "./Bridge";
import Clearing from "./Clearing";
import CrystalCave from "./CrystalCave";
import FunitureShop from "./FurnitureShop";
import PotionShop from "./PotionShop";
import ClothesShop from "./ClothesShop";
import { charDefault, userDefault } from "./default";

export const UserContext = createContext(null);
export const FriendContext = createContext(false);
export const CharacterContext = createContext(null);

function App() {
  const [user, setUser] = useState(null)
  const [character, setCharacter] = useState(charDefault)
  const [friends, toggleFriends] = useState(false)

    useEffect(()=>{
        fetch("/api/check_session").then((r) => {
            if (r.ok) {
              r.json().then((user) => {setUser(user); setCharacter(user.character[0])});
            }
            else{
                return (null)
            }
          })
    },[])
  return(
    <Fragment>
    <BrowserRouter>
    <UserContext.Provider value={[user, setUser]}>
    <FriendContext.Provider value={[friends, toggleFriends]}>
    <CharacterContext.Provider value={[character, setCharacter]}>

    <NavBar/>
    {friends?<FriendContainer/>:null}
      <Switch>
        <Route exact path='/'><Home/></Route>
        <Route exact path='/play'><PlayHome/></Route>
        <Route path='/register'><Register/></Route>
        <Route path='/account/:uid'><Account/></Route>
        <Route path='/edit-character/:uid'><EditCharacter/></Route>
        <Route path='/account-settings/:uid'><EditAccount/></Route>
        <Route path='/create-character'><CreateCharacter/></Route>
        <Route path='/messages'><Messages/></Route>
        <Route path='/store'><Shop/></Route>

        <Route exact path='/game/'><Plaza/></Route>
        <Route exact path='/game/furniture-shop'><FunitureShop/></Route>
        <Route exact path='/game/potion-shop'><PotionShop/></Route>
        <Route exact path='/game/clothes-shop'><ClothesShop/></Route>
        <Route exact path='/game/graveyard'><Graveyard/></Route>
        <Route exact path='/game/graveyard'><Graveyard/></Route>
        <Route exact path='/game/forest'><Forest/></Route>
        <Route exact path='/game/clearing'><Clearing/></Route>
        <Route exact path='/game/boneyard'><Boneyard/></Route>
        <Route exact path='/game/bridge'><Bridge/></Route>
        <Route exact path='/game/crystal-cave'><CrystalCave/></Route>

        <Route path='/base/:uid'><TreeHouse/></Route>
        <Route path='*'><NotFound/></Route>
      </Switch>

      </CharacterContext.Provider>
      </FriendContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>

    </Fragment>
  )
}

export default App;
