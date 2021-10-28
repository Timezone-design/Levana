import React, { useState, useEffect } from 'react';
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
import Notif from '../layouts/booking/Notif';
import LoadingSignModal from '../modal/LoadingSignModal';


export default function Booking() {
    const [load, setLoad] = useState(false);
    const index = useSelector(state => state.booking.index);
    const components = [Location, Gender, Time, Duration, Result, EscortView, Confirm];
    const Body = components[index];
    console.log('index', index, 'index');
    return (
        <>
            <LoadingSignModal isOpen={load} />
            <BookingHeader />
            <Step />
            <Body setLoad={setLoad} />    
            {index < 6 && <Footer /> }
            {index < 4 &&
                <div className='z-10 fixed right-4 bottom-24'><Notif /></div>
            }
            {index == 4 &&
                <div className='z-10 fixed right-4 bottom-60'><Notif /></div>
            }
        </>
    )
}

