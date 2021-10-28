import React, { useState, useEffect, useRef } from 'react'
import { useStyles } from '../styles/Styles';
import Header from '../layouts/home/Header';
import {UpdateAccountInfo,DeleteAccount} from '../services/AccountService';
import {Button} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AlertModal from '../modal/AlertModal';
import ConfirmModal from '../modal/ConfirmModal';
import BottomNav from '../layouts/home/BottomNav';
import {useSelector} from 'react-redux';

export default function AccountSetting() {

    const classes = useStyles();
    const old_email = useSelector(state=>state.user.email);
    const user_id = useSelector(state=>state.user.id);

    const email = useRef(null);
    const old = useRef(null);
    const [old_password, setOldPassWord] = useState('');
    const new_password = useRef(null);
    const confirm_password = useRef(null);
    const [oldPassWordShow, setOldPassWordShow] = useState(false);
    const [newPassWordShow, setNewPassWordShow] = useState(false);

    const [matchError, setMatchError] = useState('Both passwords must match.');
    const [emailError, setEmailError] = useState('');
    const [oldError, setOldError] = useState('');

    const [open, setOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const closeConfirm = () => {
        setConfirmModalOpen(false);
    }
    const closeAlert = () => {
        setOpen(false);
    }
    const updateAccount = () => {
        if (email.current.value=='' ) {
            setEmailError('Input your email correctly.');
        }
        else setEmailError('');
        if (old.current.value !== old_password && old.current.value) {
            setOldError('Old password is wrong!');
        }
        else setOldError('');
        if (confirm_password.current.value !== new_password.current.value) {
            setMatchError('Both passwords does not match.');
        }
        else setMatchError('Both passwords must match.');
        if (email.current.value!== '' && 
            old.current.value == old_password && 
            old.current.value == new_password.current.value && 
            new_password.current.value!=='') {
            const data = {
                user_id:user_id,
                old_password:old_password,
                email:email.current.value,
                new_password:new_password.current.value,
            }
            UpdateAccountInfo(data)
                .then(response => {
                    setOpen(true);
                })
        }
        

    }
    const deleteAccount = () => {
        setConfirmModalOpen(false);
        DeleteAccount();
        window.location.href = '/';
    }
    
    return (
        <>
            <ConfirmModal isOpen={confirmModalOpen} cancelModal={closeConfirm} title='Are you sure to delete your account?' confirm={deleteAccount} />
            <AlertModal title='Successfully Updated Your Account!' isOpen={open} cancelModal={closeAlert} />
            <Header headline='ACCOUNT SETTING' />
            <div className='my-12 px-3 w-full mx-auto space-y-3 text-left text-base'>
                <div className='w-full '>
                    <p>Email</p>
                    <input className='w-full border rounded-sm px-2 py-1 focus:outline-none' defaultValue={old_email} ref={email} type='email' />
                    <p className='text-red-500'>{emailError}</p>
                </div>
                <div className='w-full '>
                    <p>Current PassWord</p>
                    <div className='border rounded-sm px-2 py-1 flex align-items-center justify-between'>
                        <input className='w-full focus:outline-none' ref={old} type={oldPassWordShow?'text':'password'} defaultValue={old_password} />
                        <div onClick={(e) => setOldPassWordShow(!oldPassWordShow)} 
                             >
                            {oldPassWordShow?
                                <VisibilityOffIcon />
                                    :
                                <VisibilityIcon />
                            }
                        </div>
                    </div>
                    <p className='text-red-500'>{oldError}</p>
                </div>
                <div className='w-full '>
                    <p>New PassWord</p>
                    <div className='border rounded-sm px-2 py-1 flex align-items-center justify-between'>
                        <input className='w-full focus:outline-none' ref={new_password} type={newPassWordShow?'text':'password'} />
                        <div onClick={(e) => setNewPassWordShow(!newPassWordShow)}
                             >
                            {newPassWordShow?
                                <VisibilityOffIcon />
                                    :
                                <VisibilityIcon />
                            }
                        </div>
                    </div>
                </div>
                <div className='w-full '>
                    <p>Confirm PassWord</p>
                    <input className='w-full border rounded-sm px-2 py-1 focus:outline-none' ref={confirm_password} type='text' />
                    <p className='text-red-500'>{matchError}</p>
                </div>
            </div>
            <Button
                variant='contained'
                color='secondary'
                size='large'
                onClick={() => updateAccount()}
            >
            Update
            </Button>
            <div onClick={() => setConfirmModalOpen(true)} 
                className='w-full bg-red-100 mt-10 text-red-500 py-3 text-base font-semibold'>
            Delete Account</div>
            <BottomNav/>
        </>

    )
    
}
