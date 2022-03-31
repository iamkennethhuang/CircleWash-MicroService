import React, {useState, useEffect} from 'react';
import NavBar from '../navbar/index';
import { Box, CssBaseline, Container, Toolbar, Typography, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Checkbox, Tooltip, IconButton} from '@mui/material';
import localstorageService from '../../services/localstorageService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonOffIcon from '@mui/icons-material/PersonOff';



export default function PendingStaff(){
    const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
    const [loggedIn, setLoggedIn] = useState(false);
    const [pendingStaff, setPendingStaff] = useState([]);
    const [selected, setSelected] = useState([]);
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
            url: 'http://localhost:8000/employee/pending/all',
        })
        .then((res) => {
            setPendingStaff(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    if(loggedIn === false){
        navigate('/signin');
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          setSelected(pendingStaff.map(p => p._id)); //need to fix
          return;
        }
        setSelected([]);
      };
    
    const handleSelectClick = (event) => {
        if (event.target.checked) {
            setSelected([...selected, event.target.name]);
            return;
        }
        setSelected(selected.filter((s) => s !== event.target.name));
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleAcceptClick = async () => {
        const token = await localstorageService.getLogInInfoWithExpiry('token');
        for(let i = 0; i < selected.length; i++){
            const staffId = selected[i];
            axios({
                method: 'put',
                headers: { Authorization: `Bearer ${token}` },
                url: "http://localhost:8000/employee/pending/approve",
                data: {
                    pendingId: staffId
                }
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        window.location.reload();
    }

    const handleDenyClick = async () => {
        const token = await localstorageService.getLogInInfoWithExpiry('token');
        for(let i = 0; i < selected.length; i++){
            const staffId = selected[i];
            axios({
                method: 'put',
                headers: { Authorization: `Bearer ${token}` },
                url: "http://localhost:8000/employee/pending/deny",
                data: {
                    _id: staffId
                }
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        window.location.reload();
    }

    const TableToolbar = (props) => {
        const {numSelected} = props;
    
        return (
            <Toolbar sx={{background: (numSelected > 0) ? "#E5EEFA" : "#FFFFFF"}}>
                {numSelected > 0 ? (
                    <Typography sx={{flexGrow: 1}}>
                        {numSelected} selected
                    </Typography>) : (
                    <Typography sx={{flexGrow: 1}}>
                        Pending Staff
                    </Typography>)} 
                {numSelected > 0 && (
                    <Tooltip title='Accept'>
                        <IconButton onClick={handleAcceptClick}>
                            <PersonAddAlt1Icon />
                        </IconButton>
                    </Tooltip>)}
                {numSelected > 0 && (
                    <Tooltip title='Deny'>
                        <IconButton onClick={handleDenyClick}>
                            <PersonOffIcon />
                        </IconButton>
                    </Tooltip>)}
            </Toolbar>
        )
    }
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
                <TableToolbar numSelected={selected.length}/>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell padding="checkbox">
                                    <Checkbox 
                                        color="primary" 
                                        indeterminate={selected.length > 0 && selected.length < pendingStaff.length}
                                        checked={pendingStaff.length > 0 && selected.length === pendingStaff.length}
                                        onChange={handleSelectAllClick}
                                        />
                                </TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(pendingStaff.length > 0) && (
                                pendingStaff.map((ps) => {
                                    return (
                                        <TableRow 
                                            key={ps._id}
                                            hover>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    name={ps._id}
                                                    color='primary' 
                                                    checked= {isSelected(ps._id)}
                                                    onChange={(e) => handleSelectClick(e)}/>
                                            </TableCell>
                                            <TableCell align="left">{ps.firstName} {ps.lastName}</TableCell>
                                            <TableCell align='left'>{ps.email}</TableCell>
                                            <TableCell align='left'>{new Date(ps.createdAt).toLocaleDateString("en-US", options)}</TableCell>
                                        </TableRow>)}))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    )
}