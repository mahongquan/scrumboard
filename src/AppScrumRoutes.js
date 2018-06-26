import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppScrum from './AppScrum';
import BoardView from './BoardView';
import {Router,Redirect, BrowserRouter,Route,Switch, Link} from 'react-router-dom'
var { ipcRenderer } =require("electron");//
import createHashHistory from "history/createHashHistory";
const history = createHashHistory({
  hashType: "slash" // the default
})
export default class Root extends Component<Props> {
  constructor(){
    super();
    ipcRenderer.on("goback", ()=>{
        console.log(history);
        history.goBack();
    });
  }
  render() {
    return (
        <Router  history={history}>
           <div>
                <Route path="/" component={AppScrum} />
                <Route path="/board/:id"  component={BoardView}  />
           </div>
        </Router>
    );
  }
}

