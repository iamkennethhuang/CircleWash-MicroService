import React, {useState, useEffect} from 'react';
import NavBar from '../navbar/index';
import { Box, CssBaseline, Container, Toolbar, Typography, Button, TextField, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody, Select, MenuItem} from '@mui/material';
import localstorageService from '../../services/localstorageService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RequestPopup from './requestPopup';

function Row({request}){
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <TableRow key={request._id} onClick={() => setOpen(true)}>
                <TableCell align="left">{request.supportCaseId}</TableCell>
                <TableCell align="left">{request.solutionType}</TableCell>
                <TableCell align="left">{request.amount}</TableCell>
                <TableCell align="left">{request.refundType}</TableCell>
            </TableRow> 
            <RequestPopup request={request} open={open} setOpen={setOpen}/>
        </React.Fragment>
    )
}

export default function CaseRequest(){
    const [loggedIn, setLoggedIn] = useState(false);
    const [requests, setRequests] = useState();
    const navigate = useNavigate();

    useEffect(async () => {
        const value = await localstorageService.getLogInInfoWithExpiry('login');
        const token = await localstorageService.getLogInInfoWithExpiry('token');

        if(value === true){
            setLoggedIn(true);
        }
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
            url: "http://localhost:8000/supportcase/request/all",
        })
        .then((res)=> {
            setRequests(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    if(loggedIn === false){
        navigate('/signin');
    }

    return(
        <Box sx={{display: 'flex', pt: 5, pl: 4}}>
            <CssBaseline />
            <NavBar />
            <Container maxWidth='false'>
                <Toolbar />
                <Typography sx={{fontWeight: 700, fontSize: 30, mb:5}}>
                    Request
                </Typography>
                <Box sx={{display: 'flex', mb:5}}>
                    <TextField
                        label="Search"
                        id="outlined-size-small"
                        size="small"
                    />
                    <Button variant="contained" sx={{background: '#5F95FF', ml: 1}}>Search</Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell align="left">Case ID</TableCell>
                                <TableCell align="left">Solution Type</TableCell>
                                <TableCell align="left">Amount</TableCell>
                                <TableCell align="left">Refend Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(requests) ? (requests.map((request) => {
                                return(
                                    <Row request={request}/>
                                )
                            })) : (
                                    <TableRow>
                                        <TableCell align='center'>Loading...</TableCell>
                                    </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    )
}