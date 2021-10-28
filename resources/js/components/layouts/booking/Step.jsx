import React from 'react';
import { Divider, AppBar, Grid, Box} from '@mui/material';
import { useStyles } from '../../styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export default function Step() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const index = useSelector(state=>state.booking.index);
    const detail = useSelector(state=>state.booking.detail);
    const steps = ['City', 'Gender', 'Time', 'Duration'];
    const city = detail.city;
    const gender = detail.gender;
    const time = moment(detail.time).format('hh') + ':' + moment(detail.time).format('mm');
    const format = moment(detail.time).format('a') == 'am' ?'AM':'PM'; 
    const duration = detail.duration + 'h';
    const anotherSteps = [ city?city:'City', gender, time+format, duration ];
    return(
        <Box
            sx={{
                marginTop: '56px',
                width: '100%',
                height: 70,
                bgcolor: 'secondary.main',
            }}
        >
            <Grid container justifyContent='center' alignItems='center' style={{width:'100%', height: '100%'}}>
                <div style={{ width: '80%', position:'relative', paddingTop:'30px' }}>
                    <Divider className={classes.divider}/>
                    <div className={classes.stepCheck} id="stepCheck">
                        {index<5?
                            steps.map((step, i) => (
                                <div className="relative" key={i}>
                                    {
                                        (index >= i) ?
                                        <CheckCircleOutlineIcon color="primary" className="bg-yellow-500" />
                                        : <RadioButtonUncheckedIcon color="primary" fontSize="small" className="bg-yellow-500"/>
                                    }
                                    <div className="absolute text-white font-bold" style={{left:'50%', top:0,  transform: 'translate3D(-50%, -140%, 0)'}}>
                                        {step}
                                    </div>
                                </div>
                            ))
                        :
                            anotherSteps.map((step, i) => (
                                <div className="relative" key={i}>
                                    <CheckCircleOutlineIcon color="primary" className="bg-yellow-500" />
                                    <div className="absolute text-white font-bold" style={{left:'50%', top:0,  transform: 'translate3D(-50%, -140%, 0)'}}>
                                        {step}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Grid>
        </Box>
    )
}
