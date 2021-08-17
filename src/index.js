import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AllCharacterScreen from "./components/AllCharacterScreen/AllCharacterScreen";
import SearchPage from "./components/SearchPage/SearchPage";
import CharacterScreen from "./components/CharacterScreen/CharacterScreen";

const routing = (
  <Router>
    <React.StrictMode>
      <Switch>
        <Route path="/" exact component={AllCharacterScreen} />
        <Route path="/search" exact component={SearchPage} />
        <Route path="/character" exact component={CharacterScreen} />
      </Switch>
    </React.StrictMode>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();
