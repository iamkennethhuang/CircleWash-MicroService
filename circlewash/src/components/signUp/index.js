import React, {useEffect, useState} from 'react';
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
import {Navigate, useNavigate} from "react-router-dom";
import { CssBaseline } from '@mui/material';

export default function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/user/islogin'
        })
        .then((res) => setLoggedIn(res.data))
    }, []);
    
    let navigate = useNavigate();
    const register = () => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/signUp',
            withCredentials: true,
            data: {
                firstName: first,
                lastName: last,
                email: email,
                password: password,
            }
        })
        .then((res) => {if(res.data){
            navigate('/signin');
        }
        else{
            setError(res.data)
        }
        });
    };
    
    const useButton = () => {
        const [dis, setDis] = useState(true);
        useEffect(() => {
            if(email !== '' && password !== '' && first !== '' && last !== ''){
                setDis(false);
            }else{
                setDis(true);
            }
        }, [email, password, first, last]); //[email, password, first, last]
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
                            pt: 2,
                            pb:8,
                            pl:15,
                            pr:15,
                            display: 'flex',
                            flexDirection: 'column',
                            background: '#FFFFFF',
                            borderRadius: '20px 0px 0px 20px',
                            }}>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pb: 16,
                                mt:2}}>
                            <Link underline="none" href="/" sx={{flexGrow: 1}}>
                                <Typography component="h1" variant="body2" sx={{color: '#2844AA', fontWeight: 700}}>
                                    Back
                                </Typography>
                            </Link>
                            <Typography component="h1" variant="body2" sx={{color: '#909092', pr: 1}}>
                                Have an account? 
                            </Typography>
                            <Link underline="none" href="/signin" >
                                <Typography component="h1" variant="body2" sx={{color: '#2844AA', fontWeight: 700}}>
                                    Sign in
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
                                <Box component="form" noValidate sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} >
                                            <TextField 
                                                type='text'
                                                label='First Name'
                                                id='firstName'
                                                name='firstName'
                                                required
                                                fullWidth
                                                onChange={e => {setFirst(e.target.value)}}/>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <TextField 
                                                type='text'
                                                label='Last Name'
                                                id='lastName'
                                                name='lastName'
                                                required
                                                fullWidth
                                                onChange={e => {setLast(e.target.value)}}/>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField 
                                                type='email'
                                                label='Email'
                                                id='email'
                                                name='email'
                                                required
                                                fullWidth
                                                sx={{mt:2}}
                                                onChange={e => {setEmail(e.target.value)}}/>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Typography color='#FF0000' sx={{pl:1}}>
                                                {error}
                                            </Typography>
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
                                        sx={{ mt: 4,
                                            background: 'linear-gradient(#2442A5, #2B45B0)',
                                            ':disabled': {
                                                color: '#FFFFFF',
                                                opacity: 0.6,
                                            }}}
                                        onClick={register}>
                                        Create an account
                                    </Button>
                                    <Divider sx={{ mt: 6, mb:2, color:'#A1A0A4'}}>or sign up with</Divider>
                                    <Button
                                        disabled
                                        fullWidth
                                        variant="outlined" 
                                        sx={{   mt: 3, mb: 2, borderColor:'#E0E1EE'}}
                                    >
                                        {/* <GoogleIcon /> */}
                                        <img src='pictures/googleLogo.png' alt='googleLogo' width='30px' height='30px' />
                                    </Button>
                                </Box>
                            </Container>
                        </Box>
                    </Box>
                    <Box 
                        width='50%'
                        sx={{
                        pt: 25,
                        pb:8,
                        pl: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        background: 'linear-gradient(#2442A5, #2B45B0)',
                        borderRadius: '0px 20px 20px 0px',
                        
                    }}>
                        <Avatar sx={{bgcolor: '#F3B930', width:55, height: 55}}>
                            <LocalLaundryServiceIcon />
                        </Avatar>
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            <Divider orientation="vertical" sx={{borderColor: '#F3B930', height: 350, pr: 3, mt: 2}}/>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography component="h1" variant="h2" 
                                    sx={{fontWeight: 700,
                                    color: "#E8ECF5",
                                    mt: 8,
                                    mb: 5,}}>
                                    Sunset Laundromat
                                </Typography>
                                <Typography component="h1" variant="h5" 
                                    sx={{fontWeight: 400,
                                    color: "#E8ECF5"
                                    }}>
                                    Sign Up
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
            </Box>
        </Box>
    );
}