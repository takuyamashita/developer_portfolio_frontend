import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Home, Admin, ProductEdit, ProductDetail } from "./page";

const Router = () => {

    return (
        <Switch>
            <Route exact path={'/admin'} component={Admin}/>
            <Route exact path={'/product/edit'} component={ProductEdit}/>
            <Route exact path={'/product/:routeName/:page?'} component={ProductDetail}/>
            <Route path={'(/)?'} component={Home}/>
        </Switch>
    );
};

export default Router;