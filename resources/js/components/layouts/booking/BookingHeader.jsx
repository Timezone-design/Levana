import React,{useEffect} from 'react';
import { CssBaseline, AppBar, Grid, Button, Toolbar,Typography,IconButton, Box} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useStyles} from '../../styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as ActionTypes from '../../redux/ActionTypes';

export default function BookingHeader() {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const index = useSelector(state => state.booking.index);
    const detail = useSelector(state => state.booking.detail);
    const headers = ['Book escort in ...', 'Select Gender', 'Select time', 'Select duration', (detail.count>0?(detail.count>1? detail.count+' escorts':detail.count+' escort'):'no escort'), detail.full_name,'Confirm Booking'];

    const cancel = (e) => {

        let res = {
            'index':0
        }
        dispatch({type:ActionTypes.BOOKING_NEXT, res});
    }

    return (
        <div>
            <CssBaseline />
            <AppBar position="fixed" elevation = {0} >
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <IconButton color='secondary' onClick={(e) => cancel(e)}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" noWrap className={classes.title}>
                                {headers[index]}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton color='secondary' onClick={(e) => history.push('/home')}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}
