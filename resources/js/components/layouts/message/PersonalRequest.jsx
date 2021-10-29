import React, { useState, useEffect, useRef } from 'react';
import {Badge, Button,Typography} from '@mui/material';
import { useStyles } from '../../styles/Styles';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {UpdateBooking} from '../../services/BookingService';
import Pusher from "pusher-js";
import * as ActionTypes from '../../redux/ActionTypes';

export default function PersonalView(props) {
	const {request} = props;
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const user_id = useSelector(state=>state.user.id);
	const account_type = useSelector(state=>state.user.account_type);
	// set opponentID
	var opponentID = 0;
	if(account_type == 'client')
    	opponentID = request.escort_id;
    else 
    	opponentID = request.client_id;

	const [lastMsg, setLastMsg] = useState(request.last_msg);
	const handleClick = (request) => {
		if ( !request.booking_read ){
			var data;
			if (account_type == 'escort') 
				data = {
					id:request.id,
					escort_read:true,
				}
			else 
				data = {
					id:request.id,
					client_read:true,
				}
			UpdateBooking(data).then(response => {
				console.log(response);
				let res = {
					count:1
				}
				dispatch({type:ActionTypes.DISCOUNT_UNREAD, res});

			})
		}
		history.push(`/chat/${request.id}`);
	}
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
            if (data.booking_id == request.id && data.receiver_id == user_id && data.sender_id == opponentID && isPusher) {
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
		<div className='bg-white justify-content-between flex align-items-center w-full p-2 rounded-xl h-40'>
			<img className='border w-5/12 rounded-xl h-full ' src={`${process.env.MIX_PUBLIC_URL}/${request.avatar}`}  alt='booking' />
			<div className='text-left h-full p-1 w-7/12' style={{fontSize:"0.7rem"}}>
				<p className='font-bold' style={{fontSize:'0.8rem'}} >{request.full_name}</p>
				<p>{lastMsg}</p>
				<p>Date: 30 Sep 2021 | Time: 03:00 PM</p>
				<p>Duration: {request.duration} Hours</p>
				<div className='flex align-items-center w-full h-10 space-x-1 p-1'>
					<img className='border w-3/12 h-full' src='' />
					<img className='border w-3/12 h-full' src='' />
					<img className='border w-3/12 h-full' src='' />
				</div>
				<Button onClick={() => handleClick(request)} variant='contained' color='secondary' size='small'>Star Chat</Button>
			</div>
		</div>

	)
}