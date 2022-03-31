import React, {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Paper, Toolbar, Box, Typography, IconButton, TableContainer, Table, TableHead} from '@mui/material';
import { TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import localstorageService from '../../services/localstorageService';

export default function UnSolvedTable(){
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [dataOrder, setDateOrder] = useState(1);
    let navigate = useNavigate();
    

    useEffect(async () => {
        const token = await localstorageService.getLogInInfoWithExpiry('token');
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://localhost:8000/supportcase/status',
            params:{
                status: "UNHANDLED",
                order: dataOrder
            }
        })
        .then(function (res){ 
            setData(res.data);
        })
        .catch((err) => console.log(err));
    }, [dataOrder]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleFliterClick = () => {
        setDateOrder(dataOrder *  -1);
    }

    const handleRowClick = (complaint) => {
        navigate(`/case/dashboard/1/${complaint._id}`);
    }

    const attributs = [{name: 'Customer', position: 'left'}, 
    {name: 'Date', position: 'left'},
    {name: 'Machine Type', position: 'left'},
    {name: 'Machine No.', position: 'right'}];

    const emptyRows = 
        (page > -1) ? Math.max(0, (page + 1)* 5 - data.length) : 0;

    const options = {year: 'numeric', month: 'numeric', day: 'numeric',  hour: 'numeric', minute: 'numeric'};
    
    return(
        <Paper sx={{mt:5}}> 
            <CssBaseline />  
            <Toolbar>
                <Typography sx={{fontWeight: 700, fontSize: 20, flex:'1'}}>
                    Open Complaints
                </Typography>
                <Typography>
                    <IconButton onClick={handleFliterClick}>
                        <FilterListIcon />
                    </IconButton>
                </Typography>
            </Toolbar>
            <TableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            {attributs.map((attribute) => (
                                <TableCell key={attribute.name} align={attribute.position} sx={{fontWeight: 600}}> {attribute.name} </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(data.length > 0) && data
                            .slice(page * 5, page * 5 + 5)
                            .map((d) => (
                            <TableRow hover key={d._id} onClick={() => handleRowClick(d)}>
                                <TableCell align='left' sx={{color: '#65ABE2'}}> {d.supportInfo.firstName} {d.supportInfo.lastName}</TableCell>
                                <TableCell align='left'> {new Date(d.supportInfo.date).toLocaleDateString("en-US", options)} </TableCell>
                                <TableCell align='left'> {d.supportInfo.machineType} </TableCell>
                                <TableCell align='right'> {d.supportInfo.machineNo} </TableCell>
                            </TableRow>
                            ))}
                        {emptyRows > 0 && (
                            <TableRow style={{
                                height: 53 * emptyRows,
                              }} >
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination 
            rowsPerPageOptions={[]}
            component="div"
            count={data.length}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}/>
        </Paper> 
    );
}