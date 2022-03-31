import React, {useState, useEffect, useContext} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box, Grid, Card, CardContent, Toolbar} from '@mui/material';
import UnSolvedTable from './unsolvedTable';
import SolvedTable from './solvedTable';
import axios from 'axios';
import localstorageService from '../../services/localstorageService';
import {useNavigate} from "react-router-dom";
import NavBar from '../navbar/index';
import {createTheme, ThemeProvider } from '@mui/material/styles';

export default function OwnerDashBoard(){
    const [totalComplaints, setTotalComplaints] = useState(0);
    const [unsolved, setUnsolved] = useState(0);
    const [solved, setSolved] = useState(0);
    const [today, setToday] = useState(0);
    const [month, setMonth] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const theme = createTheme();

    useEffect(async () => {
        const value = await localstorageService.getLogInInfoWithExpiry('login');
        const token = await localstorageService.getLogInInfoWithExpiry('token');

        if(value === true){
            setLoggedIn(true);
        }
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://localhost:8000/supportcase/summary',
        })
        .then(function (res){ 
            setUnsolved(res.data.unhandleAmount);
            setSolved(res.data.handleAmount);
            setToday(res.data.todayAmount);
            setMonth(res.data.weekAmount);
            setTotalComplaints(res.data.totalAmount);
        })
        .catch((err) => console.log(err));
    }, []);

    if(loggedIn === false){
        navigate('/signin');
    }

    return(
        <ThemeProvider theme={theme}> 
            <Box sx={{display: 'flex'}}>
                <CssBaseline />
                <NavBar/>
                <Box component='main' sx={{flexGrow: 1}}>
                    <Toolbar />
                    <Container component='div' maxWidth='xl' >
                        <Typography sx={{fontWeight: 700, fontSize: 40}}>
                            DashBoard
                        </Typography>
                        <Box sx={{display: 'flex', mt: 3, mb: 3}}>
                            <Typography sx={{fontWeight: 500, fontSize: 18}}>
                                Complaints Overview 
                            </Typography>
                            <Typography sx={{fontWeight: 200, fontSize: 18, ml:1}}>
                                | {totalComplaints} Total Complaints
                            </Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={4} sm={3} md={2}>
                                <Card sx={{background: '#E9574E', height: '80%'}}>
                                    <CardContent>
                                        <Typography sx={{fontWeight: 300, fontSize: 18, color: '#FFFFFF'}}>
                                            Open Complaints
                                        </Typography>
                                        <Typography sx={{fontWeight: 700, fontSize: 40, color: '#FFFFFF'}}>
                                            {unsolved}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4} sm={3} md={2}>
                                <Card sx={{background: '#66B98B', height: '80%'}}>
                                    <CardContent>
                                        <Typography sx={{fontWeight: 300, fontSize: 18, color: '#FFFFFF'}}>
                                            Today's Complaints
                                        </Typography>
                                        <Typography sx={{fontWeight: 700, fontSize: 40, color: '#FFFFFF'}}>
                                            {today}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4} sm={3} md={2}>
                                <Card sx={{background: '#F3AA50', height: '80%'}}>
                                    <CardContent>
                                        <Typography sx={{fontWeight: 300, fontSize: 18, color: '#FFFFFF'}}>
                                            This Week's Complaints
                                        </Typography>
                                        <Typography sx={{fontWeight: 700, fontSize: 40, color: '#FFFFFF'}}>
                                            {month}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4} sm={3} md={2}>            
                                <Card sx={{background: '#A5ACB8', height: '80%'}}>
                                    <CardContent>
                                        <Typography sx={{fontWeight: 300, fontSize: 18, color: '#FFFFFF'}}>
                                            Resolved Complaints
                                        </Typography>
                                        <Typography sx={{fontWeight: 700, fontSize: 40, color: '#FFFFFF'}}>
                                            {solved}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4} sm={3} md={2}>
                                <Card sx={{background: '#D6D8DC', height: '80%'}}>
                                    <CardContent>
                                        <Typography sx={{fontWeight: 300, fontSize: 18, color: '#FFFFFF'}}>
                                            Total Complaints
                                        </Typography>
                                        <Typography sx={{fontWeight: 700, fontSize: 40, color: '#FFFFFF'}}>
                                            {totalComplaints}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={6}>
                                <UnSolvedTable />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <SolvedTable />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}