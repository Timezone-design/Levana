import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import Pusher from "pusher-js";
import { useDispatch, useSelector } from 'react-redux';
import {useStyles} from '../../styles/Styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Badge from '@mui/material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingModal from '../../modal/SettingModal';
import {GetUnRead} from '../../services/AccountService';

export default function BottomNav() {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const closeModal = () => {
        setOpen(false);
    }
    const [update, setUpdate] = useState(false);
    const unread = sessionStorage.getItem('unread');
    useEffect(() => {
        let isMounted = true;
        GetUnRead().then(response => {
            if (isMounted) {
                console.log(response);
                sessionStorage.setItem('unread', response.unread);
                setUpdate(!update);
            }
        });
        return () => { isMounted = false};
    },[]);


    // useEffect(()=> {
    //     let isPuser = true;
    //     AccountService.getUserInfo()
    //         .then(result => {
    //             console.log('rsult',result);
    //             console.log('accounttype', result.userType);
    //             console.log('id', result.userID);
    //             console.log('id', result.unread);
    //             userID = result.userID;
    //             userType = result.userType;
    //             setNumber(result.unread);
    //         });

    //     const pusher = new Pusher('3901d394c4dc96fca656', {
    //         cluster: 'eu',
    //     });
    //     const channel = pusher.subscribe('levana-channel');        
    //     channel.bind('levana-event', (data) => {
    //         console.log('pusher');
    //         console.log(data);
    //         console.log('rrr', parseInt(data.receiver_id), userID, userType);
    //         if (isPuser) {
    //             if ( (data.trigger == 'send_message') && ( parseInt(data.receiver_id) == userID ) )
    //             {   
    //                 console.log('updating notif ..');
    //                 dispatch(NotifAction(!notif));
    //             }

    //             if (data.trigger == 'update_booking_request') {
    //                 if ((userType == 'client') && (parseInt(data.client_id) == userID) && (parseInt(data.client_unread) == 0)) {
    //                     dispatch(NotifAction(!notif));
    //                 }
    //                 if ((userType == 'escort') && (parseInt(data.escort_id) == userID) && (parseInt(data.escort_unread) == 0)) {
    //                     dispatch(NotifAction(!notif));
    //                 }
    //             }

    //             if ((data.trigger == 'new_booking') && (userType == 'escort') 
    //                 && (parseInt(data.escort_id) == userID) && (parseInt(data.escort_unread) == 0)) {
                        
    //                     dispatch(NotifAction(!notif));
    //             }
    //         }
    //     });
    //     return ()=>{
    //         isPuser = false;
    //     }
        
    // },[notif]);

    return (
        <>
            <SettingModal isOpen={open} cancelModal={closeModal} />
            <BottomNavigation classes={{root:classes.bottomNavigation}} >
                <BottomNavigationAction value="home" icon={<HomeIcon color="secondary"/>} 
                        onClick={() => window.location.href='/'}
                    />
                <BottomNavigationAction value="contact" 
                                        icon={ <Badge  anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                        }}
                                                    color='secondary'
                                                    badgeContent={unread?parseInt(unread):0}
                                                >
                                                <ContactMailIcon color="secondary"/> 
                                                </Badge>
                                            } 
                                        onClick={() => history.push('/message')} />
                <BottomNavigationAction value="favourite" 
                                        onClick={() => history.push('/favorite')}
                                        icon={<FavoriteIcon color="secondary"/>} />
                <BottomNavigationAction value="search" 
                                        onClick={() => history.push('/search')}
                                        icon={<SearchIcon color="secondary"/>} 
                     
                />
                <BottomNavigationAction value="profile" icon={<AccountCircleIcon color="secondary"/>} 
                     onClick={(e) => setOpen(true)}
                    />
            </BottomNavigation>
        </>
    )
}