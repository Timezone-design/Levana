import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Grid, Typography} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from '../../redux/ActionTypes';

export default function Time() {
    const dispatch = useDispatch();
    const detail = useSelector(state => state.booking.detail);
    const [datetime, setDatetime] = useState(detail.time);

    const timeChange = (index) => {
        if(index == 'plus') {
            var d = moment(datetime).add(10, 'm').toDate();
        } else if(index == 'minus') {
            var d = moment(datetime).subtract(10, 'm').toDate();
        }
        setDatetime(d);
        let res = {
            id:'time',
            value:d
        }
         dispatch({type: ActionTypes.UPDATE_BOOKING_DETAIL, res});
    }

    const selectAP = (index) => {
        document.getElementById('am').classList.remove('text-yellow-500');
        document.getElementById('pm').classList.remove('text-yellow-500');
        document.getElementById(index).classList.add('text-yellow-500');
        const d = moment(datetime).format('YYYY-MM-DD, h:mm:ss') + " " + index;
        // console.log(d);
        setDatetime(moment(d));
        let res = {
            id:'time',
            value:moment(d)
        }
         dispatch({type: ActionTypes.UPDATE_BOOKING_DETAIL, res});
    }

    return (
        <>
            <div className='mt-5'>
                <Typography color='secondary' variant="h6" className="font-bold text-center">Today</Typography>
                <div className="w-8/12 mx-auto my-5">
                    <Grid container justifyContent='space-between' alignItems='center' className='relative'>
                        <Grid item xs={5}>
                            <a>
                                <div id='hour' className="w-full px-2 py-2 bg-gray-200 rounded-md text-7xl text-gray-600">
                                    {moment(datetime).format('hh')}
                                </div>
                            </a>
                        </Grid>
                        <Grid item xs={1}>
                            <span className="text-7xl text-gray-600">:</span>
                        </Grid>
                        <Grid item xs={5}>
                            <a>
                                <div id='min' className="w-full px-2 py-2 bg-gray-200 rounded-md text-7xl text-gray-600">
                                    {moment(datetime).format('mm')}
                                </div>
                            </a>
                        </Grid>
                        <div className="absolute" style={{bottom:0, right:0, transform:'translateX(100%)'}}>
                            <div className="w-12 flex flex-col text-gray-600" id="selectAP">
                                <div className="w-full">
                                    <a className='text-decoration-none font-bold text-gray-600 cursor-pointer' onClick={() => selectAP('am')}>
                                        <span id="am" className={(moment(datetime).format('a') == 'am') ? 'text-yellow-500' : 'text-black'}>AM</span>
                                    </a>
                                </div>
                                <div className="w-full">
                                    <a className='text-decoration-none font-bold text-gray-600 cursor-pointer' onClick={() => selectAP('pm')} id="pm">
                                        <span id="pm" className={(moment(datetime).format('a') == 'pm') ? 'text-yellow-500' : 'text-black'}>PM</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </div>
                <Typography variant="h6" className="text-gray-400 text-center">(approx. {moment(datetime).fromNow(true)} from now)</Typography>
                <Grid container justifyContent='space-between' style={{width: '40%'}} className="mx-auto h-16 my-8">
                    <Grid item xs={5} className="rounded-md border border-gray-600 border-4">
                        <a onClick={() => timeChange('minus')}>
                            <div className="w-full h-full flex align-items-center justify-content-center">
                                <p className="text-4xl my-0">-</p>
                            </div>
                        </a>
                    </Grid>
                    <Grid item xs={5} className="rounded-md border border-gray-600 border-4">
                        <a onClick={() => timeChange('plus')}>
                            <div className="w-full h-full flex align-items-center justify-content-center">
                                <p className="text-4xl my-0">+</p>
                            </div>
                        </a>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

