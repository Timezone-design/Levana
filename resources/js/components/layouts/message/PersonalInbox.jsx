import React, { useState, useEffect, useRef } from 'react';
import AvatarView from '../profile/AvatarView';
import Badge from '@mui/material/Badge';
import { useStyles } from '../../styles/Styles';
import Pusher from "pusher-js";
import {useDispatch, useSelector} from 'react-redux';
import {AddUnreadAction} from '../../redux/actions/UserAction';

export default function PersonalInbox(props) {
	const {inbox} = props;
	const classes = useStyles();
	const dispatch = useDispatch();
	const [lastMsg, setLastMsg] = useState(inbox.last_msg);
	const user_id = useSelector(state=>state.user.id);
	const account_type = useSelector(state=>state.user.account_type);
	// set oppnentID
	var opponentID = 0;
	if(account_type == 'client')
    	opponentID = inbox.escort_id;
    else 
    	opponentID = inbox.client_id;

	const [unread, setUnread] = useState(inbox.unread);
	// pusher event
	useEffect(() => {
        let isPusher = true;
        const pusher = new Pusher('3901d394c4dc96fca656', {
            cluster: 'eu',
        });
        const channel = pusher.subscribe('levana-channel');
        channel.bind('levana-event', (data) => {
            console.log('pusher');
            console.log(data);
            if (data.booking_id == inbox.id && data.receiver_id == user_id && data.sender_id == opponentID && isPusher) {
                setUnread(unread+1);
                let res = 1;
                dispatch(AddUnreadAction(res));

                if (data.content !== null)
                	setLastMsg(data.content);
            }
        });
        return () => {
            isPusher = false;
        }
    });

	return(
		<Badge badgeContent={unread} color="secondary" classes={{root:classes.badge}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
		>
			<div className='w-full flex align-items-center justify-around flex-column'>
				<AvatarView viewID={opponentID} />
				<h5 className='font-bold'>{inbox.full_name}</h5>
				<p className='message text-xs'>{lastMsg}</p>
			</div>
		</Badge>

	)
}