import React, {useEffect} from 'react';
import {Switch, Route, withRouter} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import Booking from './pages/Booking';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Chat from './pages/Chat';
import Message from './pages/Message';
import Account from './pages/Account';
import Search from './pages/Search';
import Membership from './pages/Membership';
import Payment from './pages/Payment';

import { theme } from './styles/Styles';

function Routes() {

    return(
        <ThemeProvider theme={theme}>
            <Switch>
                <Route path='/home' component={Home} />
                <Route path='/booking' component={Booking} />
                <Route path='/profile/:viewID' component={Profile} />
                <Route path='/editprofile' component={EditProfile} />
                <Route path='/account' component={Account} />
                <Route path='/search' component={Search} />
                <Route path='/membership' component={Membership} />
                <Route path='/payment' component={Payment} />

                <Route path='/message' component={Message} />
                <Route path='/chat/:booking_id' component={Chat} />
            </Switch>
        </ThemeProvider>
    )
}

export default withRouter(Routes);