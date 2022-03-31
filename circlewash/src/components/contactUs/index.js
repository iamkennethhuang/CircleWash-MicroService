import '../../App.css';
import React from 'react';
import Footer from '../footer/footer';
import Box from '@mui/material/Box';
// import axios from 'axios';
const axios = require('axios');

export default function ContactUs(){
    const handleClick = () => {
        console.log('Hi')
        axios({
            method: 'post',
            data: {
                UserName: "kenneth.huang.7758@gmail.com",
                Password: "0324Kh5448"
            },
            url: 'https://huang-cors-anywhere-proxy.herokuapp.com/https://m.fascard.com/api/AuthToken/',
        })
        .then((res) => {
            console.log(res)
            
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
        })
    }

    return (
        <Box sx={{ display: 'flex', 
            flexDirection:'column'}}>
            <h1> Contact Us </h1>
            <button onClick={handleClick}> click me </button>
            <Footer/ >
        </Box>

    );
}