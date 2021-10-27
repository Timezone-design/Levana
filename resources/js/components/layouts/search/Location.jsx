import React, {useState} from 'react';
import {NativeSelect, Button} from '@mui/material';
import {CountryMenu} from '../../Constants';
import {useStyles} from '../../styles/Styles';
import AntSwitch from './AntSwitch';

export default function Bio() {
	const classes = useStyles();
	const [value, setValue] = useState(false);
	return (
		<div className='my-3 px-3 mx-auto space-y-3'>
			<NativeSelect classes={{root:classes.nativeSelect}}
				>
				<option value=''>Region (any)</option>
				{
					CountryMenu.map((item, index) => (
					<option value='item' key={index}>{item}</option>
				))}
		    </NativeSelect>
		    <NativeSelect classes={{root:classes.nativeSelect}}
				>
				<option value=''>Country(any/select region)</option>
				{
					CountryMenu.map((item, index) => (
					<option value='item' key={index}>{item}</option>
				))}
		    </NativeSelect>
		    <div className='w-full p-2 text-xs mx-auto bg-yellow-200 rounded-sm flex align-items-center justify-between'>
		    	By Post Code
		    	<div className='w-5/12'>
			    	<Button
		                variant='contained'
		                color='secondary'
		                size='small'
		            >
		            <span style={{fontSize:'9px'}}>Current Location</span>
		            </Button>
	            </div>
		    </div>
		    <div className='pb-1 text-left border-gray-400 border-b flex align-items-center justify-between'>
		    	Proximity Search
		    	<AntSwitch check={value} setChecked={setValue} />
		    </div>
		    <div className='pb-1 border-gray-400 border-b'>
				<input placeholder='Post Code Area (e.g.BN)' className='w-full focus:outline-none bg-transparent' type='text' /> 
			</div>
			<div className='pb-1 text-left'>
		    	Enter an area above		    	
		    </div>
		</div>
	)
}