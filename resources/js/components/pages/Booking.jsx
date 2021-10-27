import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookingHeader from "../layouts/booking/BookingHeader";
import Footer from "../layouts/booking/Footer";
import Step from "../layouts/booking/Step";
import Location from "../layouts/booking/Location";
import Time from "../layouts/booking/Time";
import Gender from "../layouts/booking/Gender";
import Duration from "../layouts/booking/Duration";
import Result from "../layouts/booking/Result";
import EscortView from "../layouts/booking/EscortView";
import Confirm from "../layouts/booking/Confirm";
import Notification from '../layouts/booking/Notification';

export default function Booking() {
    const index = useSelector(state => state.booking.index);
    const components = [Location, Gender, Time, Duration, Result, EscortView, Confirm];
    const Body = components[index];
    const dispatch = useDispatch();
    return (
        <>
            <BookingHeader />
            <Step />
            <Body />
            {(index < 6) && <Footer /> }
            {index < 4 &&
                <div className='fixed right-4 bottom-24'><Notification /></div>
            }
            {index == 4 &&
                <div className='fixed right-4 bottom-60'><Notification /></div>
            }
        </>
    )
}

