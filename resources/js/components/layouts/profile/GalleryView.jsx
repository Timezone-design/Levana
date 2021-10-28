import React, { useState, useEffect, useRef} from 'react';
import {GetPortfolio} from '../../services/ProfileService';
import {useStyles} from '../../styles/Styles';
import {useDispatch, useSelector} from 'react-redux';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import CancelIcon from '@mui/icons-material/Cancel';


export default function Gallery(props) {
    const {viewID} = props;
    const classes = useStyles();
    const user_id = useSelector(state => state.user.id);
    const [freePhoto, setFreePhoto] = useState([]);
    const [freeVideo, setFreeVideo] = useState([]);
    const [pricePhoto, setPricePhoto] = useState([]);
    const [priceVideo, setPriceVideo] = useState([]);


    useEffect(() => {
    	const data = {
    		user_id:viewID
    	}
    	GetPortfolio(data)
    		.then(response => {
    			console.log(response.portfolio);
    			const port = response.portfolio;
    			const free_photo = port.filter(item => item.type == 'free_photo');
    			const free_video = port.filter(item => item.type == 'free_video');
    			const price_photo = port.filter(item => item.type == 'price_photo');
    			const price_video = port.filter(item => item.type == 'price_video');
    			setFreePhoto(free_photo);
    			setFreeVideo(free_video);
    			setPricePhoto(price_photo);
    			setPriceVideo(price_video);
    		});
    },[]);
    return (
        <>
	        <div className='flex align-items-center justify-content-between py-2'>
	        	<p className={classes.subTitle}>Photos</p>
	        </div>
	        <Swiper
                spaceBetween={5}
                slidesPerView={3}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                className={classes.swiperContainer}
            >
            {
            	freePhoto?.map((item, index) => (
	                <SwiperSlide key={index}>
	                   <img src={`${process.env.MIX_PUBLIC_URL}/${item.url}`} />
	                </SwiperSlide>

            	))
            }
            	<SwiperSlide>
                   <img src={`${process.env.MIX_PUBLIC_URL}/storage/default.jpg`}/>
                </SwiperSlide>
                <SwiperSlide>
                   <img src={`${process.env.MIX_PUBLIC_URL}/storage/default.jpg`}/>
                </SwiperSlide>
                <SwiperSlide>
                   <img src={`${process.env.MIX_PUBLIC_URL}/storage/default.jpg`}/>
                </SwiperSlide>
            </Swiper>
	        <div className='flex align-items-center justify-content-between py-2'>
	        	<p className={classes.subTitle}>Videos</p>
	        </div>
	        <Swiper
                spaceBetween={5}
                slidesPerView={3}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                className={classes.swiperContainer}
            >
            {
            	freeVideo?.map((item, index) => (
	                <SwiperSlide key={index}>
	                   <video src={`${process.env.MIX_PUBLIC_URL}/${item.url}`} autoPlay loop muted playinline='true' controls={false} />
	                </SwiperSlide>

            	))
            }
            	<SwiperSlide>
                   <img src={`${process.env.MIX_PUBLIC_URL}/storage/default.jpg`}/>
                </SwiperSlide>
                <SwiperSlide>
                   <img src={`${process.env.MIX_PUBLIC_URL}/storage/default.jpg`}/>
                </SwiperSlide>
                <SwiperSlide>
                   <img src={`${process.env.MIX_PUBLIC_URL}/storage/default.jpg`}/>
                </SwiperSlide>
            </Swiper>
    	    {user_id==viewID? 
                <>
                <div className='flex align-items-center justify-content-between py-2'>
    	        	<p className={classes.subTitle}>Private Photos</p>
    	        </div>
    	        <Swiper
                    spaceBetween={5}
                    slidesPerView={3}
                    navigation
                    onSwiper={(swiper) => console.log(swiper)}
                    className={classes.swiperContainer}
                >
                {
                	pricePhoto?.map((item, index) => (
    	                <SwiperSlide key={index}>
    	                   <img src={`${process.env.MIX_PUBLIC_URL}/${item.url}`} />
    	                </SwiperSlide>

                	))
                }
                	<SwiperSlide>
                       <img src={`${process.env.MIX_PUBLIC_URL}/storage/default.jpg`}/>
                    </SwiperSlide>
                    <SwiperSlide>
                       <img src={`${process.env.MIX_PUBLIC_URL}/storage/default.jpg`}/>
                    </SwiperSlide>
                    <SwiperSlide>
                       <img src={`${process.env.MIX_PUBLIC_URL}/storage/default.jpg`}/>
                    </SwiperSlide>
                </Swiper>
    	        <div className='flex align-items-center justify-content-between py-2'>
    	        	<p className={classes.subTitle}>Private Videos</p>
    	        </div>
    	        <Swiper
                    spaceBetween={5}
                    slidesPerView={3}
                    navigation
                    onSwiper={(swiper) => console.log(swiper)}
                    className={classes.swiperContainer}
                >
                {
                	priceVideo?.map((item, index) => (
    	                <SwiperSlide key={index}>
    	                   <video src={`${process.env.MIX_PUBLIC_URL}/${item.url}`} autoPlay loop muted playinline='true' controls={false} />
    	                </SwiperSlide>

                	))
                }
                	<SwiperSlide>
                       <img src={`${process.env.MIX_PUBLIC_URL}/storage/default.jpg`}/>
                    </SwiperSlide>
                    <SwiperSlide>
                       <img src={`${process.env.MIX_PUBLIC_URL}/storage/default.jpg`}/>
                    </SwiperSlide>
                    <SwiperSlide>
                       <img src={`${process.env.MIX_PUBLIC_URL}/storage/default.jpg`}/>
                    </SwiperSlide>
                </Swiper>
                </>
            :null
            }
        </>
    )
}
