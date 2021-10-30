import { makeStyles} from '@mui/styles';
import { createTheme } from '@mui/material/styles';
export const useStyles = makeStyles(theme => ({
  profileSelect:{
    width:'100%',
    padding:'0 0.5rem !important',
    '&::after':{
      border:'none !important'
    },
    '&::before':{
      border:'none !important'
    }
  },
  profileInput:{
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '0.875rem',
    padding: '5px 0',
  },
  avatarView:{
    width:'6rem !important',
    height:'6rem !important',
    boxShadow: '0px 0px 5px 0px #666666',
    padding: '5px',
    '& img':{
      borderRadius:'50%',
    },
    '& svg':{
      width:'3em',
      height:'3em',
    },
  },
  multipleSelect:{
    width:'100%',
    '&::before':{
      border:'none !important',
    },
    '&::after':{
      border:'none !important',
    },
    '& svg':{
      right:'0 !important',
    },
  },
  price_container:{
    '& input':{
      width:'100%',
      borderRadius:'5px',
      border:'1px solid #929292',
      padding:'0 5px',
    },
    '& input:focus':{
      outline:'none',
    },
    '& p':{
      fontSize: '1rem',
      fontWeight: 700,
    }
  },
  bioContainer:{
    border: '1px solid lightgray',
    width: '100%',
    height: '10rem',
    borderRadius: '10px',
    padding: '10px',
    fontSize: '1rem',
    '&:focus':{
      outline:'none !important',
    },
    resize:'none',
  },
  subTitle:{
     fontSize: '1rem',
     fontWeight:700,
  },
  swiperContainer:{
    '& img':{
      height:'6rem',
      objectFit: 'fill',
    },
    '& video':{
      height:'6rem',
    },
    '& .swiper-slide':{
      border: '1px solid #8b8b8b !important',
      borderRadius: '5px !important',
    }
  },
  cancelIcon:{
    position:'absolute',
    top:'-5px',
    right:0,
    padding:0,
    width:'20px',
    height:'20px',
    '& svg':{
      width: '100%',
      height: '100%',
    },
  },
  addIcon:{
    margin:'0 !important' ,
    background: '#ffcb7363',
    borderRadius: '20px',
    padding: '0px 15px',
    position: 'relative',
    width: '15%',
    '& span':{
      padding:'0 !important',
    },
    '& svg':{
      width:'100%',
    },
  },
  chip:{
    margin: '3px !important',
    backgroundColor:'#f59e0b !important',
    color:'white !important',
  },
  button:{
    width: '40% !important',
    padding: '5px !important',
    borderRadius: '10px !important',
    color: 'white !important',
    display: 'flex !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
  },
  bottomNavigation:{
    width: '100%',
    bottom: 0,
    position: 'fixed',
    backgroundColor: '#f1f0f0',
  },
  divider: {
    backgroundColor: 'white !important'
  },
  stepCheck: {
    width: '100%',
    position: 'absolute',
    transform: 'translateY(-50%)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageList:{ 
      padding:'10px !important',
      '& img':{
          maxHeight:'100% !important',
          maxWidth:'100% !important',
          borderRadius:'10px',
      },
      '& video':{
          maxHeight:'100% !important',
          maxWidth:'100% !important',
          borderRadius:'10px',
      },
      '& li':{
          borderRadius:'10px',
          border:'3px solid #f59e0b',
      },
  },
  nativeSelect:{
      width:'100% !important',
      fontSize: "0.9rem !important",
      fontFamily: "'Poppins' !important",
  },
  tab:{
      fontWeight:'bold !important',
  },
  inboxList:{
      padding:'20px 10px !important',
  },
  inboxItem:{
      padding:'20px !important',
      borderRadius:'10px !important',
      backgroundColor:'white',
      boxShadow: '0 0 10px 0 #d6d6d6',
      width:"100%",
  },
  badge:{
    height:'100% !important',
  },
  requestBadge:{
    bottom:'10px !important',
    right:'10px !important',
  },
  activeBadge:{
      width:'15px !important',
      height:'15px !important',
      backgroundColor:'#44b700 !important',
      borderRadius:'50% !important',
  },
  unactiveBadge:{
      width:'15px !important',
      height:'15px !important',
      backgroundColor:'lightgray !important',
      borderRadius:'50% !important',
  },
  ratingMark:{
    '& label':{
      margin:'0 !important',
    }
  }
  


}));

export const theme = createTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#ffffff ',
      dark: '#ffffff',
      contrastText: '#000000',
    },
    secondary: {
      light: '#ffbad8',
      main: '#f59e0b ',
      dark: '#d1035d',
      contrastText: '#fff',
    },
    inactive: {
      light: '#ffbad8',
      main: '#e0e0e0',
      dark: '#d1035d',
      contrastText: '#343a40',
    },

  },
  typography: {
    h6: {
      fontSize: '1rem',
      fontWeight: 'bold',
      fontFamily: 'sans-serif',
    },
    h5: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      fontSize: '1.5rem',
      color: '#fff',
      fontStyle: 'italic'

    },
    body2: {
      fontFamily: 'Poppins, sans-serif'
    }
  },
  button:{
    borderRadius:'10px',
  }




});
