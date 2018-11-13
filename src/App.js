import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./containers/dashboard";
import TestDetail from "./containers/testDetail";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/:id" component={TestDetail} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
