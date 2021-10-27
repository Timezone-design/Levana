import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import AvatarView from '../layouts/profile/AvatarView';
import BottomNav from '../layouts/home/BottomNav';
import {useStyles} from '../styles/Styles';
import {GetProfile, UpdateProfile} from '../services/ProfileService';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import LoadingSignModal from '../modal/LoadingSignModal';
import Header from '../layouts/home/Header';
import {GetUserInfo} from '../services/AccountService';

import WcIcon from '@mui/icons-material/Wc';

export default function Home() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    // const [load, setLoad] = useState(true);
    const [fullName, setFullName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [id, setID] = useState('');
    const user_id = sessionStorage.getItem('user_id');
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        let isMounted = true;
        GetUserInfo().then(response => {
            if (isMounted) {
                let user_id = response.user_info.id;
                sessionStorage.setItem('user_id', user_id);
                sessionStorage.setItem('account_type', response.user_info.account_type);
                setUpdate(!update);
            }
        });
        return () => { isMounted = false};
    },[]);
    useEffect(() => {
        let isMounted = true;
        if (user_id) {
            let data = {
                user_id:user_id
            }
            GetProfile(data)
                .then(response => {
                    if (isMounted) {
                        console.log('profile data', response);
                        setFullName(response.full_name);
                        setCountry(response.profile.country);
                        setCity(response.profile.city);
                        // setLoad(false);
                    }
                })
                .catch(error => console.log(error));
        }
        return () => { isMounted = false};
    },[user_id]);

    return(
        <>
           {/* <LoadingSignModal isOpen={load} />*/}
            <Header headline='DASHBOARD'/>
            <div className='m-4'>
                <AvatarView viewID={user_id} />
                <p className={classes.subTitle}>{fullName?fullName:'Your Name'}</p>
                <p style={{color:'#818181'}} >{city?city:'Unkown'}, {country?country:'Unknown'}</p>

            </div>
            <div className='dashboard_container w-11/12 mx-auto my-4 rounded-xl bg-gray-200 p-2 flex flex-wrap'>
                <div className='dashboard_item' onClick={(e) => history.push(`/profile/${user_id}`)} >
                    <div className='icon_container'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z"/></svg>
                    </div>
                    <div className='title_container'>
                        <p className='dash_title'>My Profile</p>
                    </div>

                </div>
                <div className='dashboard_item' onClick={(e) => history.push('/editprofile')} >
                    <div className='icon_container'>
                        <img src='data:image/png;base64,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'/>
                    </div>
                    <div className='title_container'>
                        <p className='dash_title'>Edit Profile</p>
                    </div>

                </div>
                <div className='dashboard_item' onClick={(e) => history.push('/message')} >
                    <div className='icon_container'>
                        <MailOutlineIcon/>
                    </div>
                    <div className='title_container'>
                        <p className='dash_title'>Inbox</p>
                    </div>
                </div>
                <div className='dashboard_item' onClick={(e) => history.push('/booking')} >
                    <div className='icon_container'>
                        <WcIcon/>
                    </div>
                    <div className='title_container'>
                        <p className='dash_title'>Booking</p>
                    </div>

                </div>
                <div className='dashboard_item' onClick={(e) => history.push('/favorite')} >
                    <div className='icon_container'>
                        <FavoriteBorderIcon/>
                    </div>
                    <div className='title_container'>
                        <p className='dash_title'>Favorite</p>
                    </div>

                </div>
                <div className='dashboard_item' onClick={(e) => history.push('/membership')} >
                    <div className='icon_container'>
                        <CardMembershipIcon/>
                    </div>
                    <div className='title_container'>
                        <p className='dash_title'>Plan</p>
                    </div>

                </div>
            </div>
            <BottomNav />
        </>
                       
        
    )
}
