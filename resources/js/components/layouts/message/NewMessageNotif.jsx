import React, { useState, useEffect } from 'react';
import { Badge } from '@material-ui/core';
import Pusher from "pusher-js";
import AccountService from '../../services/AccountService';

export default function NewMessageNotif(props) {

    const [update, setUpdate] = useState(false);
    console.log('props', props);
    const { user1_id, user2_id } = props;
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (user1_id !== 0 && user2_id !== 0) {
            console.log('sending request for count', user1_id, user2_id);
            const users = {
                'user1': user1_id,
                'user2': user2_id
            }
            AccountService.getMessgeCount(users)
                .then(result => {
                    console.log('getmessagecount', result);
                    setCount(result);
                });
        }


        let isPusher = true;
        // Pusher.logToConsole = true;
        const pusher = new Pusher('3901d394c4dc96fca656', {
            cluster: 'eu',
        });
        const channel = pusher.subscribe('levana-channel');

        channel.bind('levana-event', (data) => {
            console.log(data);
            if ((data.trigger == 'send_message') && isPusher) {
                console.log('updating count', data.sender_id, user2_id, data.receiver_id, user1_id);

                if (parseInt(data.sender_id) == user2_id && parseInt(data.receiver_id) == user1_id) {
                    console.log('updating hng');
                    setUpdate(!update);
                }
            }
        });
        return () => {
            isPusher = false;
        }
    }, [update, props]);

    return (

        <Badge anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
            color='secondary'
            badgeContent={count}
        >
            <span></span>
        </Badge>

    )
}














