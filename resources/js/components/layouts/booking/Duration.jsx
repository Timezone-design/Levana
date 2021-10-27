import React, { useState } from 'react';
import { Box, Slider, Grid} from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from '../../redux/ActionTypes';

const Duration = () => {
    const dispatch = useDispatch();
    const detail = useSelector(state => state.booking.detail);
        // console.log(detail);
    const [hour, setHour] = useState(detail.duration?detail.duration:1);

    const timeChange = (index) => {
        // console.log(index);
        if(index == 'plus') {
            setHour(hour + 1);
            let res = {
                id:'duration',
                value:hour + 1
            }
            dispatch({type: ActionTypes.UPDATE_BOOKING_DETAIL, res});
        }
        
        else if(index == 'minus' && hour > 0) {
            setHour(hour - 1);
            let res = {
                id:'duration',
                value:hour - 1
            }
            dispatch({type: ActionTypes.UPDATE_BOOKING_DETAIL, res});
        }
        
    }
    const onChangeHour = (val) => {
        setHour(val);
        let res = {
            id:'duration',
            value:val
        }
        dispatch({type: ActionTypes.UPDATE_BOOKING_DETAIL, res});
    }

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    padding: '30px'
                }}
            >
                <Slider
                    value={hour}
                    getAriaValueText={(value) => {}}
                    onChange={(e, val) => onChangeHour(val)}
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    min={1}
                    max={10}
                    valueLabelDisplay="on"
                    color='secondary'
                />
            </Box>
            <div className="w-8/12 mx-auto my-2">
                <Grid container justifyContent='space-between' alignItems='center' className='relative'>
                    <Grid item xs={5}>
                        <div id='hour' className="w-full px-2 py-2 rounded-md text-7xl text-gray-600">
                            {("0" + hour).slice(-2)}
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <span className="text-7xl text-gray-600">:</span>
                    </Grid>
                    <Grid item xs={5}>
                        <div id='minute' className="w-full px-2 py-2 rounded-md text-7xl text-gray-600">
                            00
                        </div>
                    </Grid>
                    <div className="absolute" style={{bottom:0, right:0, transform:'translateX(100%)'}}>
                        <div className="w-12 flex flex-col text-gray-600">
                            <div className="w-full">
                                <a className='text-decoration-none font-bold text-gray-600 cursor-pointer'>hr</a>
                            </div>
                        </div>
                    </div>
                </Grid>
            </div>
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
        </>
    )
}

export default Duration;
