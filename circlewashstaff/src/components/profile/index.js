import React, {useState, useEffect} from 'react';
import NavBar from '../navbar/index';
import { IconButton, Box, CssBaseline, Container, Toolbar, Typography, Button, Grid} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import localstorageService from '../../services/localstorageService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NamePopup from './namePopup';
import PasswordPopup from './passwordPopup';


export default function Profile(){
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [staffInfo, setStaffInfo] = useState();
    const [openPassword, setOpenPassword] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    useEffect(async() => {
        const value = await localstorageService.getLogInInfoWithExpiry('login');
        const token = await localstorageService.getLogInInfoWithExpiry('token');
        if(value === true){
            setLoggedIn(true);
        }
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://localhost:8000/employee/profile'
        })
        .then((res) => {
            setStaffInfo(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    if(loggedIn === false){
        navigate('/signin');
    }

    console.log(staffInfo);

    const handleSignOut = () => {
        const keys = ['login', 'token', 'role', 'id']
        localstorageService.setLogOut(keys);
        navigate('/signin');
    }

    return(
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <NavBar/>
            <Container maxWidth='md'>
                <Toolbar />
                <Typography sx={{fontWeight: 700, pt: 3, fontSize: 30}}>
                    Manage your Profiles
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Box sx={{
                        background: '#EEF0F0',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: "20px 20px 20px 20px",
                        mt: 4,
                        pt: 6,
                        pb: 3,
                        pl: 5}}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                }}>
                                {(staffInfo) && (<Typography sx={{fontWeight: 700, fontSize: 30}}>
                                    {staffInfo.firstName} {staffInfo.lastName}
                                </Typography>)}
                                <IconButton 
                                    onClick={() => setOpenProfile(true)}>
                                    <EditIcon />
                                </IconButton>
                                <NamePopup openName={openProfile} setOpenName={setOpenProfile}/>
                            </Box>
                            <Typography sx={{fontWeight: 500, fontSize: 15}}>
                                Manage your Profiles
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{
                            border: 1,
                            borderColor: '#CFD4D4',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: "20px 20px 20px 20px",
                            pt: 2,
                            pb: 3,
                            pl: 5,
                            pr: 3,
                            }}>
                            <Typography sx={{fontWeight: 700, fontSize: 20, mb: 5}}>
                                Account Details
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                                }}>
                                <Typography sx={{fontWeight: 700, fontSize: 15, mt: 0.5}}>
                                    Email
                                </Typography>
                            </Box>
                            {(staffInfo) && (<Typography sx={{fontWeight: 400, fontSize: 15, mb: 2}}>
                                {staffInfo.email}
                            </Typography>)}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                                }}>
                                <Typography sx={{fontWeight: 700, fontSize: 15, mt: 0.5}}>
                                    Password
                                </Typography>
                                <IconButton 
                                    onClick={() => setOpenPassword(true)}>
                                    <EditIcon sx={{fontSize: 15}}/>
                                </IconButton>
                                <PasswordPopup openPassword={openPassword} setOpenPassword={setOpenPassword} />
                            </Box>
                            <Typography sx={{fontWeight: 300, fontSize: 12}}>
                                Please match your password with FasCard admin account's password
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{width: '100%',
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    mt: 5}}>
                    <Button 
                    variant="contained" 
                    onClick={() => handleSignOut()}
                    sx={{background: '#CB3F30'}}>
                        Sign Out
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}