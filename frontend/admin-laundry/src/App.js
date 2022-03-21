import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import Member from "./pages/Member"
import User from "./pages/User"
import Paket from "./pages/Paket"
import Transaksi from "./pages/Transaksi"
import Home from "./pages/Home"
 
export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/member" component={Member} />
        <Route path="/user" component={User} />
        <Route path="/transaksi" component={Transaksi} />
        <Route path="/paket" component={Paket} />
      </Switch>
    )
  }
}

