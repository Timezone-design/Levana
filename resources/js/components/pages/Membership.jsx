import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {useStyles} from '../styles/Styles';
import Header from '../layouts/home/Header';
import BottomNav from '../layouts/home/BottomNav';
import { Button } from '@mui/material';
import {UpgradeMembership, CheckMembership} from '../services/MembershipService';

export default function Membership() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClick = async () => {
        await UpgradeMembership().then(response => {
            console.log(response);
        })
    }
    const [role, setRole] = useState(0);
    const [expire, setExpire] = useState('');
    const [expiration, setExpiration] = useState();

    useEffect(() => {
        CheckMembership().then(response => {
            console.log(response);
            setRole(response.role.role);
            setExpire(response.role.expiration_date);
            let expire_date = new Date(response.role.expiration_date);
            setExpiration(expire_date);
        });
    },[]);
    
    return(
        <>
            <Header headline='MEMBERSHIP'/>
                <div className='w-11/12 mx-auto my-10 space-y-4 font-default'>
                    <p className='text-xl text-yellow-500 font-semibold'>Buy Your Premium Plan.</p>
                    <p className='text-base '>
                    It's free for users to use the platform, 
                    however if the escorts want to be contacted by more than 3 clients per day 
                    they have to pay a premium price £29.99 per month for unlimited booking.
                    </p>
                </div>
                {expire?
                    ( Date.now() < expiration?.getTime()?
                    <p className='my-4 font-semibold text-base'>Your plan will be expired at {expire}</p>
                    :
                    <p className='my-4 font-semibold text-base'>Your plan has been expired.</p>
                    )
                    :
                    <p className='my-4 font-semibold text-base'>You are going on a free plan now.</p>
                }
                <div onClick={(e) => handleClick()}>
                    <Button variant='contained' color='secondary' size='middle' >Buy Now</Button>
                </div>
            <BottomNav />   
        </>
                       
        
    )
}
