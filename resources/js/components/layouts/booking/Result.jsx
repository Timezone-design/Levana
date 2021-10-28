import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { SearchByFilter } from '../../services/SearchService';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from '../../redux/ActionTypes';
import {useHistory} from "react-router-dom";
import {useStyles} from '../../styles/Styles';
import RatingMark from '../../layouts/profile/RatingMark';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
SwiperCore.use([Navigation]);
import { BiTargetLock } from "react-icons/bi";

export default function Result(props) {
    const {setLoad} = props;
    const detail = useSelector(state => state.booking.detail);
    const [escorts, setEscorts] = useState([]);
    const [origin, setOrigin] = useState([]);
    const [index, setIndex] = useState(0);
    const [tab, setTab] = useState(0);
    const [update, setUpdate] = useState(false);
    const handleTabChange = (newTab) => {
        setTab(newTab);
        if (newTab ==2) {
            let filtered = escorts;
            filtered = filtered.filter(item => item.is_favorite == true);
            setEscorts(filtered);
        }
        else setEscorts(origin);
    }
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const changeIndex = (e) => {
        if (escorts.length > 0) {
            let newIndex = e.activeIndex;
            setIndex(newIndex);
            setUpdate(!update);
            let res = [
                {
                    id:'id',
                    value:escorts[newIndex].user_id
                },
                {
                    id:'full_name',
                    value:escorts[newIndex].full_name
                },
                {
                    id:'name',
                    value:escorts[newIndex].name
                }
            ];
            dispatch({type:ActionTypes.UPDATE_BOOKING_DETAIL, res});
        }
    }

    useEffect(() => {
        let isMounted = true;
        setLoad(true);
        SearchByFilter(detail)
            .then(response => {
                if(isMounted && response.escorts.length > 0) {
                    setEscorts(response.escorts);
                    setOrigin(response.escorts);
                    let res = [
                        {
                            id:'id',
                            value:response.escorts[0].user_id
                        },
                        {
                            id:'count',
                            value:response.escorts.length
                        },
                        {
                            id:'full_name',
                            value:response.escorts[0].full_name
                        },
                        {
                            id:'name',
                            value:response.escorts[0].name
                        }
                    ];
                    dispatch({type:ActionTypes.UPDATE_BOOKING_DETAIL, res});
                }   
                else {
                    let res = {
                        id:'count',
                        value:0
                    }
                    dispatch({type:ActionTypes.UPDATE_BOOKING_DETAIL, res});
                } 
                setLoad(false);
            });
        return () => { isMounted = false};
    },[]);

    return (
        <>
            <div className='font-default'>
                <div className='w-full flex flex-row align-items-center justify-content-between py-2 bg-gray-100'>
                    <div className='text-sm w-8/12 h-8 flex align-items-center justify-content-between'>
                        <div onClick={() => handleTabChange(1)} className={'tab flex align-items-center justify-evenly w-3/12 py-1 '+ (tab==1?'selected':'') }>Online</div>
                        <div onClick={() => handleTabChange(2)} className={'tab flex align-items-center justify-evenly w-4/12 py-1 '+ (tab==2?'selected':'') }>Favorites
                            <FavoriteBorderIcon color={tab==2?'secondary':''} />
                        </div>
                        <div onClick={() => handleTabChange(3)} className={'tab flex align-items-center justify-evenly w-4/12 py-1 '+ (tab==3?'selected':'') }>Videos
                            <PlayCircleOutlineIcon color={tab==3?'secondary':''} />
                        </div>
                    </div>
                    <div className='w-3/12 h-10 flex align-items-center '>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            startIcon={<FilterAltIcon />}
                        >
                        Filter
                        </Button>
                    </div>
                </div>
                {/*<p>Intro Photo/Video</p>*/}
                <div className='slide w-full my-4 px-1 rounded-xl border'>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={(e) => changeIndex(e)}
                    >
                    {escorts?.map((escort, index) => (
                            <SwiperSlide key={index}>
                                {
                                    tab==3?
                                    <video src={`${process.env.MIX_PUBLIC_URL}/${escort.intro_video}`} autoPlay loop muted playinline='true' controls={false} />
                                    :
                                    <img src={`${process.env.MIX_PUBLIC_URL}/${escort.intro_photo}`} alt={escort.full_name}/>
                                }
                            </SwiperSlide>
                    ))}
                    </Swiper>
                </div>
                <div className='w-full flex py-1 px-2 justify-content-between'>
                    <div className='flex align-items-center'>
                        <p className='text-base font-semibold'>{escorts[index]?.full_name}</p>
                        <p style={{fontSize:'0.8rem'}}>({escorts[index]?.age} years old)</p>
                    </div>
                    <div>
                        <RatingMark rating={escorts[index]?.rating?escorts[index].rating:5}/>
                    </div>
                </div>
                <div style={{fontSize:'14px'}} className='font-semibold w-full flex py-1 px-2 align-items-start'>
                    <div>{escorts[index]?.height?escorts[index].height:'Height'}, {escorts[index]?.bust?escorts[index].bust:'Cup Size'}</div>
                </div>
                <div className='w-full flex py-1 px-2 justify-content-between'> 
                    <div className='flex align-items-center justify-content-center'>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            startIcon={<QuestionAnswerIcon/>}
                        >
                        Chat
                        </Button>
                        <div />
                    </div>
                    <div className='calc_distance flex align-items-center'>
                        <BiTargetLock />Calculate Distance
                    </div>
                </div>
            </div>
        </>
    )
}


