import React, {useEffect, useState} from 'react';
import { Container, CssBaseline, Box, Typography, Link} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

export default function SuccessSignUp(){
    return (
        <Container maxWidth='sm' sx={{mt: 10}}>
            <CssBaseline />
            <Box
                elevation={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <DoneIcon sx={{fontSize: 80, color: "#219477", background: "#F2FDFA", borderRadius: "50px"}}/>
                    <Typography sx={{fontSize: 30, fontWeight: 700, color: "#219477", mt: 5}}>
                        Your sign up request is submitted.
                    </Typography>
                    <Typography sx={{fontSize: 12, mb: 5}}>
                        When your request is approved a notification email will be sent to your email inbox.
                    </Typography>
                    <Link href="/signin" underline="hover" variant="body2" sx={{color: "black", fontWeight: 700}}>
                        Sign in
                    </Link>
            </Box>
        </Container>
    )
}