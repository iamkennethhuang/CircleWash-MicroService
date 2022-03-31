import React, {useState} from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function PhonePopup(props){
    const [phone, setPhone] = useState('');

    const handleClose = () => {
        props.setOpenPhone(false);
    }

    const handleSubmit = () => {
        props.setOpenPhone(false);
        axios({
            method:'put',
            withCredentials: true,
            url: 'http://localhost:5000/user/phone',
            data: {
                phone: phone,
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

 
    return(
        <Dialog open={props.openPhone} onClose={handleClose}>
            <DialogTitle>Edit your phone</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Changes made to your profile name here, will be shown anywhere your profile is used.
                </DialogContentText>
                <TextField
                    margin='dense'
                    id='phone'
                    label='Phone'
                    fullWidth
                    variant='standard'
                    onChange={(e) => setPhone(e.target.value)}
                />
                <DialogActions>
                    <Button onClick={handleSubmit}>Save Changes</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}