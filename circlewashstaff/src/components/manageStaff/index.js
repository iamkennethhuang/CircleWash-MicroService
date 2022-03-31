import React, {useState, useEffect} from 'react';
import NavBar from '../navbar/index';
import { Box, CssBaseline, Container, Toolbar, Typography, Button, TextField, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody, Select, MenuItem} from '@mui/material';
import localstorageService from '../../services/localstorageService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ManageStaff(){
    const [loggedIn, setLoggedIn] = useState(false);
    const [staffs, setStaffs] = useState();
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
            url: "http://localhost:8000/employee/all",
        })
        .then((res)=> {
            setStaffs(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    if(loggedIn === false){
        navigate('/signin');
    }

    const handleSelectChange = async (e, staff) => {
        const token = await localstorageService.getLogInInfoWithExpiry('token');
        axios({
            method: 'put',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://localhost:8000/employee/role',
            data: {
                employeeId: e.target.name,
                role: e.target.value
            }
        })
        .then(() => {
            window.location.reload();
        })
        .catch((err) => {
            console.log(err)
        })
    }


    console.log("test", staffs);

    return(
        <Box sx={{display: 'flex', pt: 5, pl: 4}}>
            <CssBaseline />
            <NavBar />
            <Container maxWidth='false'>
                <Toolbar />
                <Typography sx={{fontWeight: 700, fontSize: 30, mb:5}}>
                    Memeber
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
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(staffs) ? (staffs.map((staff) => {
                                return(
                                <TableRow key={staff.email}>
                                    <TableCell align="left">{staff.firstName} {staff.lastName}</TableCell>
                                    <TableCell align="left">{staff.email}</TableCell>
                                    <TableCell align="left">
                                        <Select
                                            name={staff._id}
                                            value={staff.role}
                                            onChange={(e) => handleSelectChange(e, {staff})}
                                            >
                                            <MenuItem value={"admin"}>Admin</MenuItem>
                                            <MenuItem value={"support"}>Support</MenuItem>
                                        </Select>
                                    </TableCell>
                                </TableRow> )
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