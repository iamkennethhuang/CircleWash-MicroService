import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { Container, Typography, Grid, List, ListSubheader, ListItem, ListItemText} from '@mui/material';
import { CssBaseline } from '@mui/material';
import CustomGanttChart from './customGanttChart';
import { useNavigate, useParams } from 'react-router-dom';
import localstorageService from '../../services/localstorageService';

export default function Complaint ({complaint}){
    const [allError, setAllError] = useState();
    const [ganttData, setGanttData] = useState();
    const options = {year: 'numeric', month: 'numeric', day: 'numeric',  hour: 'numeric', minute: 'numeric'};
    const apiOption = {year: 'numeric', month: 'numeric', day: 'numeric'};
    
    useEffect(() => {
        setAllError(complaint.errorData);
        
        setGanttData(complaint.ganttData);
    }, [])

    console.log('hi', complaint.ganttData);
    return (
        <Box sx={{display: 'flex', pt:3}}>
            <CssBaseline />           
            <Container maxWidth='false' sx={{}}>
                <Box sx={{display: 'flex', mb: 3}}>
                    <Typography sx={{fontWeight: 700, fontSize: 25}}>
                        Complaint 
                    </Typography>
                    <Typography alignSelf='center' sx={{fontSize: 18, ml:3, color: '#5579C6'}}>
                        #{complaint._id}
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={6} >
                        <Box sx={{
                            background:'#EFF1F2',
                            height: '100%',
                            pt: 2,
                            pl: 2,
                            pb: 2,
                            pr: 2
                            }}>
                            <Typography sx={{fontWeight: 700, fontSize: 20, mb: 3}}>
                                Customer Information 
                            </Typography>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Name: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.supportInfo.firstName} {complaint.supportInfo.lastName}
                                </Typography>    
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Phone: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.supportInfo.phone}
                                </Typography>     
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between',}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Email: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.supportInfo.email}
                                </Typography>      
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} >
                        <Box sx={{
                            background:'#EFF1F2',
                            height: '100%',
                            pt: 2,
                            pl: 2,
                            pb: 2,
                            pr: 2
                            }}>
                            <Typography sx={{fontWeight: 700, fontSize: 20, mb: 3}}>
                                Complaint Detail
                            </Typography>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Machine Type:
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.supportInfo.machineType}
                                </Typography>     
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Machine No.: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.supportInfo.machineNo}
                                </Typography>     
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Amount: 
                                </Typography>          
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.supportInfo.amount} usd
                                </Typography>   
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Payment method: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.supportInfo.payType} 
                                </Typography>     
                            </Box>
                            {(complaint) && ((complaint.supportInfo.payType === 'FasCard') && 
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    FasCard Number: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.supportInfo.fasCardNum} 
                                </Typography>   
                            </Box>)}
                            {(complaint.supportInfo.payType === 'CreditCard') && 
                            (<Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Credit/Debit Card (last 4 digits): 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.supportInfo.creditCardNum} 
                                </Typography>     
                            </Box>)}
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Date: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {new Date(complaint.date).toLocaleDateString("en-US", options)} 
                                </Typography>      
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between',}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Details: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.supportInfo.description} 
                                </Typography>      
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{
                            background:'#EFF1F2',
                            height: '100%',
                            pt: 2,
                            pl: 2,
                            pr: 2,
                            pb:2
                            }}>
                            <Typography sx={{fontWeight: 700, fontSize: 20, mb: 3}}>
                                Machine #{complaint.supportInfo.machineNo} Errors on {new Date(complaint.supportInfo.date).toLocaleDateString("en-US", apiOption)} 
                            </Typography>
                            <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 'false',
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 300,
                                    '& ul': { padding: 0 },
                                }}
                                subheader={<li />}>
                                {(allError) && ((allError.length > 0) ? (allError.map((error) => (
                                    <li key={`error-type-${error}`}>
                                        <ul>
                                            <ListSubheader>
                                                `${error.errorType}`
                                            </ListSubheader>
                                            <ListItem key={`item-${error.errorType}-${error.message}-${error.time}`}>
                                                <ListItemText primary={`${error.message} at ${new Date(error.time).toLocaleDateString("en-US", options)}`} />
                                            </ListItem>
                                        </ul>
                                    </li>
                                ))): (
                                    <ListItem key={`item-no-error`}>
                                        <ListItemText primary={"No Error Found"} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box sx={{
                                background:'#EFF1F2',
                                pt: 2,
                                pl: 2,
                                pr: 2,
                                pb:2
                                }}>
                            <Typography sx={{fontWeight: 700, fontSize: 20, mb: 3, pl: 2}}>
                                Machine #{complaint.supportInfo.machineNo} Status on {new Date(complaint.supportInfo.date).toLocaleDateString("en-US", apiOption)} 
                            </Typography>
                            {(ganttData) && <CustomGanttChart ganttData={ganttData}/>}
                        </Box>
                    </Grid>
                </Grid>  
            </Container>
        </Box>
    );
}