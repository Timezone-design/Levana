import React, { useState, useEffect } from 'react';
import Cover from '../layouts/editprofile/Cover';
import EditableAvatar from '../layouts/editprofile/EditableAvatar';
import ProfileInput from '../layouts/editprofile/ProfileInput';
import ProfileSelect from '../layouts/editprofile/ProfileSelect';
import MultipleSelect from '../layouts/editprofile/MultipleSelect';
import PriceTable from '../layouts/editprofile/PriceTable';
import Gallery from '../layouts/editprofile/Gallery';
import {useDispatch, useSelector} from 'react-redux';
import {GetProfile, UpdateProfile} from '../services/ProfileService';
import Button from '@mui/material/Button';
import {useStyles} from '../styles/Styles';
import LoadingSignModal from '../modal/LoadingSignModal';
import Header from '../layouts/home/Header';

import {CountryMenu, CityMenu, EthnicityMenu, DressMenu, BustMenu, HeightMenu,
 HaircolorMenu, EyecolorMenu, PublichairMenu, ServiceMenu, Prices, PriceKeys } from '../Constants';

export default function EditProfile() {
    const classes = useStyles();
    const [profile, setProfile] = useState({});
    const [full_name, setFullName] = useState('');
    const user_id = sessionStorage.getItem('user_id');
    const account_type = sessionStorage.getItem('account_type');
    const [index, setIndex] = useState(0);
    const [load, setLoad] = useState(true);
    const updateProfile = async () => {
        let data = {
            full_name:full_name,
            profile:profile
        }
        await UpdateProfile(data)
            .then(response => window.location.href=`/profile/${user_id}` );
    }
    const changeCountry = (id, value) => {
        let index = CountryMenu.map(item => item).indexOf(value);
        setIndex(index);
        changeProfile(id, value);
    }
    const changeProfile = (id, value) => {
        setProfile({ 
            ...profile,
            [id]:value
        });
    }
    useEffect(() => {
        let isMounted = true;
        const data = {
            user_id:user_id
        }
        GetProfile(data)
            .then(response => {
                console.log('profile data', response);
                if(isMounted) {
                    setFullName(response.full_name);
                    setProfile(response.profile);
                    let index = CountryMenu.map(item => item).indexOf(response.profile.country);
                    setIndex(index);
                    setLoad(false);
                }
            })
            .catch(error => console.log(error));
        return () => { isMounted = false};
    },[]);

    return (
        <>
            <Header headline='EDIT PROFILE'/>
            <div className='relative'>
                <Cover viewID={user_id}/>
            </div>
            <div className='avatar_container'>
                <EditableAvatar viewID={user_id} />
            </div>
            <p style={{fontSize: '1rem',fontWeight: 700,}}>{full_name}</p>
            <div className='px-2 text-left mb-14'>
                <p>Username</p>
                <ProfileInput type='name' initialValue={full_name} setValue={setFullName} />
                <p>Country</p>            
                <ProfileSelect type='country' menu={CountryMenu} initialValue={profile.country} setValue={(value) => changeCountry('country',value)} />
                <p>City</p>            
                <ProfileSelect type='city' menu={CityMenu[index]} initialValue={profile.city} setValue={(value) => changeProfile('city', value)} />
                <p>Age</p>            
                <ProfileInput type='age' initialValue={profile.age} setValue={(value) => changeProfile('age', value)} />
                {account_type=='escort' &&
                    <>
                    <p>Ethnicity</p>            
                    <ProfileSelect type='ethnicity' menu={EthnicityMenu} initialValue={profile.ethnicity} setValue={(value) => changeProfile('ethnicity', value)} />
                    <p>Height</p>            
                    <ProfileSelect type='height' menu={HeightMenu} initialValue={profile.height} setValue={(value) => changeProfile('height', value)} />
                    <p>Dress Size</p>            
                    <ProfileSelect type='dress' menu={DressMenu} initialValue={profile.dress} setValue={(value) => changeProfile('dress', value)} />
                    <p>Cup Size</p>            
                    <ProfileSelect type='bust' menu={BustMenu} initialValue={profile.bust} setValue={(value) => changeProfile('bust', value)} />
                    <p>Hair Color</p>            
                    <ProfileSelect type='hair_color' menu={HaircolorMenu} initialValue={profile.hair_color} setValue={(value) => changeProfile('hair_color', value)} />
                    <p>Eye Color</p>            
                    <ProfileSelect type='eye_color' menu={EyecolorMenu} initialValue={profile.eye_color} setValue={(value) => changeProfile('eye_color', value)} />
                    <p>Public Hair</p>            
                    <ProfileSelect type='public_hair' menu={PublichairMenu} initialValue={profile.public_hair} setValue={(value) => changeProfile('public_hair', value)} />
                    <p>Services</p>     
                    <MultipleSelect type='services' menu={ServiceMenu} initialValue={profile.services} setValue={(value) => changeProfile('services', value)} />       
                    <div className='flex align-items-center justify-content-between'>
                        <div className='space-y-2 '>
                            <p style={{ fontSize: '1rem',fontWeight:700,}}>Rates</p>
                            <p style={{height:'24px'}}>15 mins</p>
                            <p style={{height:'24px'}}>1/2 hour</p>
                            <p style={{height:'24px'}}>3/4 hour</p>
                            <p style={{height:'24px'}}>1 hour</p>
                            <p style={{height:'24px'}}>1.5 hours</p>
                            <p style={{height:'24px'}}>2 hours</p>
                            <p style={{height:'24px'}}>3 hours</p>
                            <p style={{height:'24px'}}>4 hours</p>
                            <p style={{height:'24px'}}>Overnight</p>
                        </div>
                        <PriceTable type='incall' initialValue={profile.incall_price} setValue={(value) => changeProfile('incall_price', value) } />
                        <PriceTable type='outcall' initialValue={profile.outcall_price} setValue={(value) => changeProfile('outcall_price', value) } />
                    </div>
                    </>
                }
                    <p className={classes.subTitle}>About Me</p>
                    <div style={{position:'relative', paddingBottom:'20px'}}>
                        <textarea id="bio" className={classes.bioContainer} value={profile.bio?profile.bio:''} maxLength='140' onChange={(e) => changeProfile('bio', e.target.value)}/>
                        <div style={{position:'absolute', bottom:0, right:0}}>{profile.bio?.length}/140</div>
                    </div>
                {account_type=='escort' &&
                    <Gallery setLoad={setLoad}/>
                }
            </div>

            <div className={'w-full mx-auto bg-white fixed flex items-center justify-center zIndex-100 bottom-0 h-6'} style={{zIndex:'100',bottom:'0',height:'3rem'}}>
                <Button
                    onClick={() => {updateProfile()}}
                    variant="contained"
                    color="secondary"
                    disableElevation
                    size="large"
                    classes={{root:classes.button}}
                >
                    Save
                </Button>
            </div>
            <LoadingSignModal isOpen={load} />
        </>
    )
}
