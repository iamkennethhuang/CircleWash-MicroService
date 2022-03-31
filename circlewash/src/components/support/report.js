import React from 'react';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { OutlinedInput } from '@mui/material';
import { FormControl } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';

function FasCardInput(reportInfo, setReportInfo){
    return(
        <Grid item xs={12} md={6}>
            <TextField fullWidth name='fasCardNum' label='FasCard Number' varient='outlined' onChange={(e) => setReportInfo({...reportInfo, fasCardNum: e.target.value})} />
        </Grid>
    );
}

function creditCardInput(reportInfo, setReportInfo){
    return(
        <Grid item xs={12} md={6}>
            <TextField fullWidth name='creditCardNum' label='Credit/Debit Card (last 4 digits)' varient='outlined' onChange={(e) => setReportInfo({...reportInfo, creditCardNum: e.target.value})} />
        </Grid>
    );
}

export default function Report({reportInfo, setReportInfo}){
    
    function checkPayType(reportInfo, setReportInfo){
        if(reportInfo.payType === 'CreditCard'){return creditCardInput(reportInfo, setReportInfo) }
        if(reportInfo.payType === 'FasCard'){return FasCardInput(reportInfo, setReportInfo)}
    }

    return(
        <Box sx={{ 
            pl: 5,
            pr: 5,
            pt: 5,
            pb: 5,
            mb: 5,
            background: '#FFFFFF',
            borderColor: '#707070',
            border: 1}}>
            <Typography sx={{fontWeight: 700, fontSize: 30, mb: 5}}>
                Out of Service
            </Typography>
            <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel >Machine Type</InputLabel> 
                        <Select
                            value={reportInfo.machineType}
                            label="Machine Type"
                            onChange={(e) => setReportInfo({...reportInfo, machineType: e.target.value})}>
                        <MenuItem value='Washer'>Washer</MenuItem>
                        <MenuItem value='Dryer'>Dryer</MenuItem>
                        <MenuItem value='Coin Changer'>Coin Changer</MenuItem>
                        <MenuItem value='FasCard Machine'>FasCard Machine</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth name='machineNo' label='Machine No.' varient='outlined' onChange={(e) => setReportInfo({...reportInfo, machineNo: e.target.value})} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                            name='amount'
                            onChange={(e) => setReportInfo({...reportInfo, amount: e.target.value})}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={DateAdapter} >
                        <DesktopDatePicker
                            label='Date'
                            inputFormat="MM/dd/yyyy"
                            value={reportInfo.date}
                            onChange={(newValue) => setReportInfo({...reportInfo, date: newValue})}
                            renderInput={(params) => <TextField  {...params} sx={{width: '100%'}} />} 
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel >Payment method</InputLabel> 
                        <Select
                            value={reportInfo.payType}
                            label="Payment method"
                            onChange={(e) => setReportInfo({...reportInfo, payType: e.target.value})}>
                        <MenuItem value='Coin'>Coin</MenuItem>
                        <MenuItem value='CreditCard'>Credit/Debit Card</MenuItem>
                        <MenuItem value='FasCard'>FasCard</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {checkPayType(reportInfo, setReportInfo)}
                <Grid item xs={12}>
                    <TextField fullWidth multiline name='description' rows={7} label="Describe trouble" onChange={(e) => setReportInfo({...reportInfo, description: e.target.value})} />
                </Grid>
            </Grid>
        </Box>
    )
}