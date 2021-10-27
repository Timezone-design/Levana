import React, { useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { CityMenu, CountryMenu } from '../../Constants';
import { useDispatch, useSelector } from 'react-redux';
import {useStyles} from '../../styles/Styles';
import * as ActionTypes from '../../redux/ActionTypes';


export default function Location() {
    
    const dispatch = useDispatch();
    const classes = useStyles();
    const detail = useSelector(state => state.booking.detail);
    const [selected, setSelected] = useState(false);
    const [subMenu, setSubMenu] = useState(CityMenu[0]);
    const [countrySelected, setCountrySelected] = useState(detail.country);
    const [citySelected, setCitySelected] = useState(detail.city);
    console.log(detail);
    const selectCountry = (item, index) => {
        setCountrySelected(item);
        setSubMenu(CityMenu[index]);
        setSelected(true);
        let res = {
            id:'country',
            value:item
        }
        dispatch({type: ActionTypes.UPDATE_BOOKING_DETAIL, res});
    }
    const selectCity = (item) => {
        setCitySelected(item);
        let res = {
            id:'city',
            value:item
        }
        dispatch({type: ActionTypes.UPDATE_BOOKING_DETAIL, res});
    }

    return (
        <>
            {(!selected) ?
                CountryMenu.map((item, index) => (
                <div key={index}>
                    <div className={'font-default location_item' + (item==countrySelected?' selected':'')} onClick={() => selectCountry(item, index)} >
                        <div className='location'>
                            {item}
                        </div>
                        <div className='icon'>
                            <KeyboardArrowRightIcon color="secondary"/>
                        </div>
                    </div>
                    <Divider/>
                </div>
                ))
                :
                subMenu.map((item, index) => (
                <div key={index}>
                    <div className={'font-default location_item' + (item==citySelected?' selected':'')} onClick={() => selectCity(item)} >
                        <div className='location'>
                            {item}
                        </div>
                        <div className='icon'>
                            <KeyboardArrowRightIcon color="secondary"/>
                        </div>
                    </div>
                    <Divider/>
                </div>
                ))
                
            }
        </>
    )
}
