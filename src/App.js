import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Index from "./components/index";
import NewComponent from "./components/new-component";
import ParkComponent from "./components/park-component";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/new-component" component={NewComponent} />
                <Route path="/park/" component={ParkComponent} />
                <Route exact path="/testPath" component={Index} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
