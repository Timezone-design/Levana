import React, {useState, useRef} from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import {CountryMenu, BustMenu, EthnicityMenu, DressMenu} from '../../Constants';
import {useStyles} from '../../styles/Styles';
import * as ActionTypes from '../../redux/ActionTypes';
import { useDispatch } from 'react-redux';

export default function Bio() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const min_age = useRef(null);
	const max_age = useRef(null);
	const country = useRef(null);
	const ethnicity = useRef(null);
	const dress = useRef(null);
	const bust = useRef(null);
	
	const handleChange = (e) => {
		let res = {
			id:e.target.id,
			value:e.target.value
		}
		dispatch({type:ActionTypes.UPDATE_BOOKING_DETAIL, res});
	}

	return (
		<div className='my-3 px-3 mx-auto space-y-3'>
			<div className='pb-1 border-gray-400 border-b flex align-items-center justify-between'>
				<div className='text-xs flex align-items-center w-4/12 mr-1'>Age(min)
				<input id='min_age' ref={min_age} onChange = {(e) => handleChange(e)}
					min='0' max='100'
					className='w-full focus:outline-none p-1 mx-1' type='number' /> </div>
				to
				<div className='text-xs flex align-items-center w-4/12 ml-1'>Age(max)
				<input id='max_age' ref={max_age} onChange = {(e) => handleChange(e)}
					min='0' max='100'
					className='w-full focus:outline-none p-1 mx-1' type='number'  /> 
				</div>
				y/o
			</div>
			<NativeSelect classes={{root:classes.nativeSelect}} id='country' ref={country}
							onChange = {(e) => handleChange(e)}
				>
				<option value=''>Orientation (any)</option>
				{
					CountryMenu.map((item, index) => (
					<option value={item} key={index}>{item}</option>
				))}
		    </NativeSelect>
		    <NativeSelect classes={{root:classes.nativeSelect}} id='ethnicity' ref={ethnicity}
		    				onChange = {(e) => handleChange(e)}
				>
				<option value=''>Ethnicity (any)</option>
				{
					EthnicityMenu.map((item, index) => (
					<option value={item} key={index}>{item}</option>
				))}
		    </NativeSelect>
		    <NativeSelect classes={{root:classes.nativeSelect}} id='dress' ref={dress}
		    				onChange = {(e) => handleChange(e)}
				>
				<option value=''>Dress Size (any)</option>
				{
					DressMenu.map((item, index) => (
					<option value={item} key={index}>{item}</option>
				))}
		    </NativeSelect>
		    <NativeSelect classes={{root:classes.nativeSelect}} id='bust' ref={bust}
		    				onChange = {(e) => handleChange(e)}
				>
				<option value=''>Bust Size (any)</option>
				{
					BustMenu.map((item, index) => (
					<option value={item} key={index}>{item}</option>
				))}
		    </NativeSelect>
		</div>
	)
}