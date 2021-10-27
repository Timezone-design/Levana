import React from 'react';
import { Rating } from '@mui/material';
import {useStyles} from '../../styles/Styles';

export default function RatingMark(props) {
	const classes = useStyles();

	return (
		<div className='flex align-items-center justify-content-between'>
			<div className='rounded-md bg-yellow-500 text-white flex align-items-center justify-content-center' style={{width:'30px', height:'25px'}}>
				{props.rating}
			</div>
			<Rating name='rating_mark' max={1} value={parseInt(props.rating)} classes={{root:classes.ratingMark}} />
		</div>
	)
} 