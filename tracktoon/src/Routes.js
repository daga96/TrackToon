import React from "react";
import { Route, Switch } from "react-router-dom";

import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import LoginReset from './components/Login/LoginReset';
import Main from './pages/Main'
import Profile from './pages/Profile'
import ProfileMain from './components/Profile/ProfileMain';
import List from './components/List/list';
import BrowseAll from './components/Browse/BrowseAll'
import { AuthProvider } from './contexts/AuthContext';

export default function Routes() {
    return (
        <AuthProvider>
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route exact path="/login" >
                    <Login />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/login/reset">
                    <LoginReset />
                </Route>
                <Route exact path="/browse/all">
                    <BrowseAll />
                </Route>
                <Route exact path="/list">
                    <List />
                </Route>
               
                <Profile exact path="/profile" component={ProfileMain} />

            </Switch>
        </AuthProvider>
    )
}
