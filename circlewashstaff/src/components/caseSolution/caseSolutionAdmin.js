import React, {useState}from 'react';
import { Container, CssBaseline, Typography, Box, Grid, Select, MenuItem, InputLabel, TextField, Button} from '@mui/material';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import CasePendingRefund from './casePendingRefund';
import localstorageService from '../../services/localstorageService';

export default function CaseSolutionAdmin({fileCase}){
    const [solutionType, setSolutionType] = useState();
    const [amount, setAmount] = useState(null);
    const [refundType, setRefundType] = useState(null);
    const navigate = useNavigate();

    const handleCompleteClick = async () =>{
        const token = await localstorageService.getLogInInfoWithExpiry('token');
        axios({
            method: 'post',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://localhost:8000/supportcase/submit/solution',
            data: {
                supportCaseId: fileCase._id,
                solutionType: solutionType,
                amount: amount,
                refundType: refundType,
            }
        })
        .then((res) => {
            console.log(res.data);
            navigate('/case');
            window.location.reloard();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <Container maxWidth='sm' sx={{pt:3}}>
            <CssBaseline />
            <Box>
                <Typography sx={{fontWeight: 700, fontSize: 25}}>
                    Manage Case Solution 
                </Typography>
            </Box>
            <Box width="100%" sx={{ pt:3.5, pb:2, pr: 2}}>
                <Typography sx={{fontWeight: 600, fontSize: 20}}>
                    Create a new Solution
                </Typography>
                <InputLabel sx={{mt:3}}>Solution Type</InputLabel>
                <Select
                    fullWidth
                    value={solutionType}
                    onChange={(e) => setSolutionType(e.target.value)}
                >
                    <MenuItem value={'Complaint resolved with no refund'}>Complaint resolved with no refund</MenuItem>
                    <MenuItem value={'Complaint denied'}>Complaint denied</MenuItem>
                    <MenuItem value={'Complaint addressed with cash refund'}>Complaint addressed with cash refund</MenuItem>
                    <MenuItem value={'Complaint addressed with FasCard credit refund'}>Complaint addressed with FasCard credit refund</MenuItem>
                    <MenuItem value={'Complaint addressed with FasCard card and credit refund'}>Complaint addressed with FasCard card and credit refund</MenuItem>
                </Select>
                {(solutionType) && ((solutionType !== 'Complaint resolved with no refund' && solutionType !== 'Complaint denied') &&
                (<React.Fragment>
                    <InputLabel>Amount</InputLabel>
                    <TextField
                        fullWidth
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        />
                    <InputLabel>Refund Type</InputLabel>
                    <Select
                        fullWidth
                        value={refundType}
                        onChange={(e) => setRefundType(e.target.value)}
                    >
                        <MenuItem value={'Cash'}>Cash</MenuItem>
                        <MenuItem value={'FasCard Credit'}>FasCard Credit</MenuItem>
                        <MenuItem value={'FasCard Credit with FasCard'}>FasCard Credit with FasCard</MenuItem>
                    </Select>
                </React.Fragment>))}
                <Box width="100%" sx={{mt:3, display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        sx={{}}
                        onClick={() => {handleCompleteClick()}}
                        variant="contained">
                        Complete Case
                    </Button>
                </Box>
            </Box> 
        </Container>
    )
}

// display: 'flex', flexDirection: 'row-reverse',