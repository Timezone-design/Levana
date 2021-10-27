import React, { useState, useEffect, useRef } from 'react'
import { useStyles } from '../styles/Styles';
import Header from '../layouts/home/Header';
import {Button,Tabs, Tab} from '@mui/material';
import AlertModal from '../modal/AlertModal';
import ConfirmModal from '../modal/ConfirmModal';
import BottomNav from '../layouts/home/BottomNav';
import SearchIcon from '@mui/icons-material/Search';
import Inbox from '../layouts/message/Inbox';
import Request from '../layouts/message/Request';




export default function Message() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const [requestKey, setRequestKey] = useState('');
    const [inboxKey, setInboxKey] = useState('');

    const chooseFilter = (key, value ) => {
        if (value) setRequestKey(key);
        else setInboxKey(key);
    }
    return (
        <>
            <Header headline='MESSAGE' />
            <div className='p-3 flex bg-yellow-500 w-full -mt-2'>
                <div className='px-3 py-2 bg-white w-full rounded-xl flex' >
                    <input value={value?requestKey:inboxKey} onChange={(e) => chooseFilter(e.target.value, value)} className='focus:outline-none bg-white w-full' placeholder='Serach here' />
                    <SearchIcon />
                </div>
            </div>
            <Tabs value={value} onChange={handleChange} indicatorColor='secondary' variant='fullWidth' textColor='secondary' >
                <Tab label="Inbox" classes={{root:classes.tab}} />
                <Tab label="Requests" classes={{root:classes.tab}} />
            </Tabs>
            <Inbox filter={inboxKey} show={value==0?true:false} />
            <Request filter={requestKey} show={value==1?true:false}/>
        </>



    )
}

