import React, { useState } from 'react';
import { FormControl, InputAdornment, Input } from '@material-ui/core';
import { useStyles } from '../../styles/Styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import ChatService from '../../services/ChatService';


export default function MessageInput(props) {
    const { user_id, setFile, file } = props;
    console.log('user_id', user_id);
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        console.log(message);
        console.log(e.target.value);
        setValue(e.target.value);
        setMessage(e.target.value);
    }
    const sendMessage = () => {
        console.log('message', message);

        if (message.length > 0 || (attach !== '')) {

            const sms = {
                'receiver_id': user_id,
                'message': message,
                'file': file
            };
            ChatService.sendMessage(sms)
                .then(result => {
                    console.log(result);
                    setValue('');
                    setMessage('');
                    setFile('');
                })
        }
    }

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (file) => {
            resolve(file.target.result)
        };
        reader.readAsDataURL(file);
    })

    const sendFile = (e) => {
        const file = e.target.files[0];
        fileToDataUri(file)
            .then(base64 => {
                setFile(base64);
            })
    }


    return (
        <>
            {/* <p>typing</p> */}
            <FormControl fullWidth={true} variant="outlined" size="medium" color="secondary" className={classes.messageinput}>
                <Input
                    style={{ paddingLeft: '15px', paddingRight: '15px' }}
                    fullWidth={true}
                    autoFocus={true}
                    value={value}
                    placeholder="Write a Message..."
                    disableUnderline={true}
                    onChange={(e) => onChange(e)}
                    onKeyDown={(event) => { if (event.keyCode === 13) { sendMessage(); } }}
                    classes={{ input: classes.textmessage }}
                    startAdornment={
                        <InputAdornment position="start">
                            <div style={{ height: '0' }}>
                                <label htmlFor={'attach'} style={{ position: 'relative', left: '0rem', top: '-1.5rem', zIndex: '100' }}>
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <AttachFileIcon color="secondary" style={{ transform: 'rotate(40deg)' }} />
                                    </IconButton>
                                </label>
                            </div>
                        </InputAdornment>
                    }
                />
                <IconButton onClick={() => sendMessage()} >
                    <SendIcon color="secondary" />
                </IconButton>
            </FormControl>
            <input accept="image/*" id={'attach'} type="file" hidden onChange={(e) => sendFile(e)} />
        </>
    );
}
