import '../../App.css';
import React from 'react';
//import {BrowserRouter as Router, Route} from "react-router-dom";
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/material';
import InfoOnMain from '../home/infoOnMain';
import HomeService from '../home/homeService';
import MarketFeatures from '../home/marketFeatures';
import Footer from '../footer/footer';


export default function HomePage(){
    return (
        <Box sx={{ display: 'flex', 
            flexDirection:'column'}}>
            <CssBaseline />
            <InfoOnMain/ >
            <HomeService/ >
            <MarketFeatures/ >
            <Footer/ >
        </Box>
        
    );
}