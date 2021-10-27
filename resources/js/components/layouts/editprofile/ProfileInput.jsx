import React, { useState, useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {useStyles} from '../../styles/Styles';

export default function ProfileInput(props) {
	const {type, initialValue, setValue} = props;
	const classes = useStyles();
	return (
		<div className='flex align-items-center bg-white border-gray-300 border rounded-xl w-full p-2 mb-2'>
			<div className=''>
				{type=='name'?
					<PersonIcon/>
					:
					<CalendarTodayIcon/>
				}
			</div>
			<div className='w-full flex justify-content-between'>
				{type=='age'?
					<input className={classes.profileInput} placeholder='Input your age' defaultValue={initialValue==0?null:initialValue} onChange={(e) => setValue(e.target.value)} className='px-2 outline-none w-9/12 text-black text-sm' type='number' step='1' min='0' max='100' />
					:
					<input className={classes.profileInput} defaultValue={initialValue} onChange={(e) => setValue(e.target.value)} className='px-2 outline-none w-full text-black text-sm'/>

				}
				{type=='age'?
					<div>Years Old</div>
					:
					null
				}
			</div>
		</div>
	)
}