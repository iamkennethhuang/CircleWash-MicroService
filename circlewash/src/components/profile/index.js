import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { Container, Typography, Grid, IconButton, Card, CardContent, CardActions, Button} from '@mui/material';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import NamePopup from './namePopup';
import PhonePopup from './phonePopup';
import AddressPopup from './addressPopup';



export default function Profile(){
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        addresses: [],
    });
    const [auth, setAuth] = useState(false);
    const [openName, setOpenName] = useState(false);
    const [openPhone, setOpenPhone] = useState(false);
    const [openAddress, setOpenAddress] = useState(false);

    const handleClickOpenName = () => {
        setOpenName(true);
    }

    let navigate = useNavigate();

    useEffect(() => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/user/islogin'
        })
        .then((res) => {
            if(res.data === false){
                navigate('/');
            }
            else{
                setAuth(res.data)
            }
            axios({
                method: 'get',
                withCredentials: true,
                url: 'http://localhost:5000/user/'
            })
            .then((res) => {
                console.log(res.data)
                setUserInfo({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                phone: res.data.phone,
                addresses: res.data.addresses,})
            });
        });
    }, []);
    
    const handleRemoveAddress = (address) => {
        axios({
            method: 'put',
            withCredentials: true,
            url: 'http://localhost:5000/user/address/remove',
            data:{
                address: address
            }
        })
        .then((res) => {
            console.log(res);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function createAddressTag(address){
        const addressId = address._id;
        const addressDelete = address;
        return(
            //need to figure out a way to add a unique key for each grid created
        <Grid item xs={12} md={4} key={addressId}>
            <Card elevation={0} sx={{
                border: 1,
                borderColor: '#C0C0C0',
                borderRadius: '20px 20px 20px 20px'}}>
                <CardContent>
                    <Typography sx={{fontWeight: 500, fontSize: 15}}>
                        {address.name}
                    </Typography>
                    <Typography sx={{fontWeight: 300, fontSize: 15}}>
                        {address.street}
                    </Typography>
                    <Typography sx={{fontWeight: 300, fontSize: 15}}>
                        {address.city + ', CA ' + address.zip}
                    </Typography>
                    <Typography sx={{fontWeight: 300, fontSize: 15}}>
                        United State
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small' onClick={() => handleRemoveAddress(addressDelete)}>Remove</Button>
                </CardActions>
            </Card>
        </Grid>);
    }

    const handleSignOut = () => {
        axios({
            method: 'delete',
            withCredentials: true,
            url: 'http://localhost:5000/user/logout',
        })
        .then((res) => {
            console.log(res);
            navigate('/');
            window.location.reload();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const theme = createTheme();   
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component='div' maxWidth='md' sx={{}}>
                <Typography sx={{fontWeight: 700, pt: 3, fontSize: 30}}>
                    Manage your Profiles
                </Typography>
                <Grid container spacing={3} sx={{}}>
                    <Grid item xs={12}>
                        <Box sx={{
                            background: '#EEF0F0',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: "20px 20px 20px 20px",
                            mt: 4,
                            pt: 6,
                            pb: 3,
                            pl: 5
                            }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                }}>
                                <Typography sx={{fontWeight: 700, fontSize: 30}}>
                                    {userInfo.firstName} {userInfo.lastName}
                                </Typography>
                                <IconButton onClick={handleClickOpenName}>
                                    <EditIcon />
                                </IconButton>
                                <NamePopup openName={openName} setOpenName={setOpenName}/>
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
                                Contact Details
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                                }}>
                                <Typography sx={{fontWeight: 700, fontSize: 15, mt: 0.5}}>
                                    Mobile Number
                                </Typography>
                                <IconButton onClick={() => setOpenPhone(true)}>
                                    <EditIcon sx={{fontSize: 15}}/>
                                </IconButton>
                                <PhonePopup openPhone={openPhone} setOpenPhone={setOpenPhone}/>
                            </Box>
                            <Typography sx={{fontWeight: 400, fontSize: 15, mb: 2}}>
                                {(userInfo.phone) ? userInfo.phone : 'Not Set'}
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
                            <Typography sx={{fontWeight: 400, fontSize: 15}}>
                                {userInfo.email}
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
                                Address
                            </Typography>
                            <Grid container spacing={2} >
                                <Grid item xs={12} md={4}>
                                    <Card onClick={() => setOpenAddress(true)}
                                    elevation={0}
                                    sx={{height: '100%', 
                                    display: 'flex',
                                    flexDirection:'column',
                                    justifyContent:"center",
                                    border: '3px dotted',
                                    borderColor: '#C0C0C0',
                                    borderRadius: '20px 20px 20px 20px',

                                    }}>
                                        <CardContent sx={{display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                        }}>
                                            <AddIcon  sx={{color: '#D5D5D5', fontSize: 50}}/>
                                            <Typography sx={{fontWeight: 700, fontSize: 20}}>
                                                Add Address
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <AddressPopup openAddress={openAddress} setOpenAddress={setOpenAddress}/>
                                </Grid>
                                {userInfo.addresses.map(address => createAddressTag(address))}
                            </Grid>
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
        </ThemeProvider>
    );
}