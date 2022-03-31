import React from 'react';
import { Box, Container, Typography, Button} from '@mui/material';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function CasePendingRefund({fileCase}){
    const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
    const navigate = useNavigate();

    const handleDenyClick = () =>{
        axios({
            method: 'put',
            withCredentials: true,
            url: 'http://localhost:5000/solution/deny',
            data: {
                fileCase: fileCase,
            }
        })
        .then((res) => {
            console.log(res);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleApproveClick = () =>{
        axios({
            method: 'put',
            withCredentials: true,
            url: 'http://localhost:5000/solution/approve',
            data: {
                fileCase: fileCase,
            }
        })
        .then((res) => {
            console.log((res));
            navigate('/case');
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div >
            {(fileCase.solution !== null && fileCase.solution.approve === false) ? (
                <div>
                    <Box sx={{display: 'flex', justifyContent: "space-between", mt: 3}}>
                        <Typography sx={{fontWeight: 500, fontSize: 16}}>
                            Staff Reviewed:
                        </Typography>
                        <Typography sx={{fontWeight: 500, fontSize: 16}}>
                            {fileCase.solution.staffCreated.firstName} {fileCase.solution.staffCreated.lastName} 
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: "space-between", mt: 2}}>
                        <Typography sx={{fontWeight: 500, fontSize: 16}}>
                            Staff Reviewed at:
                        </Typography>
                        <Typography sx={{fontWeight: 500, fontSize: 16}}>
                            {new Date(fileCase.solution.createdAt).toLocaleDateString("en-US", options)} 
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: "space-between", mt: 2}}>
                        <Typography sx={{fontWeight: 500, fontSize: 16}}>
                            Solution type:
                        </Typography>
                        <Typography sx={{fontWeight: 500, fontSize: 16}}>
                            {(fileCase.solution.solutionType)} 
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: "space-between", mt: 2}}>
                        <Typography sx={{fontWeight: 500, fontSize: 16}}>
                            Refund type:
                        </Typography>
                        <Typography sx={{fontWeight: 500, fontSize: 16}}>
                            {(fileCase.solution.refundType)} 
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: "space-between", mt: 3}}>
                        <Button 
                            onClick={() => {handleDenyClick()}}
                            variant='contained' sx={{background: '#FF968A'}}>
                            Deny
                        </Button>
                        <Button 
                            onClick={() => {handleApproveClick()}}
                            variant='contained' sx={{background: '#CCE2CB'}}>
                            Approve
                        </Button>
                    </Box>
                </div>                      
                ) : 
            (<Typography sx={{fontWeight: 500, fontSize: 16, mt: 3}}>
                No one have reviewed this case.
            </Typography>)}
        </div>
        
    )
}