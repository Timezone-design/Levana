import React,{useState, useEffect} from 'react';
import "../styles/modal.css";
import Modal from 'react-modal';
import {useHistory} from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

export default function Confirm(props) {
    const {isOpen, cancelModal} = props;
    const history = useHistory();
    useEffect(() => {
        Modal.setAppElement('#App');
    })
    const logOut = () => {
        axios.post('/logout');
        window.location.href="/";
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={cancelModal}
            className="Modal"
            overlayClassName="modal_overlay"
            closeTimeoutMS={500}
        >
            <div id="levana_modal">
                <div className=' font-default setting_modal'>
                    <p style={{fontSize:'1rem', padding:'10px'}}>Setting</p>
                    <div className='setting_list'>
                        <div className='setting_item' onClick={() => window.location.href='/'} >
                            <div className='icon'>
                                <HomeIcon color='secondary'/>
                            </div>
                            <div className='title'>
                                Home
                            </div>
                        </div>
                        <div className='setting_item' onClick={() => history.push('/inbox')} >
                            <div className='icon'>
                                <ContactMailIcon color='secondary'/>                                
                            </div>
                            <div className='title'>
                                Message
                            </div>
                        </div>
                        <div className='setting_item'   >
                            <div className='icon'>
                                <FavoriteIcon color='secondary'/>                                
                            </div>
                            <div className='title'>
                                Favorite
                            </div>
                        </div>
                        <div className='setting_item' onClick={() => history.push('/search')} >
                            <div className='icon'>
                                <SearchIcon color='secondary'/>                                
                            </div>
                            <div className='title'>
                                Search
                            </div>
                        </div>
                        <div className='setting_item' onClick={() => history.push('/account')} >
                            <div className='icon'>
                                <SettingsIcon color='secondary'/>                                
                            </div>
                            <div className='title'>
                                Account Setting
                            </div>
                        </div>
                    </div>
                    <div className='log_out'>
                        <div onClick={(e) => logOut()} ><LogoutIcon color='secondary'/>Log Out</div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}