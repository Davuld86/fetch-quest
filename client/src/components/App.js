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

export const UserContext = createContext(null);
export const FriendContext = createContext(false);

function App() {
  const [user, setUser] = useState(null)
  const [friends, toggleFriends] = useState(false)

    useEffect(()=>{
        fetch("/api/check_session").then((r) => {
            if (r.ok) {
              r.json().then((user) => {setUser(user)});
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
        <Route path='/game'><Game/></Route>
        <Route path='*'><NotFound/></Route>
      </Switch>
      </FriendContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>

    </Fragment>
  )
}

export default App;
