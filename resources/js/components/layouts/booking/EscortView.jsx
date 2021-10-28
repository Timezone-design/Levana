import React, { useEffect, useState } from 'react';
import { Button,Chip} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import {GetProfile} from '../../services/ProfileService';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../../styles/Styles';
import { useHistory } from "react-router-dom";
import PortFolioView from '../../layouts/booking/PortFolioView';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import * as ActionTypes from '../../redux/ActionTypes';
import RatingMark from '../../layouts/profile/RatingMark';

export default function EscortView(props) {
    const {setLoad} = props;
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const detail = useSelector(state => state.booking.detail);
    const [fullName, setFullName] = useState('');
    const [profile, setProfile] = useState({});
    const [services, setServices] = useState([]);
    const [rating, setRating] = useState('');

    useEffect(() => {
        let isMounted = true;
        const data = {
            user_id:detail.id
        }
        setLoad(true);
        GetProfile(data)
            .then(response => {
                if (isMounted) {
                    setLoad(false);
                    setProfile(response.profile);
                    setFullName(response.full_name);
                    setRating(response.rating);
                    let services = response.profile.services;
                    if (services) setServices(JSON.parse(services));
                    else setServices([]);
                    let price_list = '';
                    let incall_price = response.profile.incall_price;
                    let outcall_price = response.profile.outcall_price;

                    if (detail.type == 'incall') {
                        if (typeof(incall_price)=='object') {
                            price_list = incall_price;
                        }
                        else {
                            price_list = JSON.parse(incall_price);
                        }
                    }
                    else {
                        if (typeof(outcall_price)=='object') {
                            price_list = outcall_price;
                        }
                        else {
                            price_list = JSON.parse(outcall_price);
                        }
                    }
                    //changing price part temporally
                    let res = {
                        id:'price',
                        value:price_list.d * detail.duration,
                    }
                    dispatch({type:ActionTypes.UPDATE_BOOKING_DETAIL, res});
                }
            });
        return () => { isMounted = false };
    },[]);    

    return (
        <>
            <LoadingSignModal isOpen={load} />
            <PortFolioView viewID={detail.id} />
            <div className='w-full px-2 mx-auto space-y-3 m-3'>
                <Button
                    variant="contained"
                    fullWidth={true}
                    color="primary"
                    size="large"
                    onClick={() => history.push('https://facebook.com')}
                    endIcon={<ShareIcon/>}
                >Share {detail.full_name} Profile
                </Button>
                <Button
                    variant="contained"
                    fullWidth={true}
                    color="secondary"
                    size="large"
                    onClick={() => history.push('/chat')}
                    endIcon={<QuestionAnswerIcon />}
                >Chat with {detail.full_name} 
                </Button>
            </div>
            <div className='w-full px-2 mx-auto space-y-4 mb-16'>
                <div className='flex align-items-center justify-content-between border-b-2 pb-1'>
                    <div className='text-base font-default'>
                        Country
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {profile.country?profile.country:'Unknown'}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2 pb-1'>
                    <div className='text-base font-default'>
                        City
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {profile.city?profile.city:'Unknown'}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2 pb-1'>
                    <div className='text-base font-default'>
                        Rating
                    </div>
                    <div className='font-semibold text-base font-default'>
                        <RatingMark rating={rating} />
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2 pb-1'>
                    <div className='text-base font-default'>
                        Age
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {profile.age}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2 pb-1'>
                    <div className='text-base font-default'>
                        Ethnicity
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {profile.ethnicity?profile.ethnicity:'Unknown'}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2 pb-1'>
                    <div className='text-base font-default'>
                        Height
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {profile.height?profile.height:'Unknown'}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2 pb-1'>
                    <div className='text-base font-default'>
                        Dress Size
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {profile.dress?profile.dress:'Unknown'}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2 pb-1'>
                    <div className='text-base font-default'>
                        Cup Size
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {profile.bust?profile.bust:'Unknown'}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2 pb-1'>
                    <div className='text-base font-default'>
                        Hair Color
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {profile.hair_color?profile.hair_color:'Unknown'}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2 pb-1'>
                    <div className='text-base font-default'>
                        Eye Color
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {profile.eye_color?profile.eye_color:'Unknown'}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2 pb-1'>
                    <div className='text-base font-default'>
                        Public Hair
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {profile.public_hair?profile.public_hair:'Unknown'}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2 pb-1'>
                    <div className='text-base font-default'>
                        Services
                    </div>
                    <div className='p-1 font-semibold text-base font-default flex justify-evenly flex-wrap'>
                        {
                            services?.map((item, index) => (
                                <Chip classes={{root:classes.chip}} key={index} label={item} />
                            ))
                        }
                    </div>
                </div>
                {/*<div id='table' className=' p-2 text-base font-default flex align-items-center justify-content-between'>
                    <div className='list space-y-2'>
                        <p>Rates</p>
                        <p>15 mins</p>
                        <p>1/2 Hour</p>
                        <p>3/4 Hour</p>
                        <p>1 Hour</p>
                        <p>1.5 Hours</p>
                        <p>2 Hours</p>
                        <p>3 Hours</p>
                        <p>4 Hours</p>
                        <p>Overnight</p>
                    </div>
                    <div className='price space-y-2'>
                        <p>Incall(GBP)</p>
                        {
                            Object.entries(inCallPrice).map((key, value) => (
                                <p key={key}>{value}</p>
                            ))
                        }
                    </div>
                    <div className='price space-y-2'>
                        <p>Outcall(GBP)</p>
                        {
                            Object.entries(outCallPrice).map((key, value) => (
                                <p key={key}>{value}</p>
                            ))
                        }
                    </div>
                </div>*/}
                <p className='mb-1 text-left font-semibold'>Payment Method</p>
                <p className='text-left text-sm m-0'>
                    Payments to be made within 10 minutes of arrival in local currency.
                    Have to transfer $50 extra for grab before i leave for your location using whatever methods supported by us both.
                </p>
                <p className='mb-1 text-left font-semibold'>Cancellation Policy</p>
                <p className='text-left text-sm m-0' >Cancellation on arrival 50 SGD.</p>
                <div>
                    <p className='font-default text-left font-semibold text-base'>About Me</p>
                    <p style={{border:'1px solid gray'}} className='font-default w-full h-40  text-left rounded-xl p-2'>{profile.bio}</p>
                </div>
                <p className='font-default text-left font-semibold text-base'>Reviews</p>
                <div className='mt-2 mx-auto w-full'>
                    <div className='border-yellow-500  text-left w-full px-4 py-3 rounded-xl bg-yellow-100 space-y-3 border-2 border-solid'>
                        <p>Reviews are only available for premium members.</p>
                        <p>
                            <a className='text-red-500 border-b border-red-500' href="/login">Login</a>
                            <span className='mx-2'>or</span>
                            <a className='text-red-500 border-b border-red-500' href="/register">Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}


