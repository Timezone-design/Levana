import React, { useState, useEffect, useRef } from 'react'
import { useStyles } from '../../styles/Styles';
import {useHistory} from 'react-router-dom';
import PersonalInbox from './PersonalInbox';
import {ImageList, ImageListItem} from '@mui/material';
import {GetInbox} from '../../services/InboxService';

export default function Inbox(props) {

    const {filter, show, setInboxUnread} = props;
    const classes = useStyles();
    const history = useHistory();
    const [inboxes, setInboxes] = useState([]);

    useEffect(() => {
        GetInbox().then(response => {
            console.log(response);
            setInboxes(response.inbox);
            setInboxUnread(response.total_unread);
        });
    },[]);

    return (
        <div className='message_scroll' style={{ display:(show?'block':'none')}} >
            {inboxes.length > 0?
                <ImageList cols={2} classes={{root:classes.inboxList}} rowHeight={200} gap={10}>
                    {
                        inboxes.map((inbox, index) => (
                            inbox.full_name.toLowerCase().includes(filter.toLowerCase()) &&
                            <ImageListItem key={index} classes={{root:classes.inboxItem}} onClick={(e) => history.push(`/chat/${inbox.booking_id}`)} >
                                <PersonalInbox inbox={inbox} />
                            </ImageListItem>
                        ))
                    }   
                </ImageList>
            :
            <p className='my-10'>No inbox to show</p>
            }
        </div>
    )
}

