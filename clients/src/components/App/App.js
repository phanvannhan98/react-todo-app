import React from 'react';
import HomePage from '../../pages/home/HomePage';
import LoginPage from '../../pages/login/LoginPage';
import NotFoundPage from '../../pages/notfoundpage/NotFoundPage';
import Register from '../../pages/register/Register';

// import routers from '../../routers';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

export default () => {

    return (
        <Router basename="" hashType="noslash" >
            <Switch>
                <Route path="/login" component={LoginPage} exact/>
                <Route path="/register" exact component={Register}/>
                <Route path="/" exact component={HomePage}/>
                <Route path="" component={NotFoundPage}/>
            </Switch>
        </Router>
    )
}
