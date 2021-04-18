import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Index from "./components/index";
import NewComponent from "./components/new-component";
import ImageUploader from "./components/upload-image";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/new-component" component={NewComponent} />
                <Route exact path="/upload-image" component={ImageUploader} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
