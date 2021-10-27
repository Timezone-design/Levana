import React, { useEffect, useState } from 'react';
import {useStyles} from '../../styles/Styles';
import {GetPortfolio} from '../../services/ProfileService';
import {ImageList, ImageListItem,ImageListItemBar } from '@mui/material';

export default function PortFolioView(props) {

	const {viewID} = props;
	const classes = useStyles();
	const [freePhoto, setFreePhoto] = useState([]);
    const [freeVideo, setFreeVideo] = useState([]);
    const [pricePhoto, setPricePhoto] = useState([]);
    const [priceVideo, setPriceVideo] = useState([]);
    
    useEffect(() => {
    	let isMounted = true;
    	if (viewID) {
    		const data = {
	    		user_id:viewID
	    	}
    		GetPortfolio(data)
    			.then(response => {
    				const port = response.portfolio;
	    			const free_photo = port.filter(item => item.type == 'free_photo');
	    			const free_video = port.filter(item => item.type == 'free_video');
	    			const price_photo = port.filter(item => item.type == 'price_photo');
	    			const price_video = port.filter(item => item.type == 'price_video');
	    			if (isMounted) {
		    			setFreePhoto(free_photo);
		    			setFreeVideo(free_video);
		    			setPricePhoto(price_photo);
		    			setPriceVideo(price_video);
	    			}
    			});
    	}
    	return () => {isMounted = false};
    },[viewID]);

    return (
    	<>
	    	<ImageList classes={{root:classes.imageList}} gap={5} cols={2} rowHeight={150}>
		      {freePhoto.map((item, index) => (
			        <ImageListItem key={index}>
			          	<img src={`${process.env.MIX_PUBLIC_URL}/${item.url}`} />
			        </ImageListItem>
		      ))}
		      {pricePhoto.map((item, index) => (
			        <ImageListItem key={index} >
			          	<img src={`${process.env.MIX_PUBLIC_URL}/${item.url}`} />
			          	<ImageListItemBar
				            title={item.price?(item.price+'GBP'):''}
				        />
			        </ImageListItem>
		      ))}
		      {freeVideo.map((item, index) => (
			        <ImageListItem key={index} >
	                    <video src={`${process.env.MIX_PUBLIC_URL}/${item.url}`} autoPlay loop muted playinline='true' controls={false} />
			        </ImageListItem>
		      ))}
		      {priceVideo.map((item, index) => (
			        <ImageListItem key={index} >
	                    <video src={`${process.env.MIX_PUBLIC_URL}/${item.url}`} autoPlay loop muted playinline='true' controls={false} />
			        	<ImageListItemBar
				            title={item.price + 'GBP'}
				        />
			        </ImageListItem>
		      ))}
		    </ImageList>
		    <div className='mx-auto px-2 w-full'>
			    <div className='border-yellow-500  text-left w-full px-4 py-3 rounded-xl bg-yellow-100 space-y-3 border-2 border-solid'>
			    	<p>See photos/age verification, only available for premium members.</p>
			    	<p>
			    		<a className='text-red-500 border-b border-red-500' href="/login">Login</a>
			    		<span className='mx-2'>or</span>
			    		<a className='text-red-500 border-b border-red-500' href="/register">Sign Up</a>
			    	</p>
			    </div>
		    </div>
	    </>
    )
    	
}
