import React, {useState} from 'react';
import { Button, Box, Typography} from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import localstorageService from '../../services/localstorageService';

export default function RequestPopup({request, open, setOpen}){

    const handleClose = () => {
        setOpen(false);
    }

    const handleReject = async() => {
        const token = await localstorageService.getLogInInfoWithExpiry('token');
        axios({
            method:'put',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://localhost:8000/supportcase/request/deny',
            data: {
                supportCaseId: request.supportCaseId,
                requestId: request._id,
            }
        })
        .then((res) => {
            console.log(res);
            setOpen(false);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleAccept = async() => {
        const token = await localstorageService.getLogInInfoWithExpiry('token');
        axios({
            method:'put',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://localhost:8000/supportcase/request/approve',
            data: {
                supportCaseId: request.supportCaseId,
                requestId: request._id,
            }
        })
        .then((res) => {
            console.log(res);
            setOpen(false);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Request Detail</DialogTitle>
            <DialogContent>
                <Box sx={{mt:2}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                        <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                            Support Case ID: 
                        </Typography>
                        <Typography sx={{fontWeight: 300, fontSize: 16}}>
                            {request.supportCaseId} 
                        </Typography>    
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                        <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                            Solution Type: 
                        </Typography>
                        <Typography sx={{fontWeight: 300, fontSize: 16}}>
                            {request.solutionType} 
                        </Typography>    
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                        <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                            Amount: 
                        </Typography>
                        <Typography sx={{fontWeight: 300, fontSize: 16}}>
                            {request.amount} 
                        </Typography>    
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                        <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                            Refund Type: 
                        </Typography>
                        <Typography sx={{fontWeight: 300, fontSize: 16}}>
                            {request.refundType} 
                        </Typography>    
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                        <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                            Summary: 
                        </Typography>
                        <Typography sx={{fontWeight: 300, fontSize: 16}}>
                            {request.summary} 
                        </Typography>    
                    </Box>
                </Box>
                <Box sx={{display: 'flex', justifyContent: "space-between", mt:5}}>
                    <DialogActions>
                        <Button variant="contained" onClick={() => handleReject()} sx={{background: '#F97C7C'}}>Reject</Button>
                    </DialogActions>
                    <DialogActions>
                        <Button variant="contained" onClick={() => handleAccept()} sx={{background: '#BBEDB5'}}>Accept</Button>
                    </DialogActions>
                </Box>

                
            </DialogContent>
        </Dialog>
    )
}