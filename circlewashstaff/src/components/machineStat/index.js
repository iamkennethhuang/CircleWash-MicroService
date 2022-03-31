import { Typography, Box, CssBaseline, Container, Toolbar, Grid } from '@mui/material';
import React, {useEffect, useState} from 'react';
import NavBar from '../navbar/index';
import localstorageService from '../../services/localstorageService';
import {useNavigate} from "react-router-dom";
import CustomPie from './customPie';
import axios from 'axios';

export default function MachineStat(){
    const [loggedIn, setLoggedIn] = useState();
    const [allPieData, setAllPieData] = useState();
    const navigate = useNavigate();
    const apiOptionMonth = {month: 'long'};

    useEffect(async () => {
        const value = await localstorageService.getLogInInfoWithExpiry('login');
        const token = await localstorageService.getLogInInfoWithExpiry('token');
        if(value === true){
            setLoggedIn(true);
        }
        const today = new Date();
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://localhost:8000/machine/monthly/analysis/all',
            params: {
                month: today.getMonth(),
                year: today.getFullYear()
            }
        })
        .then((res) => {  
            console.log(res.data);
            setAllPieData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    if(loggedIn === false){
        navigate('/signin');
    }
    
    return(
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <NavBar/>
            <Container maxWidth='false' sx={{pt: 2}}>
                <Toolbar />
                <Typography sx={{fontSize: 30, fontWeight: 700, mb:4}}>
                    Machine Statistic for {new Date().toLocaleDateString("en-US", apiOptionMonth)}
                </Typography>
                <Grid container spacing={2} sx={{height: '10%'}}>    
                    {(allPieData) && (
                        allPieData.map(data => (
                            <Grid item xs={3} sx={{height: '50%'}}>
                                <Box 
                                    sx={{
                                    background:'#EFF1F2',
                                    height: '100%',
                                    pt: 2,
                                    pl: 2}}>
                                    <Typography sx={{mb:1}}>
                                        Machine #{data.machineId} Status
                                    </Typography>
                                    <CustomPie data={data.pieData} />
                                </Box>
                            </ Grid>
                        ))
                    )}
                </Grid>
            </Container>  
        </Box>
    );
}