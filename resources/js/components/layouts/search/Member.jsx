import React, {useState} from 'react';
import WcIcon from '@mui/icons-material/Wc';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CameraIcon from '@mui/icons-material/Camera';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useStyles} from '../../styles/Styles';
import NativeSelect from '@mui/material/NativeSelect';

export default function Member() {
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	return (
		<>
			<div className='w-full flex align-items-center px-1'>
				<div className='member align-items-center flex flex-column p-2 bg-yellow-500 text-white w-3/12' style={{borderRadius:'10px 0 0 0'}}>
					<WcIcon color='primary' />Escort
				</div>
				<div className='member align-items-center flex flex-column p-2 bg-yellow-500 text-white w-3/12'>
					<CameraIcon color='primary'/>Webcam
				</div>
				<div className='member align-items-center flex flex-column p-2 bg-yellow-500 text-white w-3/12'>
					<PhoneIphoneIcon color='primary'/>Phone Chat
				</div>
				<div className='member align-items-center flex flex-column p-2 bg-yellow-500 text-white w-3/12' style={{borderRadius:'0 10px 0 0'}}>
					<LocationOnIcon color='primary'/>Location
				</div>
			</div>
			<div className='space-y-3 p-2'>
				<NativeSelect classes={{root:classes.nativeSelect}}
					>
					<option value=''>Region (any)</option>
					<option value='Male'>Male</option>
					<option value='Female'>Female</option>
			    </NativeSelect>
				<div className='py-1 w-9/12 mx-auto' style={{display:open?'block':'none'}}>
					<div className='flex align-items-center'><input type='checkbox' value='Male' />Male</div>
					<div className='flex align-items-center'><input type='checkbox' value='Female' />Female</div>
					{/*<input type='checkbox' >Transexual</input>*/}
				</div>
				<div className='py-1 w-full border-b-2 flex align-items-center'>
					<input type='checkbox' />
					<p>Available Now/Today</p>
				</div>
				<div className='py-1 w-full flex align-items-center justify-content-between'>
					<div className='flex align-items-center'>
						<input type='checkbox' />
						<p>Logged In Now</p>
					</div>
					<div className='w-3/12 p-1 rounded-md bg-white' style={{boxShadow:'0 0 5px 0px grey'}}>Subscribe</div>
				</div>
			</div>
		</>
	)
}