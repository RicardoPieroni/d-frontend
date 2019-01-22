import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from '../home';
import Header from '../header';
import FoodRequest from '../food-request';

import './../../assets/unsemantic/assets/stylesheets/unsemantic-grid-responsive.css';
import './../../assets/style.css';

const Routes = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/home' component={Home}/>
                <Route exact path='/food-request/new' component={FoodRequest}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default Routes;