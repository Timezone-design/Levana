import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Divider} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {useStyles} from '../styles/Styles';
import Header from '../layouts/home/Header';
import Member from '../layouts/search/Member';
import Option from '../layouts/search/Option';
import Bio from '../layouts/search/Bio';
import Location from '../layouts/search/Location';
import * as ActionTypes from '../redux/ActionTypes';
import { SearchByFilter } from '../services/SearchService';
import BottomNav from '../layouts/home/BottomNav';




export default function Search() {

	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const [tabIndex, setTabIndex] = useState(0);
	const [open, setOpen] = useState(false);
	const filter = useSelector(state => state.search.filter);
	const searchEscorts = () => {

		SearchByFilter(filter)
            .then(response => {
                console.log(response);
            });
	}
	const handleClick = (index) => {
		if(index < 3) 
			setTabIndex(index + 1);
		else 
			setTabIndex(0);
	}

	return (
		<>
			<Header headline='SEARCH' />
			<div className=' font-default w-11/12 my-12 mx-auto pb-4 rounded-xl' style={{boxShadow:'0 0 5px 0px grey'}}>
				<div className='text-xs flex align-items-center p-1 mb-1'>
					<div onClick={() => setTabIndex(0)} 
						className={tabIndex==0?'p-2 bg-yellow-500 text-white w-3/12':'p-2 bg-gray-200 w-3/12'} style={{borderRadius:'10px 0 0 0'}}>Member
					</div>
					<div onClick={() => setTabIndex(1)} 
						className={tabIndex==1?'p-2 bg-yellow-500 text-white w-3/12':'p-2 bg-gray-200 w-3/12'}>Option
					</div>
					<div onClick={() => setTabIndex(2)} 
						className={tabIndex==2?'p-2 bg-yellow-500 text-white w-3/12':'p-2 bg-gray-200 w-3/12'}>Bio
					</div>
					<div onClick={() => setTabIndex(3)} 
						className={tabIndex==3?'p-2 bg-yellow-500 text-white w-3/12':'p-2 bg-gray-200 w-3/12'} style={{borderRadius:'0 10px 0 0'}}>Location
					</div>
				</div>
				{tabIndex==0 &&
					<Member />
				}
				{tabIndex==1 &&
					<Option />
				}
				{tabIndex==2 &&
					<Bio />
				}
				{tabIndex==3 &&
					<Location />
				}
				<button onClick={() => handleClick(tabIndex)} 
					className='rounded mx-auto w-3/12 bg-gray-400 text-white p-1'>Next</button>
			</div>
			{tabIndex<3 &&
				<Button
	                variant='contained'
	                color='secondary'
	                size='large'
	                onClick={() => searchEscorts()}
	            >
	            SEARCH
	            </Button>
        	}
        	<BottomNav/>
		</>


	)
}

