import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Paper, Toolbar, Box, Typography, IconButton, TableContainer, Table, TableHead} from '@mui/material';
import { TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import localstorageService from '../../services/localstorageService';

const attributs = [{name: 'Customer', position: 'left'}, 
    {name: 'Date', position: 'left'},
    {name: 'Machine Type', position: 'left'},
    {name: 'Machine No.', position: 'right'}];

const options = {year: 'numeric', month: 'numeric', day: 'numeric',  hour: 'numeric', minute: 'numeric'};

export default class SolvedTable extends React.Component{

    constructor(props) {
        super(props);
        this.state =
        {
            page: 0,
            data: [],
            dataOrder: 1,
            id: null,
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleFliterClick = this.handleFliterClick.bind(this);
        this.handleSetData = this.handleSetData.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleSetData(newData){
        this.setState({data: newData});
    }

    handleFliterClick (){
        this.setState({dataOrder: (this.state.dataOrder * -1)})
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
        
    };

    handleRowClick = (complaint) => {
        this.setState({id: complaint._id});
    }

    async componentDidMount() {
        const token = await localstorageService.getLogInInfoWithExpiry('token');
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://localhost:8000/supportcase/status',
            params:{
                status: "HANDLED",
                order: this.state.dataOrder
            }
        })
        .then((res) => { 
            this.handleSetData(res.data);
        })
        .catch((err) => console.log(err));
    }

    async componentDidUpdate(prevProps, prevState) {
        const token = await localstorageService.getLogInInfoWithExpiry('token');
        if(prevState.dataOrder != this.state.dataOrder){
            axios({
                method: 'get',
                headers: { Authorization: `Bearer ${token}` },
                url: 'http://localhost:8000/supportcase/status',
                params:{
                    status: "HANDLED",
                    order: this.state.dataOrder
                }
            })
            .then((res) => { 
                this.handleSetData(res.data);
            })
            .catch((err) => console.log(err));
        }
    }    


    render(){
        return(
            <Paper sx={{mt:5}}> 
                <CssBaseline />  
                {(this.state.id != null) && (
                    <Navigate to={`/case/dashboard/1/${this.state.id}`} />
                )}
                <Toolbar>
                    <Typography sx={{fontWeight: 700, fontSize: 20, flex:'1'}}>
                        Resolved Complaints
                    </Typography>
                    <Typography>
                        <IconButton onClick={this.handleFliterClick}>
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
                            {(this.state.data.length > 0) && this.state.data
                                .slice(this.state.page * 5, this.state.page * 5 + 5)
                                .map((d) => (
                                <TableRow hover key={d._id} 
                                onClick={() => this.handleRowClick(d)}>
                                    <TableCell align='left' sx={{color: '#65ABE2'}}> {d.supportInfo.firstName} {d.supportInfo.lastName}</TableCell>
                                    <TableCell align='left'> {new Date(d.supportInfo.date).toLocaleDateString("en-US", options)} </TableCell>
                                    <TableCell align='left'> {d.supportInfo.machineType} </TableCell>
                                    <TableCell align='right'> {d.supportInfo.machineNo} </TableCell>
                                </TableRow>
                                ))}
                            {(((this.state.page > -1) ? Math.max(0, (this.state.page + 1)* 5 - this.state.data.length) : 0) > 0) && (
                                <TableRow style={{
                                    height: 53 * ((this.state.page > -1) ? Math.max(0, (this.state.page + 1)* 5 - this.state.data.length) : 0),
                                }} >
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination 
                rowsPerPageOptions={[]}
                component="div"
                count={this.state.data.length}
                rowsPerPage={5}
                page={this.state.page}
                onPageChange={this.handleChangePage}/>
            </Paper> 
        );
    }
}




