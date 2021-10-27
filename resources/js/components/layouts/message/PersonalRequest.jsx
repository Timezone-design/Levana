import React, { useState, useEffect, useRef } from 'react';
import {Badge, Button,Typography} from '@mui/material';
import { useStyles } from '../../styles/Styles';
import {useHistory} from 'react-router-dom';

export default function PersonalView(props) {
	const {request} = props;
	const classes = useStyles();
	const history = useHistory();
	const [lastMsg, setLastMsg] = useState(request.last_msg);


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
				<Button onClick={() => history.push(`/chat/${request.booking_id}`)} variant='contained' color='secondary' size='small'>Star Chat</Button>
			</div>
		</div>

	)
}