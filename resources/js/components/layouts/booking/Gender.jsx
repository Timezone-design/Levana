import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from '../../redux/ActionTypes';

export default function Gender() {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false);
    const detail = useSelector(state => state.booking.detail);
        // console.log(detail);
    const [type, setType] = useState('');
    const [gender, setGender] = useState('');
    const onChangeValue = (gender) => {
        setSelected(true);
        let res = {
            id:'gender',
            value:gender
        }
        dispatch({type: ActionTypes.UPDATE_BOOKING_DETAIL, res});
    }
    const onChangeType = (newType) => {
        setType(newType);
        let res = {
            id:'type',
            value:newType
        }
        dispatch({type: ActionTypes.UPDATE_BOOKING_DETAIL, res});
    }
    

    return (
        (!selected) ?
        <div className='w-11/12 mx-auto'>
            <div className="my-3">
                <Button
                    variant="contained"
                    color={ (gender=="Male") ? "secondary" : "primary" }
                    className="w-full"
                    onClick={() => onChangeValue('Male')}
                >
                    MALE
                </Button>
            </div>
            <div className="my-3">
                <Button
                    variant="contained"
                    color={ (gender=="Female") ? "secondary" : "primary" }
                    className="w-full"
                    onClick={() => onChangeValue('Female')}
                >
                    FEMALE
                </Button>
            </div>
            <div className="my-3">
                <Button
                    variant="contained"
                    color={ (gender=="Transsexual") ? "secondary" : "primary" }
                    className="w-full"
                    onClick={() => onChangeValue('Transsexual')}
                >
                    TRANSSEXUAL
                </Button>
            </div>
        </div>
        :
        <div className='w-11/12 mx-auto'>
            <div className="my-3">
                <Button
                    variant="contained"
                    color={ (type=="outcall") ? "secondary" : "primary" }
                    className="w-full"
                    onClick={() => onChangeType('outcall')}
                >
                    <span>OUTCALL <small>(She comes to you)</small></span>
                </Button>
            </div>
            <div className="my-3">
                <Button
                    variant="contained"
                    color={ (type=="incall") ? "secondary" : "primary" }
                    className="w-full"
                    onClick={() => onChangeType('incall')}
                >
                    <span>INCALL <small>(You go to her)</small></span>
                </Button>
            </div>
        </div>
    )
}


