import React, { useState, useEffect, useRef } from 'react';
import AvatarView from '../profile/AvatarView';
import Badge from '@mui/material/Badge';
import { useStyles } from '../../styles/Styles';

export default function PersonalInbox(props) {
	const {inbox} = props;
	const classes = useStyles();
	const [lastMsg, setLastMsg] = useState(inbox.last_msg);


	return(
		<Badge badgeContent={4} color="secondary" classes={{root:classes.badge}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
		>
			<div className='w-full flex align-items-center justify-around flex-column'>
				<AvatarView viewID={inbox.user_id} />
				<h5 className='font-bold'>{inbox.full_name}</h5>
				<p className='message text-xs'>{lastMsg}</p>
			</div>
		</Badge>

	)
}