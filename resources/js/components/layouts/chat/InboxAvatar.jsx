import React, {useState, useEffect} from 'react';
import { Badge} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';

const activeColor='#00e676';
const inactiveColor='gray';

export default function InboxAvatar(props) {

  const { avatarimage, active } = props;
  console.log('avatarimage', avatarimage);

   
  const useStyles = makeStyles((theme) => ({
    
    badge: {
      backgroundColor:  active ? activeColor : inactiveColor,
      color: "white"
    },
    avat: {
      width: theme.spacing(10)+ 'px !important',
      height: theme.spacing(10)+ 'px !important',
      backgroundColor:'#ff2484 !important',
          
    },
  }));
  const classes = useStyles();
 
  return (

      <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          style={{transform: 'translate(5%, 5%)'}}
          classes={{badge: classes.badge}}
          badgeContent=" "
        >
          <Avatar 
          src={"https://fluee123.host/"+avatarimage} 
          className={classes.avat} 
          />
      </Badge>

      );
}
