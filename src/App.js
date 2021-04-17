import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Index from "./components/index";
import NewComponent from "./components/new-component";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/new-component" component={NewComponent} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
