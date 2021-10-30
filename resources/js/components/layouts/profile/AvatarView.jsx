import React,{useState, useEffect} from 'react';
import {Badge, Avatar} from '@mui/material';
import {useStyles} from '../../styles/Styles';
import {GetProfileImages} from '../../services/ProfileService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Pusher from "pusher-js";

export default function AvatarView(props) {
    
    const {viewID,setOnline} = props;
    const classes = useStyles();
    const [url, setUrl] = useState('');
    const [active, setActive] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(()=> {
        let isMounted = true;
        if (viewID) {
            const data = {
                user_id:viewID
            }
            GetProfileImages(data)
            .then(response => {
                if(isMounted)
                    setUrl(response.images.avatar);
                    setActive(response.active);
                    if (setOnline) setOnline(response.active);
            });
        }
        return () => {isMounted = false};
    }, [viewID]);

    useEffect(() => {
        let isPusher = true;
        const pusher = new Pusher('3901d394c4dc96fca656', {
            cluster: 'eu',
        });
        const channel = pusher.subscribe('levana-channel');
        channel.bind('levana-event', (data) => {
            if (data.trigger == 'log' && data.user_id == viewID && isPusher) {
                setActive(data.status); 
                if (setOnline) setOnline(data.status);           
            }
        });
        return () => {
            isPusher = false;
        }
    },[viewID]);

    return (
        <>
            <Badge
                overlap="circular"  variant="dot" classes={{badge:(active?classes.activeBadge:classes.unactiveBadge)}}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                
            >
                <Avatar src={`${process.env.MIX_PUBLIC_URL}/${url}`} classes={{root:classes.avatarView}} children=<AccountCircleIcon/> />
            </Badge>
        </>
    )
}
