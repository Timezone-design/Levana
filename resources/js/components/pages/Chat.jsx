import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useStyles } from '../styles/Styles';
import { useHistory } from 'react-router';
import Header from '../layouts/home/Header';
import AvatarView from '../layouts/profile/AvatarView';
import Pusher from "pusher-js";
import { useDispatch, useSelector } from 'react-redux';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {GetChatRecord, SendMessage} from '../services/ChatService';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';

export default function Chat(props) {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { booking_id } = useParams();
    const user1_id = sessionStorage.getItem('user_id');
    const [user2_id, setUser2ID] = useState();
    const [user2_name, setUser2Name] = useState();
    const [records, setRecords] = useState([]);
    const input = useRef(null);
    const chat_container = useRef(null);
    const [update, setUpdate] = useState(false);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const elem = useRef(null);

    const sendMessage = () => {
        let msg = input.current.value;
        if (msg || file) {
            let data = {
                booking_id:booking_id,
                sender_id:user1_id,
                receiver_id:user2_id,
                content:msg,
                file:file
            }
            console.log(data);
            SendMessage(data).then(response =>{
                console.log(response);
                input.current.value = '';
                setFile(null);
                setFileName('');
                setRecords([...records, response.chat]);
            })
        }
    }
    const upload = (e) => {
        const file = e.target.files[0];
        console.log(file);
        fileToDataUri(file)
            .then(base64 => {
                setFile(base64);
                setFileName(file.name);
            })
    }
    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (file) => {
          resolve(file.target.result)
        };
        reader.readAsDataURL(file);
    })

    useEffect(() => {
        let data = {
            'booking_id':booking_id
        }
        GetChatRecord(data)
            .then(response => {
                console.log(response);
                setUser2ID(response.user2_id);
                setRecords(response.record);
                setUser2Name(response.user2_name);
                setUpdate(!update);
            });
    },[]);
    useEffect(() => {
        elem?.current?.scrollIntoView();
    },[records]);

    useEffect(() => {
        let isPusher = true;
        const pusher = new Pusher('3901d394c4dc96fca656', {
            cluster: 'eu',
        });
        const channel = pusher.subscribe('levana-channel');
        channel.bind('levana-event', (data) => {
            console.log('pusher');
            console.log(data);
            if (data.booking_id == booking_id && isPusher) {
                console.log('getting pusher data');
                setRecords([...records, data]);
            }
        });
        return () => {
            isPusher = false;
        }
    },[]);

    return (
        <>
            <Header headline='MESSAGE' />
            <div className='flex align-items-center py-2 pl-4 space-x-2'>
                <div onClick={(e) => history.goBack()} ><ArrowBackIosIcon /></div>
                <AvatarView viewID={user2_id} />
                <div className='h-full'>
                    <p className='font-bold text-base'>{user2_name}</p>
                    <p className='font-semibold text-base text-gray-500'>Active Now</p>   
                </div>
            </div>
            <div   className='bg-gray-100 overflow-y-auto w-full p-3 relative' style={{height:'73vh'}} >
                {
                    records.map((record, index) => (
                        <div key={index} className={ record.sender_id==user1_id? 'w-full flex justify-end my-2':'my-2 w-full flex'}>
                            <div className='max-w-3/4'>
                                {record.file &&
                                    <img className='my-1' src={`${process.env.MIX_PUBLIC_URL}/${record.file}`} />
                                }
                                {record.content &&
                                    <span className='block rounded-md px-2 py-1 border-yellow-500 border-2 bg-white'>{record.content}</span>
                                }
                                <span className='block px-2 text-right'>{moment(record.updated_at).format('YYYY-MM-DD, h:mm:ss')}</span>
                            </div>
                        </div>
                    ))

                }
                <div className='w-2 h-2 border' ref={elem} />
            </div>
            <div className='w-full flex align-items-center h-12 bg-white fixed'>
                <span className='absolute bottom-0 right-4 p-1'>{fileName? `${fileName}, ${moment().format('YYYY-MM-DD, h:mm:ss')}`:''}</span>
                <div className='transform rotate-45 w-2/12 h-full flex align-items-center justify-content-center'>
                <input accept="image/*" id="image" type="file" hidden onChange={ (e) => upload(e) } />
                    <label htmlFor="image" style={{margin:'0 !important'}}>
                        <IconButton   component="div">
                            <AttachFileIcon />
                        </IconButton>
                    </label>
                </div>
                <div className='h-full p-2 w-9/12'>
                    <input ref={input} placeholder='Text your Message...' className='w-full h-full focus:outline-none bg-white' />
                </div>
                <div className='w-2/12 bg-yellow-500 h-full pl-2 flex align-items-center justify-content-center'>
                    <div onClick={(e) => sendMessage()} className='transform -rotate-45'><SendIcon color='primary' /></div>
                </div>
            </div>
        </>

    )
}