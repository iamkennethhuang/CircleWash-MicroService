import React, {useState, useEffect} from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
//import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';
import drier from '../../pictures/drier.JPG';
import drier2 from '../../pictures/drier2.JPG';
import drier3 from '../../pictures/drier3.JPG';
import drier4 from '../../pictures/drier4.JPG';
import drier5 from '../../pictures/drier5.JPG';
import drier6 from '../../pictures/drier6.JPG';
import drier7 from '../../pictures/drier7.JPG';
import drier8 from '../../pictures/drier8.JPG';
import resting from '../../pictures/resting.JPG';
import './style.css';

const useStyles = makeStyles({
    infoTitle:{
        fontWeight: 900,
        color: 'white'
    },
    infobody:{
        color: 'white'
    },
    infobutton:{
        background: 'white',
        color: 'black',
        fontSize: 12,
        borderRadius: 15
    }
  });

function useWindowSize(){
    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
    useEffect(() => { //everytime the compoment render useEffect is called
        const handleResize = () => {
            setSize([window.innerHeight, window.innerWidth]);
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, []);
    return size;
}

function getDescripSize(width){
    return width < 750 ? '100%' : '50%';
}

function getPostHeight(height){
    return height*0.6;
}

function getBoxHeight(height){
    return height-height*0.65; 
}

// function loading(){
//     const [current, setCurrent] = useState('');
//     useEffect(() => {
//         const handleLoad = () => {

//         }
//         window.addEventListener('load', handleLoad)
//         return () => {
//             window.removeEventListener("load", handleLoad)
//         }
//     }, []);
//     return;
// }

function InfoOnMain(){
    const classes = useStyles();
    const [h, w] = useWindowSize();
    //console.log(`${h}, ${w}`);

    const d = '../../pictures/drier.JPG';
    const d2 = '../../pictures/drier2.JPG';
    const d3 = '../../pictures/drier3.JPG';
    const d4 = '../../pictures/drier4.JPG';
    const d5 = '../../pictures/drier5.JPG';
    const d6 = '../../pictures/drier6.JPG';
    const d7 = '../../pictures/drier7.JPG';
    const d8 = '../../pictures/drier8.JPG';

    return  (
       <div>
            <picture >
                <source srcSet="pictures/drier8.JPG"  media="(max-width: 630px)" />
                <source srcSet="pictures/drier4.JPG"  media="(max-width: 825px)" />
                <img src='pictures/drier.JPG'  width='100%' height={getPostHeight(h)}  />
            </picture>

            <Box
            style={{background: 'linear-gradient(to right bottom, #1F56CF, #102B68)'}}
            sx={{width: getDescripSize(w), display: 'flex',
            flexDirection: 'row', height: getBoxHeight(h)}}>
                <Box 
                    sx={{width: '70%', height: '100%',  justifyContent: 'space-evenly', alignItems: 'baseline', display: 'flex',
                    flexDirection: 'column'}}>
                        <Typography className={classes.infoTitle} variant="h4" component='div' sx={{mt:2}}>
                            Full Service Laundromat
                        </Typography>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent' }}>
                            <ListItem>
                                <ListItemIcon sx={{color: 'white'}}> 
                                    <CheckCircleIcon/ >
                                </ListItemIcon>
                                <ListItemText primary="Go Completely Coinless" sx={{color: 'white'}}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon sx={{color: 'white'}}> 
                                    <CheckCircleIcon/ >
                                </ListItemIcon>
                                <ListItemText primary="Delivery" sx={{color: 'white'}}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon sx={{color: 'white'}}> 
                                    <CheckCircleIcon/ >
                                </ListItemIcon>
                                <ListItemText primary="Express Wash in 1 hour" sx={{color: 'white'}}/>
                            </ListItem>
                        </List>
                </Box>
            </Box>
        </div>
    );
}

export default InfoOnMain;