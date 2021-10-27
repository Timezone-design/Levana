import React,{useState, useEffect} from 'react';
import {Button, Badge, Dialog, IconButton, Avatar} from '@mui/material';
import {useStyles} from '../../styles/Styles';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {GetProfileImages, UploadMedia} from '../../services/ProfileService';
import ImageCropper from './ImageCropper';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function EditableAvatar(props) {
    
    const {viewID} = props;
    const classes = useStyles();
    const [url, setUrl] = useState('');
    const [open, setOpen] = useState(false);
    const [sourceimage, setSourceImgage] = useState('');
    const [cropsource, setCropSource] = useState('');

    const handleClose = () => {
        setOpen(false);
    }
    const handlecancel = () => {
        setOpen(false);
    }
    const handlecrop = (cropsource) => {
        if (cropsource) {
            const data = {
                base64: cropsource,
                type: 'avatar'
            }
            UploadMedia(data)
                .then( response => {
                        setUrl(response.profile.avatar);
                        setOpen(false);
                });
        }
    }

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (file) => {
          resolve(file.target.result)
        };
        reader.readAsDataURL(file);
        })

    const cropImage = (e) => {
        const file = e.target.files[0];
        fileToDataUri(file)
            .then(base64 => {
                setSourceImgage(base64);
                setOpen(true);
            })
    }
    
    useEffect(()=> {
        if (viewID) {
            const data = {
                user_id:viewID
            }
            GetProfileImages(data)
            .then(response => {
                    setUrl(response.images.avatar);
            });
        }
    }, [viewID]);

return (
    <>
        <Badge
            overlap="circular"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            badgeContent=
            {
                <>
                    <input accept="image/*" id="avatarimage" type="file" hidden onChange={ (e) => cropImage(e) } />
                    <label htmlFor="avatarimage" >
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCameraIcon color="secondary" />
                        </IconButton>
                    </label>
                </>
            }
        >
            <Avatar src={`${process.env.MIX_PUBLIC_URL}/${url}`} classes={{root:classes.avatarView}} children=<AccountCircleIcon/> />
        </Badge>
        <Dialog onClose={handleClose} open={open} maxWidth='lg' fullWidth={true}  >
            <ImageCropper src={sourceimage} setCropSource={setCropSource}/>
            <div className='flex flex-row '>
                <Button 
                    variant="contained"
                    size="small"
                    color="secondary"
                    startIcon={<SaveIcon />}
                    onClick={() => {handlecrop(cropsource)}}
                    style={{width:'50%', justifyContent:'space-around'}}
                >
                    Crop
                </Button>
                <Button 
                    variant="contained"
                    size="small"
                    startIcon={<CancelIcon />}
                    onClick={() => {handlecancel()}}
                    style={{width:'50%', justifyContent:'space-around'}}
                >
                    Cancel
                </Button>
            </div>
        </Dialog>
    </>
);
}
