import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import Pusher from "pusher-js";
import { useDispatch, useSelector } from 'react-redux';
import {useStyles} from '../../styles/Styles';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function BottomNav() {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [number, setNumber] = useState(0);
    const unread = sessionStorage.getItem('unread');

    return (
        <>
            <div className='flex rounded-xl bg-yellow-100 align-items-center justify-between' style={{width:'60px', height:'40px', padding:'10px'}}>
                <NotificationsIcon color='secondary'/>
                {parseInt(unread)}
            </div>
        </>
    )
}