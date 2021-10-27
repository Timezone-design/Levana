import React from 'react';
import ReactDOM from 'react-dom';
import { theme } from '../styles/Styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {ThemeProvider} from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { PlayCircleOutline, FavoriteBorder } from '@material-ui/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from "swiper/core";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import '../App.css';

SwiperCore.use([Pagination]);

function Welcome() {  
    const bookEscort = () => {
        window.location.href="/booking";
    }
    const join = () => {
        window.location.href="/register";
    }

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="h6" className="text-center font-extrabold">
                The Home of Escorts
            </Typography>
            <Typography variant="body2" className="text-center text-md font-semibold">
                Book the perfect companion within minutes.
            </Typography>
            <Grid container justifyContent='space-evenly' className="w-10/12 mx-auto pt-3">
            <Grid item xs={5}>
                    <Button
                        className="w-full"
                        variant="contained"
                        color='secondary'
                        disableElevation
                        size="small"
                        onClick={() => bookEscort()}
                    >
                        <span className="normal-case">Book an escort</span>
                    </Button>
                </Grid>
                <Grid item xs={5} className="w-full">
                    <Button
                        className="w-full"
                        variant="outlined"
                        color='secondary'
                        disableElevation
                        size="small"
                        onClick={() => join()}
                    >
                        <span className="normal-case">Join as escort</span>
                    </Button>
                </Grid>
            </Grid>
            <img src="/storage/static/top.png" alt="top" className="w-full my-3" />
            <div className="px-2">
                <Typography variant="body1" className="font-light mb-2">How it works</Typography>
                <Button
                    variant="contained"
                    color='secondary'
                    disableElevation
                    size="small"
                    startIcon={<PlayCircleOutline />}
                >
                    <span className="normal-case">Watch this video</span>
                </Button>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    pagination={{ "clickable": true }}
                    className="mySwiper mt-3"
                >
                    <SwiperSlide>
                        <p><span className="text-2xl font-bold">1.</span>
                        <span className="text-sm">Location and Time</span></p>
                        <img src="/storage/static/phone1.png" alt="phone1" className="w-full" />
                        <p className='text-xs'>Select the location and time you’d like to meet an escort.</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <p><span className="text-2xl font-bold">2.</span>
                        <span className="text-sm">Live search results</span></p>
                        <img src="/storage/static/phone2.png" alt="phone1" className="w-full" />
                        <p className='text-xs'>Receive tailored results of escorts in your area available to book now!</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <p><span className="text-2xl font-bold">3.</span>
                        <span className="text-sm">Live search results</span></p>
                        <img src="/storage/static/phone2.png" alt="phone1" className="w-full" />
                        <p className='text-xs'>Receive tailored results of escorts in your area available to book now!</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <p><span className="text-2xl font-bold">4.</span>
                        <span className="text-sm">Live search results</span></p>
                        <img src="/storage/static/phone2.png" alt="phone1" className="w-full" />
                        <p className='text-xs'>Receive tailored results of escorts in your area available to book now!</p>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="w-full bg-yellow-500 mt-3 py-3">
                <p className="text-white text-md text-center mt-2 mb-3">
                    51,612 <span className="text-lg font-bold">Trusted reviews from</span><br/>
                    126,765 <span className="text-lg font-bold">bookings</span>
                </p>
                <div className="w-full overflow-hidden">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={5}
                        loop={true}
                        pagination={{ "clickable": true }}
                        navigation={true}
                        className="mySwiper"
                    >
                        <SwiperSlide className="px-1">
                            <div className="text-center text-white rounded-md bg-black bg-opacity-10">
                                <FavoriteBorder size="middle" className="my-2"/>
                                <Typography variant="h6" className="font-bold my-2" color="primary">100% Private</Typography>
                                <p className="text-xs px-1 pb-2">Once a booking is complete, clients can leave a rating and written review of their escort experience. All feedback remains totally anonymous.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="px-1">
                            <div className="text-center text-white rounded-md" xs={4} style={{background:"#ffffff33"}}>
                                <FavoriteBorder size="middle" className="my-2"/>
                                <Typography variant="h6" className="font-bold my-2" color="primary">100% Private</Typography>
                                <p className="text-xs px-1 pb-2">Once a booking is complete, clients can leave a rating and written review of their escort experience. All feedback remains totally anonymous.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="px-1">
                            <div className="text-center text-white rounded-md bg-black bg-opacity-10" xs={4}>
                                <FavoriteBorder size="middle" className="my-2"/>
                                <Typography variant="h6" className="font-bold my-2" color="primary">100% Private</Typography>
                                <p className="text-xs px-1 pb-2">Once a booking is complete, clients can leave a rating and written review of their escort experience. All feedback remains totally anonymous.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="px-1">
                            <div className="text-center text-white rounded-md bg-black bg-opacity-10" xs={4}>
                                <FavoriteBorder size="middle" className="my-2"/>
                                <Typography variant="h6" className="font-bold my-2" color="primary">100% Private</Typography>
                                <p className="text-xs px-1 pb-2">Once a booking is complete, clients can leave a rating and written review of their escort experience. All feedback remains totally anonymous.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="px-1">
                            <div className="text-center text-white rounded-md bg-black bg-opacity-10" xs={4}>
                                <FavoriteBorder size="middle" className="my-2"/>
                                <Typography variant="h6" className="font-bold my-2" color="primary">100% Private</Typography>
                                <p className="text-xs px-1 pb-2">Once a booking is complete, clients can leave a rating and written review of their escort experience. All feedback remains totally anonymous.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="px-1">
                            <div className="text-center text-white rounded-md bg-black bg-opacity-10" xs={4}>
                                <FavoriteBorder size="middle" className="my-2"/>
                                <Typography variant="h6" className="font-bold my-2" color="primary">100% Private</Typography>
                                <p className="text-xs px-1 pb-2">Once a booking is complete, clients can leave a rating and written review of their escort experience. All feedback remains totally anonymous.</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className="px-2 pt-3">
                <Typography variant="body1" className="font-light pb-2">Escorts currently online</Typography>
                <div className="w-full">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={10}
                        loop={true}
                        pagination={{ "clickable": true }}
                        navigation={true}
                        className="mySwiper"
                    >
                        <SwiperSlide className="rounded-md relative">
                            <div className="bottom-0 left-1 relative">
                                <img src="/storage/static/logo.png" className="w-full" alt="logo" />
                                <div className="w-full h-full absolute top-0 left-0" style={{background: "linear-gradient(to top, rgb(245 158 11), transparent)"}}></div>
                                <div className="absolute bottom-0 z-10">
                                    <p className="font-bold text-sm text-white">Sammantha</p>
                                    <p className="text-sm text-white">London, UK</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="rounded-md relative">
                            <div className="bottom-0 left-1 relative">
                                <img src="/storage/static/logo.png" className="w-full" alt="logo" />
                                <div className="w-full h-full absolute top-0 left-0" style={{background: "linear-gradient(to top, rgb(245 158 11), transparent)"}}></div>
                                <div className="absolute bottom-0 z-10">
                                    <p className="font-bold text-sm text-white">Sammantha</p>
                                    <p className="text-sm text-white">London, UK</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="rounded-md relative">
                            <div className="bottom-0 left-1 relative">
                                <img src="/storage/static/logo.png" className="w-full" alt="logo" />
                                <div className="w-full h-full absolute top-0 left-0" style={{background: "linear-gradient(to top, rgb(245 158 11), transparent)"}}></div>
                                <div className="absolute bottom-0 z-10">
                                    <p className="font-bold text-sm text-white">Sammantha</p>
                                    <p className="text-sm text-white">London, UK</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="rounded-md relative">
                            <div className="bottom-0 left-1 relative">
                                <img src="/storage/static/logo.png" className="w-full" alt="logo" />
                                <div className="w-full h-full absolute top-0 left-0" style={{background: "linear-gradient(to top, rgb(245 158 11), transparent)"}}></div>
                                <div className="absolute bottom-0 z-10">
                                    <p className="font-bold text-sm text-white">Sammantha</p>
                                    <p className="text-sm text-white">London, UK</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="rounded-md relative">
                            <div className="bottom-0 left-1 relative">
                                <img src="/storage/static/logo.png" className="w-full" alt="logo" />
                                <div className="w-full h-full absolute top-0 left-0" style={{background: "linear-gradient(to top, rgb(245 158 11), transparent)"}}></div>
                                <div className="absolute bottom-0 z-10">
                                    <p className="font-bold text-sm text-white">Sammantha</p>
                                    <p className="text-sm text-white">London, UK</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="rounded-md relative">
                            <div className="bottom-0 left-1 relative">
                                <img src="/storage/static/logo.png" className="w-full" alt="logo" />
                                <div className="w-full h-full absolute top-0 left-0" style={{background: "linear-gradient(to top, rgb(245 158 11), transparent)"}}></div>
                                <div className="absolute bottom-0 z-10">
                                    <p className="font-bold text-sm text-white">Sammantha</p>
                                    <p className="text-sm text-white">London, UK</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="rounded-md relative">
                            <div className="bottom-0 left-1 relative">
                                <img src="/storage/static/logo.png" className="w-full" alt="logo" />
                                <div className="w-full h-full absolute top-0 left-0" style={{background: "linear-gradient(to top, rgb(245 158 11), transparent)"}}></div>
                                <div className="absolute bottom-0 z-10">
                                    <p className="font-bold text-sm text-white">Sammantha</p>
                                    <p className="text-sm text-white">London, UK</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className="px-2 mt-5 pt-5 bg-gray-200 text-center">
                <Typography variant="h5" color="secondary" id="logo">Levana</Typography>
                <Typography variant="body2" className="text-black py-2">The on-demand escort booking platform</Typography>
                <Typography variant="body2" className="text-black py-2"><a>Blog</a></Typography>
                <Typography variant="body2" className="text-black py-2"><a>Privary policy</a></Typography>
                <Typography variant="body2" className="text-black py-2"><a>Terms & conditions</a></Typography>
                <Typography variant="body2" className="text-black py-2"><a>Afilliates</a></Typography>
                <Typography variant="body2" className="text-black py-2"><a>Careers</a></Typography>
                <Typography variant="body2" className="text-black py-2"><a>Help</a></Typography>
                <Typography variant="body2" className="text-black py-2"><a>Contact us</a></Typography>
                <Typography variant="body2" className="text-black pt-5 pb-3"><a>© Levana 2021 | contact@levana.com</a></Typography>
            </div>
        </ThemeProvider>
    )
}

if(document.getElementById('welcome')) {
    ReactDOM.render(
        <Welcome />,
        document.getElementById('welcome')
    );
}
