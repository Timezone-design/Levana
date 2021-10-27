import React, { useState, useEffect } from 'react';
import { Divider, Badge, Grid, InputBase } from '@material-ui/core';
import { useStyles } from '../../styles/Styles';
import { useHistory } from 'react-router';
import SearchIcon from '@material-ui/icons/Search';
import InboxAvatar from '../../layouts/chat/InboxAvatar';
import InboxService from '../../services/InboxService';
import NewMessageNotif from './NewMessageNotif';
import { useDispatch, useSelector } from 'react-redux';
import { NotifAction } from "../../redux/actions/NotifAction";


export default function MessageInbox() {

    const classes = useStyles();
    const history = useHistory();
    const [update, setUpdate] = useState(false);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [id, setID] = useState(0);

    useEffect(() => {

        InboxService.getInbox()
            .then(result => {
                console.log('inbox result', result);
                setUsers(result['inbox_users']);
                setMessages(result['last_messages']);
                setID(result['auth_user_id']);
                setUpdate(!update);
            });
    }, []);

    return (

        <>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon classes={{ root: classes.svgIcon }} />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <div className={'overflow-scroll flex flex-column'} style={{ marginBottom: '4rem', marginTop: '11rem' }} >
                {users.length ?
                    users.map((user, index) => (

                        <a key={index} href='#'
                            onClick={() => history.push('/chat/' + user.user_id)}
                            className={classes.messagereport}
                        >
                            <Grid container key={index} >
                                <Grid item xs={3} >
                                    <InboxAvatar avatarimage={user.avatarimage} active={user.active} />
                                </Grid>
                                <Grid item xs={8} >
                                    <p className={'text-2xl font-semibold text-left ml-3'}> {user.name}</p>
                                    {
                                        ((messages.length) && (messages[0] !== null) && (messages[0] !== '')) ?
                                            <span className={'text-left text-lg ml-3 mt-6'}
                                                style={{
                                                    display: 'block', width: '90%', overflow: 'hidden',
                                                    whiteSpace: 'nowrap', textOverflow: 'ellipsis'
                                                }}
                                            >
                                                {messages[index]['content']}
                                            </span>
                                            :
                                            <></>
                                    }
                                </Grid>
                                <Grid item xs={1} >
                                    <NewMessageNotif user1_id={id} user2_id={user.user_id} />
                                </Grid>
                            </Grid>
                        </a>

                    ))
                    :
                    <></>
                }
            </div>
        </>
    )
}
