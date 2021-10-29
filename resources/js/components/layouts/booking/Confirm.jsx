import React, { useEffect, useState, useRef } from 'react';
import { AppBar, Divider, Link, Grid, Button, Toolbar,Typography, Box} from '@mui/material';
import { useStyles } from '../../styles/Styles';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { BookingBackAction, } from "../../redux/actions/BookingActions";
import {SendBookingRequest} from '../../services/BookingService';
import {GetProfileImages} from '../../services/ProfileService';
import AlertModal from '../../modal/AlertModal';
import * as ActionTypes from '../../redux/ActionTypes';



export default function Confirm(props) {
    const {setLoad} = props;
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const detail = useSelector(state => state.booking.detail);
    const index = useSelector(state => state.booking.index);
    const user_id = useSelector(state => state.user.id);
    const [avatar, setAvatar] = useState('');
    const name = useRef(null);
    const email = useRef(null);
    const hotel = useRef(null);
    const room = useRef(null);
    const special = useRef(null);

    const [alert, setAlert] = useState(false);
    const [title, setTitle] = useState('');
    const closeAlert = () => {
        if (title =='Booking Successfully Completed!') {
            const res = {
                'index': 0
            };
            dispatch({type: ActionTypes.BOOKING_NEXT, res});
            history.push('/booking');
        }
        else setAlert(false);
        
    }
    const closeConfirm = () => {
        setAlert(false);
        history.push('/booking');
    }


    useEffect(() => {
        let isMounted = true;
        if (detail.id) {
            const data = {
                user_id:detail.id
            }
            setLoad(true);
            GetProfileImages(data)
                .then(response => {
                    if(isMounted) {
                        setAvatar(response.images.avatar);
                        setLoad(false);
                    }
                });
        }        
        return () => { isMounted = false};
    },[detail.id]);
    
    const sendBookingRequest = async () => {
        const data = {
            'client_id':user_id,
            'escort_id':detail.id,
            'time':detail.time,
            'duration':detail.duration,
            'name':name.current.value,
            'email':email.current.value,
            'hotel':hotel.current.value,
            'room':room.current.value,
            'special':special.current.value,
            'type':detail.type,
            'price':50,
        }
        console.log('sending info', data);
        Object.entries(data).map(([key, value]) => {
            if (value==null || value==undefined || value=='') {
                setTitle('Fill in the booking form correctly!');
                setAlert(true);
                return;
            }
            return null;
        })
        await SendBookingRequest(data)
            .then(response => {
                setTitle('Booking Successfully Completed!');
                setAlert(true);
                console.log(response);

            });
        
    }

    return (
        <>  
            <AlertModal isOpen={alert} cancelModal={closeAlert} title={title}/>
            <div className='font-default w-full mx-auto px-2 space-y-4 text-left'>
                <div className='my-2 w-full bg-yellow-100 flex align-items-center justify-start p-2 rounded-xl'>
                    <div className='w-4/12 rounded-xl border-yellow-500 border-2 h-24 mr-2'>
                        <img className='w-full h-full rounded-xl' src={`${process.env.MIX_PUBLIC_URL}/${avatar}`} alt='avatar' />
                    </div>
                    <div>
                        <div className={'flex align-items-center'}>
                            <p className='font-semibold'>{detail.full_name}</p>
                            <p className='text-sm'>({detail.gender})</p>
                        </div>
                        <div>   {moment(detail.time).format('hh')}
                            <span>:</span>
                            {moment(detail.time).format('mm')}
                            {(moment(detail.time).format('a') == 'am') ? ' AM' : ' PM'}
                        </div>
                        <p>{detail.duration}h</p>
                    </div>
                </div>
                <div className='space-y-1'>
                    <p className='font-semibold '>NAME</p>
                    <input ref={name}
                        className='px-3 py-1 rounded-lg w-full' 
                        style={{ boxShadow: '0 0px 3px 0px grey', }}
                        placeholder='e.g.John Doe'
                        />
                    <i className='text-sm'>Your name as per your hotel reservation.</i>
                </div>
                <div className='space-y-1'>
                    <p className='font-semibold '>EMAIL</p>
                    <input ref={email} 
                        type="email"
                        className='px-3 py-1 rounded-lg w-full' 
                        style={{ boxShadow: '0 0px 3px 0px grey', }}
                        placeholder='e.g.johndoe@321gmail.com'
                        />
                </div>
                <div className='space-y-1'>
                    <p className='font-semibold '>HOTEL OR CONDO</p>
                    <input ref={hotel}
                        className='px-3 py-1 rounded-lg w-full' 
                        style={{ boxShadow: '0 0px 3px 0px grey', }}
                        placeholder='...'
                         />
                </div>
                <div className='space-y-1'>
                    <p className='font-semibold '>ROOM NUMBER</p>
                    <input ref={room}
                        className='px-3 py-1 rounded-lg w-full' 
                        style={{ boxShadow: '0 0px 3px 0px grey', }}
                        placeholder='e.g.147A'
                        />
                    <i className='text-sm'>John Doe will meet you directly in your room.</i>
                </div>
                <div className='space-y-1'>
                    <p className='font-semibold '>SEPCIAL REQUESTS</p>
                    <input ref={special}
                        className='px-3 py-1 rounded-lg w-full' 
                        style={{ boxShadow: '0 0px 3px 0px grey', }}
                        placeholder='e.g.Special uniform,...'
                         />
                </div>
                <Divider />
                <div className='font-base flex align-items-center justify-content-between'>
                    <div className='space-y-1 text-left'>
                        <span>{detail.full_name}</span><span>({detail.duration}h)</span>
                        <p className='text-yellow-500'>Discount</p>
                        <p className='font-semibold'>Total</p>
                    </div>
                    <div className='flex flex-column space-y-1 align-items-center'>
                        <p>{detail.price}GBP</p>
                        <p className='text-yellow-500'>-5GBP</p>
                        <p className='font-semibold'>{ detail.price }GBP</p>
                    </div>
                    <div>
                        <p className='text-yellow-500 border-b-2 border-yellow-500'>
                            <Link href='#' color='secondary' underline='always'>Buy Premium</Link>
                        </p>
                    </div>
                </div>
                <Divider />
                <p className='text-sm' style={{marginBottom:'4rem'}}>By confirming this booking you are agreeing to our
                    <Link href='#' color='secondary' underline='always'
                    > Terms & Conditions.
                    </Link>
                </p>
            </div>
            <AppBar position='fixed' style={{ bottom: 0, top: 'inherit' }} elevation={4}>
                <Toolbar>
                    <Grid container spacing={0} justifyContent='space-evenly' alignItems='center'>
                        <Grid item xs={4}>
                            <Button
                                variant='contained'
                                style={{ width: '100%' }}
                                onClick={() => dispatch(BookingBackAction(index))}
                            >
                                CANCEL
                            </Button>
                        </Grid>
                        <Grid item xs={7}>
                            <Button
                                variant='contained'
                                color='secondary'
                                style={{ width: '100%' }}
                                onClick={() => sendBookingRequest()}
                            >
                                CONFIRM BOOKING
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    )
}