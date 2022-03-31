import React, { useState, useEffect } from 'react';
import { AppBar, IconButton, Toolbar, Typography, Drawer, Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { menulist } from './menulist';
import { Button } from '@mui/material';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function CWBar() {
    const [auth, setAuth] = useState(false);
    const [open, setOpen] = useState(false);
    const [initial, setInitial] = useState('');
    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/user/islogin'
        })
        .then((res) => {
            setAuth(res.data);
            if(res.data === true){
                axios({
                    method: 'get',
                    withCredentials: true,
                    url: 'http://localhost:5000/user/'
                })
                .then((res) => setInitial(res.data.firstName.substring(0,1).toUpperCase()))
            }
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
    }, []);
    
    let navigate = useNavigate();

    function handleAvatarClick () {
        navigate('/profile');
    };

    return(
        <Box sx={{ }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar variant="dense" >
                    <IconButton 
                    color='inherit'
                    edge="start"
                    size="large"
                    aria-label="menu"
                    sx={{ mr: 1 }}
                    onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography varient="h6" component='div' 
                    sx={{ 
                        flexGrow: 1, 
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}>
                        Circle Wash
                    </Typography>
                    {/* {(auth) ? (<IconButton href="/profile"><Avatar>{initial}</Avatar></IconButton>): (<Button color="inherit" href="/signin">Login</Button>)} */}
                </Toolbar>   
            </AppBar>
            <Drawer 
                open={open}
                onClose={toggleDrawer}
            >
                {menulist}
            </Drawer>
        </Box>
    );
}


