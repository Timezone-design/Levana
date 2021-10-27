import React, { useState, useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NativeSelect from '@mui/material/NativeSelect';
import {useStyles} from '../../styles/Styles';

export default function ProfileSelect(props) {
	const {type, menu, initialValue, setValue} = props;

	const classes = useStyles();
	return (
		<div className='flex align-items-center bg-white border-gray-300 border rounded-xl w-full p-2 mb-2'>
			<div className=''>
				{	type=='country'?
					<LocationOnIcon/>
					:
					type=='city'?
					<LocationOnIcon/>
					:
					type=='ethnicity'?
					<GroupsIcon/>
					:
					<PersonIcon/>
				}
			</div>
			<div className='w-full flex justify-content-between'>
				<NativeSelect
			      value={initialValue?initialValue:''}
			      inputProps={{
			        name: type,
			        id: type,
			      }}
			      variant='standard'
			      classes={{root:classes.profileSelect}}
			      onChange={(e) => setValue(e.target.value)}
			    >
			    <option value=''>Select</option>
			    
			    {
			    	menu?.map((option, index) => (
			    		<option key={index} value={option}>{option}</option>
			    	))
				}
			    </NativeSelect>
			</div>
		</div>
	)
}