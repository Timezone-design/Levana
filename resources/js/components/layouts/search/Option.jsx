import React, {useState} from 'react';
import * as ActionTypes from '../../redux/ActionTypes';
import { useDispatch, useSelector } from 'react-redux';

export default function Member() {
	const dispatch = useDispatch();
	const changeFilter = (e) => {

	}
	return (
		<div className='my-3 px-2 mx-auto space-y-3'>
			<div className='pb-1 border-b-2 flex align-items-center justify-start'>
				<input type='checkbox' value='has_video' onChange={() => changeFilter()}/> Has Movie Clips
			</div>
			<div className='pb-1 border-b-2 flex align-items-center justify-start'>
				<input type='checkbox' value='has_free_gallery' onChange={() => changeFilter()}/> Has Free Gallery
			</div>
			<div className='pb-1 border-b-2 flex align-items-center justify-start'>
				<input type='checkbox' value='has_private_gallery' onChange={() => changeFilter()}/> Has Private Gallerys
			</div>
			<div className='pb-1 border-b-2 flex align-items-center justify-start'>
				<input type='checkbox' value='has_intro_movie' onChange={() => changeFilter()}/> Has Intro Movie
			</div>
			<div className='pb-1 border-b-2 flex align-items-center justify-start'>
				<input type='checkbox' value='has_rating' onChange={() => changeFilter()}/> Has Viewable Ratings	
			</div>
			<div className='py-1 mt-3 bg-white text-gray-500 rounded-sm w-5/12' style={{fontSize:'12px',boxShadow:'0 0 5px 0px grey'}}>
			Search by Nick Name</div>
		</div>
	)
}