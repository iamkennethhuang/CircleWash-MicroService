import React, {useState, useEffect} from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from '@mui/material';
import { Divider } from '@mui/material';
import { Container } from '@mui/material';
import { Avatar } from '@mui/material';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import axios from 'axios';
import {Navigate} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    // withCredentials: true,

    useEffect(() => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/user/islogin'
        })
        .then((res) => {setLoggedIn(res.data); })
    }, []);

    const logIn = () => {
        axios({
            method: 'post',
            data: {
                email: email,
                password: password,
            },
            withCredentials: true,
            url: 'http://localhost:5000/signIn',
        })
        .then((res) => {
            console.log(res.data); 
            setLoggedIn(res.data);
            window.location.reload();
        })
        .catch((err) => console.log(err))
    };

    const useButton = () => {
        const [dis, setDis] = useState(true);
        useEffect(() => {
            if(email !== '' && password !== ''){
                setDis(false);
            }else{
                setDis(true);
            }
        }, [email, password]);// [email, password]
        return dis;
    };

    const dis = useButton();

    if(loggedIn){
        return <Navigate to='/' />
    }

    return(
        
        <Box sx={{
            display: 'flex',
            background: '#E8ECF5',
            pt:8,
            pb:25,
            pl:12,
            pr:12,
            alignItems: 'center'
        }}>
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                
            }}>
                <Box 
                    width='50%'
                    sx={{
                    pt: 25,
                    pb:8,
                    pr: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    background: 'linear-gradient(#2442A5, #2B45B0)',
                    borderRadius: '20px 0px 0px 20px', }}>
                    <Avatar sx={{bgcolor: '#F3B930', width:55, height: 55}}>
                        <LocalLaundryServiceIcon />
                    </Avatar>
                        <Box sx={{display: 'flex', flexDirection: 'row-reverse', pr:3}}>
                            <Divider orientation="vertical" sx={{borderColor: '#F3B930', height: 350, mt: 2}}/>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography component="h1" variant="h2" textAlign='end' 
                                    sx={{fontWeight: 700,
                                    color: "#E8ECF5",
                                    mt: 8,
                                    mb: 5,}}>
                                    Sunset Laundromat
                                </Typography>
                                <Typography component="h1" variant="h5" textAlign='end'
                                    sx={{fontWeight: 400,
                                    color: "#E8ECF5"
                                    }}>
                                    Sign In
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        width='50%'
                        sx={{
                            pt: 2,
                            pb:8,
                            pl:15,
                            pr:15,
                            display: 'flex',
                            flexDirection: 'column',
                            // alignItems: 'center',
                            background: '#FFFFFF',
                            borderRadius: '0px 20px 20px 0px',
                            }}>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pb: 16,
                                mt:2}}>
                            <Link underline="none" href="/" sx={{ flexGrow: 1 }}>
                                <Typography component="h1" variant="body2" sx={{color: '#2844AA', fontWeight: 700}} >
                                    Back
                                </Typography>
                            </Link>
                            <Typography component="h1" variant="body2" sx={{color: '#909092', pr: 1}}>
                                Don't have an account? 
                            </Typography>
                            <Link underline="none" href="/signup" >
                                <Typography component="h1" variant="body2" sx={{color: '#2844AA', fontWeight: 700}}>
                                    Sign Up
                                </Typography>
                            </Link>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',}}>
                            <Typography component="h1" variant="h4" mb={4} >
                                Welcome to Circle Wash
                            </Typography>
                            <Container maxWidth='xs'>
                                <Box component="form" noValidate sx={{ mt: 6 }}>
                                    <Grid container spacing={5}>
                                        <Grid item xs={12} >
                                            <TextField 
                                                type='email'
                                                label='Email'
                                                id='email'
                                                name='email'
                                                required
                                                fullWidth
                                                onChange={e => {setEmail(e.target.value)}}/>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField 
                                                type='password'
                                                label='Password'
                                                id='password'
                                                name='password'
                                                required
                                                fullWidth
                                                onChange={e => {setPassword(e.target.value)}}/>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        size='large'
                                        disabled={dis}
                                        sx={{ mt: 3,
                                            background: 'linear-gradient(#2442A5, #2B45B0)',
                                            ':disabled': {
                                                color: '#FFFFFF',
                                                opacity: 0.6,
                                        }}}
                                        onClick={logIn}
                                    >
                                        Sign In
                                    </Button>
                                    <Divider sx={{ mt: 6, mb:2, color:'#A1A0A4'}}>or sign in with</Divider>
                                    <Button
                                        disabled
                                        fullWidth
                                        variant="outlined" 
                                        sx={{   mt: 3, mb: 2, borderColor:'#E0E1EE'}}
                                    >
                                        <img src='pictures/googleLogo.png' alt='googleLogo' width='30px' height='30px' />
                                    </Button>
                                </Box>
                            </Container>
                        </Box>
                    </Box>
                    
            </Box>
        </Box>
    );
}