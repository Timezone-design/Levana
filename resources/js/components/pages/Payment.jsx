import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {useStyles} from '../styles/Styles';
import Header from '../layouts/home/Header';
import BottomNav from '../layouts/home/BottomNav';
import { Button } from '@mui/material';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../layouts/payment/CheckoutForm";

export default function Payment() {

    const stripePromise = loadStripe("pk_test_51JoURaB9uTLMERq5GfgDJfw07LGehU942dHma92At6A3JBQZqQt4rBZnBiIwvnFwGdeCfss8McTXyRmgvkvm28Ol0074MSQ9cB");

    return(
        <>
            <Header headline='SUBMIT PAYMENT'/>
            <div className='w-11/12 mx-auto my-4 space-y-3 font-default'>
                <img
                    src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress"
                    alt="laptop"
                    style={{ width: "100%", height: "auto" }}
                />
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
            <BottomNav />
        </>
                       
        
    )
}
