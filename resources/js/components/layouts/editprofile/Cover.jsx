import React, {useState, useEffect} from 'react';
import {useStyles} from '../../styles/Styles';
import {useHistory} from "react-router-dom";
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {GetProfileImages, UploadMedia} from '../../services/ProfileService';
import ImageCropper from './ImageCropper';
import {useDispatch, useSelector} from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function Cover(props) {
    const {viewID} = props;
    const classes = useStyles();
    const history = useHistory();
    const user_id = useSelector(state=>state.user.id);
    const [url, setUrl] = useState('');
    const [update, setUpdate] = useState(true);
    const [open, setOpen] = useState(false);
    const [cropsource, setCropSource] = useState('');
    const [sourceimage, setSourceImgage] = useState('');

    const handleClose = () => {
        setOpen(false);
    };
    const handlecancel = () => {
        setOpen(false);
    };
    const handlecrop = (cropsource) => {
        if (cropsource) {
            const data = {
                base64: cropsource,
                type: 'cover'
            }
            UploadMedia(data)
            .then(response => {
                // console.log(response);
                setUrl(response.profile.cover);
                setOpen(false);
            });
        }
    };

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
                user_id:viewID,
            }
            GetProfileImages(data)
                .then(response => {
                    setUrl(response.images.cover);
                });
        }
    }, [viewID]);

return (

    <>
        
        <div className='cover_image mx-1'>
            <img src={`${process.env.MIX_PUBLIC_URL}/${url}`} />
            <label id='arrow' onClick={() => history.push('/home')} >
                <IconButton color="primary"  component="span">
                    <ArrowBackIcon color="secondary" />
                </IconButton>
            </label>
            {viewID==user_id?
                <label htmlFor="coverimage" id='upload' >
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCameraIcon color="secondary" />
                    </IconButton>
                </label>
                :
                <label id='favorite'>
                    <IconButton color="primary" component="span">
                        <FavoriteIcon color="secondary"/>
                    </IconButton>
                </label>
                
            }
            <input accept="image/*" id="coverimage" type="file" hidden onChange={ (e) => cropImage(e) } />
        </div>
        
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
)
}
