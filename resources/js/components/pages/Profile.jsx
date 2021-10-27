import React, { useState, useEffect } from 'react';
import GalleryView from '../layouts/profile/GalleryView';
import AvatarView from '../layouts/profile/AvatarView';
import RatingMark from '../layouts/profile/RatingMark';
import Cover from '../layouts/editprofile/Cover';
import Button from '@mui/material/Button';
import {GetProfile} from '../services/ProfileService';
import {useHistory, useParams} from "react-router-dom";
import {useStyles} from '../styles/Styles';
import LoadingSignModal from '../modal/LoadingSignModal';
import Chip from '@mui/material/Chip';
import Header from '../layouts/home/Header';

export default function Profile(props) {
    const { viewID } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const [fullName, setFullName] = useState('');
    const [profile, setProfile] = useState({});
    const [inCallPrice, setIncallPrice] = useState({});
    const [outCallPrice, setOutCallPrice] = useState({});
    const [services, setServices] = useState([]);
    const [load, setLoad] = useState(true);
    const account_type = sessionStorage.getItem('account_type');
    const user_id = sessionStorage.getItem('user_id');
    const [rating, setRating] = useState(5);
    
    const handleClick = () => {
        if (viewID == user_id) {
            history.push('/editprofile');
        }
        else history.push(`/collaborate/${viewID}`);
    }

    useEffect(() => {
        let isMounted = true;
        const data = {
            user_id:viewID
        }
        GetProfile(data)
            .then(response => {
                console.log(response);
                if (isMounted) {
                    setFullName(response.full_name);
                    setRating(response.rating);
                    setProfile(response.profile);
                    let incall = response.profile.incall_price;
                    if (incall) setIncallPrice(JSON.parse(incall));
                    else setIncallPrice({});

                    let outcall = response.profile.outcall_price;
                    if (outcall) setOutCallPrice(JSON.parse(outcall));
                    else setOutCallPrice({});

                    let services = response.profile.services;
                    if (services) setServices(JSON.parse(services));
                    else setServices([]);

                    setLoad(false);
                }
            });
        return () => {isMounted = false};
    }, []);

    return (
        <>
            <LoadingSignModal isOpen={load} />
            <Header headline='PROFILE'/>
            <div className='relative'>
                <Cover viewID={viewID}/>
            </div>
            <div className='avatar_container'>
                <AvatarView viewID={viewID} />
            </div>
            <div className='w-full px-2 mx-auto space-y-4 mb-14'>
                <div className='flex align-items-center justify-content-between border-b-2'>
                    <div className='text-base font-default'>
                        Full Name
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {fullName}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2'>
                    <div className='text-base font-default'>
                        Country
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {profile.country?profile.country:'Unknown'}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2'>
                    <div className='text-base font-default'>
                        City
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {profile.city?profile.city:'Unknown'}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2'>
                    <div className='text-base font-default'>
                        Age
                    </div>
                    <div className='font-semibold text-base font-default'>
                        {profile.age}
                    </div>
                </div>
                <div className='flex align-items-center justify-content-between border-b-2'>
                    <div className='text-base font-default'>
                        Rating
                    </div>
                    <div className='font-semibold text-base font-default'>
                        <RatingMark rating={rating} />
                    </div>
                </div>
                {account_type=='escort' &&
                    <>
                        <div className='flex align-items-center justify-content-between border-b-2'>
                            <div className='text-base font-default'>
                                Ethnicity
                            </div>
                            <div className='font-semibold text-base font-default'>
                                {profile.ethnicity?profile.ethnicity:'Unknown'}
                            </div>
                        </div>
                        <div className='flex align-items-center justify-content-between border-b-2'>
                            <div className='text-base font-default'>
                                Height
                            </div>
                            <div className='font-semibold text-base font-default'>
                                {profile.height?profile.height:'Unknown'}
                            </div>
                        </div>
                        <div className='flex align-items-center justify-content-between border-b-2'>
                            <div className='text-base font-default'>
                                Dress Size
                            </div>
                            <div className='font-semibold text-base font-default'>
                                {profile.dress?profile.dress:'Unknown'}
                            </div>
                        </div>
                        <div className='flex align-items-center justify-content-between border-b-2'>
                            <div className='text-base font-default'>
                                Cup Size
                            </div>
                            <div className='font-semibold text-base font-default'>
                                {profile.bust?profile.bust:'Unknown'}
                            </div>
                        </div>
                        <div className='flex align-items-center justify-content-between border-b-2'>
                            <div className='text-base font-default'>
                                Hair Color
                            </div>
                            <div className='font-semibold text-base font-default'>
                                {profile.hair_color?profile.hair_color:'Unknown'}
                            </div>
                        </div>
                        <div className='flex align-items-center justify-content-between border-b-2'>
                            <div className='text-base font-default'>
                                Eye Color
                            </div>
                            <div className='font-semibold text-base font-default'>
                                {profile.eye_color?profile.eye_color:'Unknown'}
                            </div>
                        </div>
                        <div className='flex align-items-center justify-content-between border-b-2'>
                            <div className='text-base font-default'>
                                Public Hair
                            </div>
                            <div className='font-semibold text-base font-default'>
                                {profile.public_hair?profile.public_hair:'Unknown'}
                            </div>
                        </div>
                        <div className='flex align-items-center justify-content-between border-b-2'>
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
                        <div id='table' className=' p-2 text-base font-default flex align-items-center justify-content-between'>
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
                                <p>{inCallPrice.a?inCallPrice.a:0}</p>
                                <p>{inCallPrice.b?inCallPrice.b:0}</p>
                                <p>{inCallPrice.c?inCallPrice.c:0}</p>
                                <p>{inCallPrice.d?inCallPrice.d:0}</p>
                                <p>{inCallPrice.e?inCallPrice.e:0}</p>
                                <p>{inCallPrice.f?inCallPrice.f:0}</p>
                                <p>{inCallPrice.g?inCallPrice.g:0}</p>
                                <p>{inCallPrice.h?inCallPrice.h:0}</p>
                                <p>{inCallPrice.i?inCallPrice.i:0}</p>
                            </div>
                            <div className='price space-y-2'>
                                <p>Outcall(GBP)</p>
                                <p>{outCallPrice.a?outCallPrice.a:0}</p>
                                <p>{outCallPrice.b?outCallPrice.b:0}</p>
                                <p>{outCallPrice.c?outCallPrice.c:0}</p>
                                <p>{outCallPrice.d?outCallPrice.d:0}</p>
                                <p>{outCallPrice.e?outCallPrice.e:0}</p>
                                <p>{outCallPrice.f?outCallPrice.f:0}</p>
                                <p>{outCallPrice.g?outCallPrice.g:0}</p>
                                <p>{outCallPrice.h?outCallPrice.h:0}</p>
                                <p>{outCallPrice.i?outCallPrice.i:0}</p>
                            </div>
                        </div>
                    </>
                }
                <p className='font-default text-left font-semibold text-base'>About Me</p>
                <p style={{border:'1px solid gray'}} className='font-default w-full h-40  text-left rounded-xl p-2'>{profile.bio}</p>
                {account_type=='escort' &&
                    <GalleryView viewID={user_id} />
                }
            </div>
            <div className={'w-full mx-auto bg-white fixed flex items-center justify-center '} style={{zIndex:'100',bottom:'0',height:'3rem',}}>
                <Button
                    variant="contained" fullWidth={true}
                    color="secondary"
                    disableElevation
                    size="large"
                    onClick={() => handleClick()}
                    classes={{root:classes.button}}

                ><span className={'base font-semibold'}>{viewID==user_id?'Edit':`Book ${fullName} Now`}</span>
                </Button>
            </div>
        </>
    )
}
