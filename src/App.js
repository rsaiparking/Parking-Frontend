import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Index from "./components/index";
import ParkComponent from "./components/park-component";
import UnparkComponent from "./components/unpark-component";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/park/" component={ParkComponent} />
                <Route path="/unpark/" component={UnparkComponent} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
