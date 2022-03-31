import React, {useState, useEffect} from 'react';
import { Box, CssBaseline, Container, Toolbar, Typography, TextField, Grid, Button, Tabs, Tab} from '@mui/material';
import localstorageService from '../../services/localstorageService';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../navbar/index';
import Case from '../case/index';
import Complaint from '../complaint/index';
import CaseSolution from '../caseSolution';
import axios from 'axios';

export default function CaseDashboard(){
    const navigate = useNavigate();
    const [user, setUser] = useState();
    let params = useParams();
    const caseId = params.id;
    const tap = Number(params.tap);
    const [loggedIn, setLoggedIn] = useState(false);
    const [value, setValue] = useState(tap);
    const [fileCase, setFileCase] = useState();

    useEffect(async() => {

        const loginValue = await localstorageService.getLogInInfoWithExpiry('login');
        const token = await localstorageService.getLogInInfoWithExpiry('token');
        if(loginValue === true){
            setLoggedIn(true);
        }
        axios({
            method:'get',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://localhost:8000/supportcase/single',
            params: {
                supportCaseId: caseId
            }
        })
        .then((res) => {
            setFileCase(res.data);
        })
        .catch((err) => {
            console.log(err.response.data);
        })
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://localhost:8000/employee/profile'
        })
        .then((res) => {
          setUser(res.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    if(loggedIn === false){
        navigate('/signin');
    }

    function TabPanel(props) {
        const { children, value, index} = props;
      
        return (
            <Container 
                maxWidth='false' 
                hidden={value !== index}>
                {(value === index) && (
                    children
                )}
            </Container>
        );
    }

    return(
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <NavBar/>
            (<Container maxWidth='false'>
                <Toolbar />
                <Box sx={{ borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label='Case Communicate' />
                        <Tab label='Report File' />
                        <Tab label='Solution' />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {(fileCase) && (<Case caseId={caseId} fileCase={fileCase}/>)}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {(fileCase) && (<Complaint complaint={fileCase} />)}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {(fileCase) && (<CaseSolution fileCase={fileCase} user={user}/>)}
                </TabPanel>
            </Container>)
        </Box>
    );
}