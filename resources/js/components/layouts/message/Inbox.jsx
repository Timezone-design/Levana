import React, { useState, useEffect, useRef } from 'react'
import { useStyles } from '../../styles/Styles';
import {useHistory} from 'react-router-dom';
import PersonalInbox from './PersonalInbox';
import {ImageList, ImageListItem} from '@mui/material';
import {GetInbox} from '../../services/InboxService';
import * as ActionTypes from '../../redux/ActionTypes';
import {useDispatch, useSelector} from 'react-redux';
import {UpdateBooking} from '../../services/BookingService';

export default function Inbox(props) {

    const {filter, show, setInboxUnread} = props;
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [inboxes, setInboxes] = useState([]);
    const account_type = useSelector(state=>state.user.account_type);

    const handleClick = (inbox) => {
        if ( !inbox.booking_read ) {
            var data;
            if (account_type == 'escort') 
                data = {
                    'id':inbox.id,
                    'escort_read':true,
                }
            else 
                data = {
                    'id':inbox.id,
                    'client_read':true,
                }
            UpdateBooking(data).then(response => {
                console.log(response);
                let res = {
                    count:1
                }
                dispatch({type:ActionTypes.DISCOUNT_UNREAD, res});

            });
        }
        history.push(`/chat/${inbox.id}`);
    }

    useEffect(() => {
        GetInbox().then(response => {
            // console.log(response);
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
                            <ImageListItem key={index} classes={{root:classes.inboxItem}} onClick={(e) => handleClick(inbox)} >
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

