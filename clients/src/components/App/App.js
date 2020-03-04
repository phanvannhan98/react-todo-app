import React from 'react';
import HomePage from '../../pages/home/HomePage';
import LoginPage from '../../pages/login/LoginPage';
import NotFoundPage from '../../pages/notfoundpage/NotFoundPage';
// import routers from '../../routers';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

export default () => {

    // const showPage = () => {
    //     let arr = routers.map((v) => {
    //         <Route path={v.path} exact={v.exact} component={v.main} />
    //         })
            
    //     return <Switch>{arr}</Switch>
    // }

    return (
        <Router basename="" hashType="noslash" >
            <Switch>
                <Route path="/login" component={LoginPage} exact/>
                <Route path="/" exact component={HomePage}/>
                <Route path="" component={NotFoundPage}/>
            </Switch>
        </Router>
    )
}
