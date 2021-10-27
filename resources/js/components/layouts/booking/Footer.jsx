import React,{ useEffect } from 'react';
import { AppBar, Grid, Button, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BookingBackAction, BookingNextAction } from "../../redux/actions/BookingActions";

export default function Footer() {
    const dispatch = useDispatch();
    const index = useSelector(state=>state.booking.index);
    const detail = useSelector(state=>state.booking.detail);

    return (
        <AppBar position='fixed' style={{bottom: 0, top: 'inherit'}} elevation={4}>
            <Toolbar>
                <Grid container spacing = {0} justifyContent = 'space-evenly' alignItems='center'>
                    <Grid item xs={4}>
                        <Button
                            variant='contained'
                            style={{width:'100%'}}
                            color='primary'
                            disabled={(index == 0) ? true : false}
                            onClick={() => dispatch(BookingBackAction(index))}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={7}>
                        <Button
                            variant='contained'
                            color='secondary'
                            style={{width:'100%'}}
                            disabled={( index == 4 && detail.id == 0) ? true : false}
                            onClick={() => dispatch(BookingNextAction(index))}
                        >
                        { (index==5) ? 'BOOK '+ detail.name + ' NOW' : 'Next'}
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}


