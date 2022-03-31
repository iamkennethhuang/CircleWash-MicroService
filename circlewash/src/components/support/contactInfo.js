import React from 'react';
import { Box, Grid, Typography, TextField} from '@mui/material';
export default function ContactInfo({userInfo, setUserInfo}){

    return(
        <Box sx={{
            pl: 5,
            pr: 5,
            pt: 5,
            pb: 5,
            mb:5,
            background: '#FFFFFF',
            borderColor: '#707070',
            border: 1}}>
            <Typography sx={{fontWeight: 700, fontSize: 30, mb: 5}}>
                Contact Information
            </Typography>
            <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth name='firstName' label='First Name' varient='outlined' onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth name='lastName' label='Last Name' varient='outlined' onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth name='email' label='Email' varient='outlined' onChange={(e) => setUserInfo({...userInfo, email: e.target.value})} />
                </Grid> 
                <Grid item xs={12} md={6}>
                    <TextField fullWidth name='phone' label='Phone' varient='outlined' onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})} />
                </Grid>
            </Grid>
        </Box>
    );
}