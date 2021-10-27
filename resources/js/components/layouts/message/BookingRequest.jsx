import React, { useState, useEffect } from 'react';
import { Typography, Divider, InputBase, Badge, Button, Grid } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from '../../styles/Styles';
import { useHistory } from 'react-router';
import BookingRequestService from '../../services/BookingRequestService';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import NewBookingNotif from './NewBookingNotif';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { NotifAction } from "../../redux/actions/NotifAction";


export default function BookingRequest() {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const notif = useSelector(state => state.notif.notif);
    const [booking_update, setBooking_update] = useState(false);
    const [status_update, setStatus_update] = useState(false);
    const [books, setBooks] = useState([]);
    const [unread, setUnread] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [status, setStatus] = useState([]);
    const [update, setUpdate] = useState(false);
    const [userType, setUserType] = useState('');

    var accounttype = '';
    var authID = 0;

    const handleChange = (panel, index, id) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel + index : false);
        if (isExpanded && (unread[index] == 0)) {
            const booking_id = {
                'booking_id': id
            }
            BookingRequestService.updateUnreadBooking(booking_id)
                .then(result => {
                    dispatch(NotifAction(!notif));
                    setBooking_update(!booking_update);

                })

        }

    };


    const acceptBooking = (index, id, subStatus) => {
        const booking_id = {
            'booking_id': id
        }
        if (subStatus !== 1) {
            BookingRequestService.acceptBooking(booking_id);
        }
        setBooking_update(!booking_update);

    }

    const rejectBooking = (index, id, subStatus) => {
        const booking_id = {
            'booking_id': id
        }
        if (subStatus !== 2) {
            BookingRequestService.rejectBooking(booking_id);
        }
        setBooking_update(!booking_update);

    }

    const cancelBooking = (index, id, subStatus) => {
        const booking_id = {
            'booking_id': id
        }
        if (subStatus !== 3) {
            BookingRequestService.cancelBooking(booking_id);
        }
        setBooking_update(!booking_update);

    }

    useEffect(() => {

        BookingRequestService.getBooks()
            .then(result => {
                setBooks(result['books']);
                setUserType(result['accounttype']);
                setUnread(result['unread']);
                setStatus(result['status']);
                accounttype = result['accounttype'];
                authID = result['authID'];
            });

        let isPusher = true;
        // Pusher.logToConsole = true;
        const pusher = new Pusher('3901d394c4dc96fca656', {
            cluster: 'eu',
        });
        const channel = pusher.subscribe('levana-channel');

        channel.bind('levana-event', (data) => {
            console.log('new booking request');
            console.log(data);
            if ((data.trigger == 'new_booking') && (parseInt(data.escort_id) == authID) && isPusher) {
                console.log('getting new books');
                setBooking_update(!booking_update);

            }
            if ((data.trigger == 'update_booking_request') && isPusher) {
                console.log(authID, 'auth id');
                if ((authID == parseInt(data.escort_id) && parseInt(data.escort_unread) == 0) ||
                    (authID == parseInt(data.client_id) && parseInt(data.client_unread) == 0)) {
                    console.log('unread can be changed!');
                    setBooking_update(!booking_update);
                }
            }

        });
        return () => {
            isPusher = false;
        }
    }, [booking_update]);




    return (
        <>
            <div className={classes.search}>
                <SearchIcon classes={{ root: classes.svgIcon }} />
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <div className={'overflow-scroll space-y-2 mt-44 mb-16'} >
                {Array.isArray(books) && books.length ?
                    books.map((book, index) => (
                        < div key={index} >
                            <div className={classes.request} key={index} >
                                <Grid container className={'px-4 py-2 mt-2'}>
                                    <Grid item xs={4} >
                                        <Avatar
                                            src={"https://fluee123.host/" + book.avatarimage}
                                            className={classes.avat}
                                        />
                                    </Grid>
                                    <Grid item xs={4} >
                                        <p style={{ position: 'relative', bottom: '-40px', fontSize: '1.5rem' }}>{book.name}</p>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <NewBookingNotif client_id={book.client_id}
                                            escort_id={book.escort_id}
                                            userType={userType}
                                            childUnread={unread[index]}
                                            childStatus={status[index]}
                                        />

                                    </Grid>
                                </Grid>
                                <Accordion key={index} expanded={expanded === 'panel' + index} onChange={handleChange('panel', index, book.id)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography >Read More</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails classes={{ root: 'flex-column' }}>

                                        <Grid container spacing={2} justifyContent='space-between' fullwidth='true'>
                                            <Grid item xs={5} className={'border-b-2'}>
                                                <div className='flex flex-row justify-content-between'>
                                                    <Typography>Time:</Typography>
                                                    <div>   {moment(JSON.parse(book.booking_time)).format('hh')}
                                                        <span>:</span>
                                                        {moment(JSON.parse(book.booking_time)).format('mm')}
                                                        {(moment(JSON.parse(book.booking_time)).format('a') == 'am') ? ' AM' : ' PM'}
                                                    </div>
                                                </div>

                                            </Grid>
                                            <Grid item xs={5} className={'border-b-2'}>
                                                <div className='flex flex-row justify-content-between'>
                                                    <Typography>Duration:</Typography>
                                                    <Typography>{book.booking_duration}h</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={5} className={'border-b-2'}>
                                                <div className='flex flex-row justify-content-between'>
                                                    <Typography>Hotel:</Typography>
                                                    <Typography>{book.hotel}</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={5} className={'border-b-2'}>
                                                <div className='flex flex-row justify-content-between'>
                                                    <Typography>Room:</Typography>
                                                    <Typography>{book.room}</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} className={'border-b-2'}>
                                                <div className='flex flex-row justify-content-between'>
                                                    <Typography>Reserved Name:</Typography>
                                                    <Typography>{book.reserved_name}</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} className={'border-b-2'}>
                                                <div className='flex flex-row justify-content-between'>
                                                    <Typography>Email:</Typography>
                                                    <Typography>{book.client_email}</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} className={'border-b-2'}>
                                                <div className='flex flex-column justify-content-between'>
                                                    <Typography align='left'>Special Request:</Typography>
                                                    <Typography align='left'>{book.special}</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={5} className={'border-b-2'}>
                                                <div className='flex flex-row justify-content-between'>
                                                    <Typography>Type:</Typography>
                                                    <Typography>{book.booking_type}</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={5} className={'border-b-2'}>
                                                <div className='flex flex-row justify-content-between'>
                                                    <Typography>Price:</Typography>
                                                    <Typography>{book.booking_price}GBP</Typography>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={0} justifyContent='space-evenly' alignItems='center'
                                            className={'mt-4'}>
                                            {(userType == 'escort') ?
                                                <>
                                                    <Grid item xs={6} >
                                                        <Button
                                                            variant='contained'
                                                            color='secondary'
                                                            disabled={(status[index] == 3) ? true : false}
                                                            onClick={() => acceptBooking(index, book.id, status[index])}
                                                        >
                                                            Accept
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={5} >
                                                        <Button
                                                            variant='contained'
                                                            color='secondary'
                                                            disabled={(status[index] == 3) ? true : false}
                                                            onClick={() => rejectBooking(index, book.id, status[index])}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </Grid>
                                                </>
                                                :
                                                <>
                                                    <Grid item xs={4} >
                                                        <Button
                                                            variant='contained'
                                                            color='secondary'
                                                        >
                                                            Pay Now
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={7} >
                                                        <Button
                                                            variant='contained'
                                                            color='secondary'
                                                            onClick={() => cancelBooking(index, book.id, status[index])}
                                                        >
                                                            Cancel Booking
                                                        </Button>
                                                    </Grid>
                                                </>
                                            }
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    ))
                    :
                    <></>
                }
            </div>
        </>
    )
}
