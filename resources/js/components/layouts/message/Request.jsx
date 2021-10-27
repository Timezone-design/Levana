import React, { useState, useEffect, useRef } from 'react'
import { useStyles } from '../../styles/Styles';
import PersonalRequest from './PersonalRequest';
import {GetRequest} from '../../services/RequestService';

export default function Request(props) {

    const {filter, show} = props;
    const classes = useStyles();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        GetRequest().then(response => {
            console.log(response);
            setRequests(response.request);
        })
    },[]);
    
    return (
        <div className='message_scroll bg-gray-100 space-y-3 p-2 w-full' style={{display:(show?'block':'none')}}>
            {
                requests.map((request, index) => (
                    request.full_name.toLowerCase().includes(filter.toLowerCase()) &&
                    <PersonalRequest key={index} request={request} />
                ))
            }
        </div>
    )
}

