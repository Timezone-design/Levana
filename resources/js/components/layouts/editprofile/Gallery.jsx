import React, { useState, useEffect, useRef} from 'react';
import {GetPortfolio, DeleteMedia, UploadMedia} from '../../services/ProfileService';
import {useStyles} from '../../styles/Styles';
import {useDispatch, useSelector} from 'react-redux';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import ImageCropper from './ImageCropper';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ConfirmModal from '../../modal/ConfirmModal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function Gallery(props) {
    const {setLoad} = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const user_id = sessionStorage.getItem('user_id');
    const [freePhoto, setFreePhoto] = useState([]);
    const [freeVideo, setFreeVideo] = useState([]);
    const [pricePhoto, setPricePhoto] = useState([]);
    const [priceVideo, setPriceVideo] = useState([]);
    const [sourceimage, setSourceImage] = useState('');
    const [cropsource, setCropSource] = useState('');
    const [type, setType] = useState('');
    const [src, setSrc] = useState('');
    const price = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
    }
    const handlecancel = () => {
        setOpen(false);
    }
    const uploadMedia = (cropsource, type) => {
        setOpen(false); 
        if (cropsource) {
            setLoad(true);
            const data = {
                base64: cropsource,
                type: type,
                price: price.current?.value
            }
            UploadMedia(data)
                .then( response => {
                        console.log(response);
                        switch(type) {
							case 'free_photo':
								setFreePhoto([ response.portfolio, ...freePhoto]);
								break;
							case 'free_video':
								setFreeVideo([ response.portfolio, ...freeVideo]);
								break;
							case 'price_photo':
								setPricePhoto([ response.portfolio, ...pricePhoto]);
								break;
							case 'price_video':
								setPriceVideo([ response.portfolio, ...priceVideo]);
								break;
						}
                        setLoad(false);
                });
        }
    }

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (file) => {
          resolve(file.target.result)
        };
        reader.readAsDataURL(file);
        })

    const cropImage = (e) => {
    	setType(e.target.id);
        const file = e.target.files[0];
        fileToDataUri(file)
            .then(base64 => {
                setSourceImage(base64);
                setOpen(true);
            })
    }
    const uploadVideo = (e) => {
        setType(e.target.id);
        const file = e.target.files[0];
        fileToDataUri(file)
            .then(base64 => {
                if (e.target.id == 'free_video') {
                    uploadMedia(base64, 'free_video');
                }
                else {
                    setOpen(true);
                    setCropSource(base64);
                }
            });
    }

    const deleteMedia = () => {
        setModalOpen(false);
        setLoad(true);
    	let data = {
    		id:src.id
    	}
    	DeleteMedia(data)
    		.then(response => {
    			console.log(response);
    			switch(src.type) {
    				case 'free_photo':
    					let media1 = freePhoto.filter(item => item.id!==response.portfolio.id);
    					setFreePhoto(media1);
    					break;
    				case 'free_video':
    					let media2 = freeVideo.filter(item => item.id!==response.portfolio.id);
    					setFreeVideo(media2);
    					break;
    				case 'price_photo':
    					let media3 = pricePhoto.filter(item => item.id!==response.portfolio.id);
    					setPricePhoto(media3);
    					break;
    				case 'price_video':
    					let media4 = priceVideo.filter(item => item.id!==response.portfolio.id);
    					setPriceVideo(media4);
    					break;
    			}
                setLoad(false);
    			
    		});

    }
    const closeModal = () => {
    	setModalOpen(false);
    }
    const preDeleteAction = (item) => {
    	setModalOpen(true);
    	setSrc(item);
    }
    useEffect(() => {
    	const data = {
    		user_id:user_id
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
	        	<input accept="image/*" id="free_photo" type="file" hidden onChange={ (e) => cropImage(e) } />
                <label htmlFor="free_photo" className={classes.addIcon}>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <CloudUploadIcon color="secondary" />
                    </IconButton>
                </label>
	        </div>
	        <Swiper
                spaceBetween={5}
                slidesPerView={3}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={(e) => changeEscort(e)}
                className={classes.swiperContainer}
            >
            {
            	freePhoto?.map((item, index) => (
	                <SwiperSlide key={index}>
                       <img src={`${process.env.MIX_PUBLIC_URL}/${item.url}`} />
	                   <div className={classes.cancelIcon} onClick={() => preDeleteAction(item)}>
	                   	<CancelIcon color='secondary'/>
	                   </div>
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
	        	<input accept="video/*" id="free_video" type="file" hidden onChange={ (e) => uploadVideo(e) } />
                <label htmlFor="free_video" className={classes.addIcon}>
                    <IconButton color="primary" aria-label="upload video" component="span">
                        <CloudUploadIcon color="secondary" />
                    </IconButton>
                </label>
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
	                   <div className={classes.cancelIcon} onClick={() => preDeleteAction(item)}>
	                   	<CancelIcon color='secondary'/>
	                   </div>
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
	        	<p className={classes.subTitle}>Private Photos</p>
	        	<input accept="image/*" id="price_photo" type="file" hidden onChange={ (e) => cropImage(e) } />
                <label htmlFor="price_photo" className={classes.addIcon}>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <CloudUploadIcon color="secondary" />
                    </IconButton>
                </label>
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
	                   <div className={classes.cancelIcon} onClick={() => preDeleteAction(item)}>
	                   	<CancelIcon color='secondary'/>
	                   </div>
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
	        	<input accept="video/*" id="price_video" type="file" hidden onChange={ (e) => uploadVideo(e) } />
                <label htmlFor="price_video" className={classes.addIcon}>
                    <IconButton color="primary" aria-label="upload video" component="span">
                        <CloudUploadIcon color="secondary" />
                    </IconButton>
                </label>
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
	                   <div className={classes.cancelIcon} onClick={() => preDeleteAction(item)}>
	                   	<CancelIcon color='secondary'/>
	                   </div>
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
            <Dialog onClose={handleClose} open={open} maxWidth='lg' fullWidth={true}  >
	            {(type=='free_photo' || type=='price_photo') &&
                    <ImageCropper src={sourceimage} setCropSource={setCropSource}/>
	            }
                <div>
	            	{(type=='price_photo' || type == 'price_video') && 
                        <div className={'crop space-y-2 text-center'}>
	            		    {type=='price_photo'?
                                <p>Input the price for this Photo(GBP).</p>
                                :
                                <p>Input the price for this Video(GBP).</p>
                            }
	            		    <div className={ classes.subTitle+ ' flex align-items-center justify-content-center'}>
	            		 	     Price:<input ref={price} type='number' />
	            		    </div>
	            	    </div>
                    }
	                <div className='flex flex-row '>
		                <Button 
		                    variant="contained"
		                    size="small"
		                    color="secondary"
		                    startIcon={<SaveIcon />}
		                    onClick={() => {uploadMedia(cropsource, type)}}
		                    style={{width:'50%', justifyContent:'space-around'}}
		                >
		                    Save
		                </Button>
		                <Button 
		                    variant="contained"
		                    size="small"
		                    startIcon={<CancelIcon />}
		                    onClick={() => {handlecancel()}}
		                    style={{width:'50%', justifyContent:'space-around'}}
		                >
		                    Cancel
		                </Button>
	                </div>
	            </div>
	        </Dialog>
	        <ConfirmModal isOpen={modalOpen} cancelModal={closeModal} title='Are you sure to delete this image/video?'
	        			confirm={deleteMedia} 
	        />
	        
        </>
    )
}
