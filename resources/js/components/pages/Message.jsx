import React, { useState, useEffect, useRef } from 'react'
import { useStyles } from '../styles/Styles';
import Header from '../layouts/home/Header';
import {Button,Tabs, Tab, Badge} from '@mui/material';
import AlertModal from '../modal/AlertModal';
import ConfirmModal from '../modal/ConfirmModal';
import BottomNav from '../layouts/home/BottomNav';
import SearchIcon from '@mui/icons-material/Search';
import Inbox from '../layouts/message/Inbox';
import Request from '../layouts/message/Request';

export default function Message() {
    const classes = useStyles();
    const [toggle, setToggle] = useState(false);
    const [requestKey, setRequestKey] = useState('');
    const [inboxKey, setInboxKey] = useState('');
    const [inboxUnread, setInboxUnread] = useState();
    const [requestUnread, setRequestUnread] = useState();
    const chooseFilter = (key, toggle ) => {
        if (toggle) setRequestKey(key);
        else setInboxKey(key);
    }
    return (
        <>
            <Header headline='MESSAGE' />
            <div className='p-3 flex bg-yellow-500 w-full -mt-2'>
                <div className='px-3 py-2 bg-white w-full rounded-xl flex' >
                    <input value={toggle?requestKey:inboxKey} onChange={(e) => chooseFilter(e.target.value, toggle)} className='focus:outline-none bg-white w-full' placeholder='Serach here' />
                    <SearchIcon />
                </div>
            </div>
            <div className='w-full flex align-items-center justify-between'>
                <div onClick={() => setToggle(false)} className={'w-6/12 p-2 message_tab '+ (toggle?'':'selected')}>
                    <Badge  color='secondary' variant={inboxUnread > 0 ? 'dot':''} >
                        <div className='w-full text-base font-semibold px-6'>Inbox</div>
                    </Badge>
                </div>
                <div onClick={() => setToggle(true)} className={'w-6/12 p-2 message_tab '+ (toggle?'selected':'')}>
                    <Badge  color='secondary' variant={requestUnread > 0 ? 'dot':''} >
                        <div className='w-full text-base font-semibold px-6'>Request</div>
                    </Badge>
                </div>
            </div>
            <Inbox filter={inboxKey} show={!toggle} setInboxUnread={setInboxUnread}/>
            <Request filter={requestKey} show={toggle} setRequestUnread={setRequestUnread}/>
        </>



    )
}

