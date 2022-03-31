import React, {useEffect, useState} from 'react';
import { Container, CssBaseline, Box, Typography, Link, TextField, Button, Divider, Alert, AlertTitle} from '@mui/material';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import localstorageService from '../../services/localstorageService';

export default function SignIn(){
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[errorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    
    useEffect(async () => {
        const value = await localstorageService.getLogInInfoWithExpiry('login');
        if(value === true){
            setLoggedIn(true);
        }
    }, []);

    const handleSubmit = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/employee/login',
            data: {
                email: email,
                password: password
            },
        })
        .then(async(res) => {
            localstorageService.setLogInInfoWithExpiry('login', true);
            localstorageService.setLogInInfoWithExpiry('token', res.data.token);
            localstorageService.setLogInInfoWithExpiry('role', res.data.role);
            localstorageService.setLogInInfoWithExpiry('id', res.data._id);
            setLoggedIn(true);
        })
        .catch((error) => {
            if(error.response){
                console.log(error.response)
            }
        })
    }

    if(loggedIn){
        navigate('/');
    }

    return(
        <Container maxWidth='false'>
            <CssBaseline />
            {(errorMessage !== '') &&
            (<Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{errorMessage}</strong>
            </Alert>) }
            <Container maxWidth='xs'>  
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <Typography sx={{fontSize: 60, fontWeight: 700, alignSelf: 'center', mb: 3, fontFamily: "serif"}}>
                        Sign In
                    </Typography>
                    <Box component="form" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',}}>
                        <TextField
                        required
                        fullWidth
                        label="Email"
                        variant="standard"
                        onChange={(e) => {setEmail(e.target.value)}}
                        sx={{mb:1}}
                        />
                        <TextField
                        required
                        fullWidth
                        type="password"
                        label="Password"
                        variant="standard"
                        onChange={(e) => {setPassword(e.target.value)}}
                        sx={{mb:1}}
                        />
                        <Link underline="hover" variant="body2" sx={{ml:1, mb:5, color: "black"}}>
                            Forgot your password?
                        </Link>
                        <Button
                            disabled = {(email === '' && password === '')}
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{background: "black", width: "50%", borderRadius: "0px"}}
                            >
                            Sign In
                        </Button>
                        <Divider sx={{mt:2, mb:2, color: "black"}}>
                            <Typography sx={{fontWeight: 700}}>
                                OR
                            </Typography>
                        </Divider>
                        <Typography variant="body2" >
                            Don't have an Account? 
                            <Link href="/signup" underline="hover" variant="body2" sx={{ml:1, color: "black", fontWeight: 700}}>
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Container>
    )
}

