import React from 'react';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {useHistory} from 'react-router-dom' ;

export default function Header(props) {
	const history = useHistory();
	return(
		<div className={'w-full bg-yellow-500 flex align-items-end sticky p-2'} >
			<ChevronLeftIcon onClick={() => history.push('/home')} color='primary' />
            <Typography variant='h5' color="primary" align='left'>{props.headline}</Typography>
        </div>
	)
}
