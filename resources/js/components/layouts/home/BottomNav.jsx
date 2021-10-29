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
import {AddUnreadAction} from '../../redux/actions/UserAction';

export default function BottomNav() {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const closeModal = () => {
        setOpen(false);
    }
    const [update, setUpdate] = useState(false);
    const user_id = useSelector(state=>state.user.id);
    const unread = useSelector(state=>state.user.unread);

    useEffect(() => {
        let isPusher = true;
        const pusher = new Pusher('3901d394c4dc96fca656', {
            cluster: 'eu',
        });
        const channel = pusher.subscribe('levana-channel');
        channel.bind('levana-event', (data) => {
            console.log('pusher');
            console.log(data);
            if (data.receiver_id == user_id && isPusher) {
                // update unread
                let res = 1;
                dispatch(AddUnreadAction(res));
            }
        });
        return () => {
            isPusher = false;
        }
    },[]);

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
                                                    badgeContent={unread}
                                                >
                                                <ContactMailIcon color="secondary"/> 
                                                </Badge>
                                            } 
                                        onClick={() => history.push('/message')} />
                <BottomNavigationAction value="favourite" 
                                     
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