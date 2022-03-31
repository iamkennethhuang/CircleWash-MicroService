import React, {useEffect, useState} from 'react';
import { Container, CssBaseline, Box, Typography, TextField, Link, Button, Alert, AlertTitle} from '@mui/material';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import localstorageService from '../../services/localstorageService';

export default function SignUp(){
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[errorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        const value = localstorageService.getLogInWithExpiry('login');
        if(value === true){
            setLoggedIn(true);
        }
    }, []);

    const handleSubmit = () => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/signUp/staff/pending',
            data: {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            }
        })
        .then((res) => {
            if(res.data.status === false){
                setErrorMessage(res.data.message);
            }
            if(res.data.status === true){
                navigate('/signup/success');
            }
        })
        .catch((error) => {
            if(error.response.data.message){
                setErrorMessage(error.response.data.message);
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
                        Sign Up
                    </Typography>
                    <Typography sx={{alignSelf: 'center'}}>
                        Please sign up with FasCard employee account
                    </Typography>
                    <Box component="form" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',}}>
                        <TextField
                        name="firstName"
                        required
                        fullWidth
                        label="First Name"
                        variant="standard"
                        onChange = {(e) => setFirstName(e.target.value)}
                        sx={{mb:1}}
                        />
                        <TextField
                        name="lastName"
                        required
                        fullWidth
                        label="Last Name"
                        variant="standard"
                        onChange = {(e) => setLastName(e.target.value)}
                        sx={{mb:1}}
                        />
                        <TextField
                        name="email"
                        required
                        fullWidth
                        label="Email"
                        variant="standard"
                        onChange = {(e) => setEmail(e.target.value)}
                        sx={{mb:1}}
                        />
                        <TextField
                        name="password"
                        required
                        fullWidth
                        type="password"
                        label="Password"
                        variant="standard"
                        onChange = {(e) => setPassword(e.target.value)}
                        sx={{mb:1}}
                        />
                        <Typography variant="body2" sx={{mb:5}}>
                            Already a member? 
                            <Link href="/signin" underline="hover" variant="body2" sx={{ml:1, color: "black", fontWeight: 700}}>
                                Sign in
                            </Link>
                        </Typography>
                        <Button
                            disabled= {! (firstName !== '' && lastName !== '' && email !== '' && password !== '')}
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{background: "black", width: "50%", borderRadius: "0px"}}
                            >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
}