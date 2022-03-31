import React, {useState} from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function AddressPopup(props){
    const [address, setAddress] = useState({
        name: '',
        street: '',
        city: '',
        zip: 0,
    });

    const handleClose = () => {
        props.setOpenAddress(false);
    }

    const handleSubmit = () => {
        props.setOpenAddress(false);

        axios({
            method:'put',
            withCredentials: true,
            url: 'http://localhost:5000/user/address/add',
            data: {
                address: address,
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
        <Dialog open={props.openAddress} onClose={handleClose}>
            <DialogTitle>Add an address</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Changes made to your profile name here, will be shown anywhere your profile is used.
                </DialogContentText>
                <TextField
                    margin='dense'
                    id='name'
                    label='Reciever'
                    fullWidth
                    variant='standard'
                    onChange={(e) => setAddress({...address, name: e.target.value})}
                />
                <TextField
                    margin='dense'
                    id='street'
                    label='Street'
                    fullWidth
                    variant='standard'
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                />
                <TextField
                    margin='dense'
                    id='city'
                    label='City'
                    fullWidth
                    variant='standard'
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                />
                <TextField
                    margin='dense'
                    id='zip'
                    label='Zip'
                    fullWidth
                    variant='standard'
                    onChange={(e) => setAddress({...address, zip: e.target.value})}
                />
                <DialogActions>
                    <Button onClick={handleSubmit}>Save Changes</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}