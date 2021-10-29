import React, { useState, useEffect, useRef } from 'react'
import { useStyles } from '../../styles/Styles';
import PersonalRequest from './PersonalRequest';
import {GetRequest} from '../../services/RequestService';

export default function Request(props) {

    const {filter, show, setRequestUnread} = props;
    const classes = useStyles();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        let isMounted = true;
        GetRequest().then(response => {
            // console.log(response);
            if(isMounted) {
                setRequests(response.request);
                setRequestUnread(response.total_unread);
            }
        });
        return () => { isMounted = false};
    },[]);
    
    return (
        <div className='message_scroll bg-gray-100 space-y-3 p-2 w-full' style={{display:(show?'block':'none')}}>
            {requests.length > 0?
                requests.map((request, index) => (
                    request.full_name.toLowerCase().includes(filter.toLowerCase()) &&
                    <PersonalRequest key={index} request={request} />
                ))
            :
            <p className='my-10'>No Request to show</p>
            }
        </div>
    )
}

