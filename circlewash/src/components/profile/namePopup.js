import React, {useState} from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function NamePopup(props){
    const [name, setName] = useState({
        "firstName": '',
        "lastName": '',
    });

    const handleClose = () => {
        props.setOpenName(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setOpenName(false);
        axios({
            method:'put',
            withCredentials: true,
            url: 'http://localhost:5000/user/name',
            data: {
                firstName: name.firstName,
                lastName: name.lastName,
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
        <Dialog open={props.openName} onClose={handleClose}>
            <DialogTitle>Edit your name</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Changes made to your profile name here, will be shown anywhere your profile is used.
                </DialogContentText>
                <TextField
                    margin='dense'
                    id='fistName'
                    label='First Name'
                    fullWidth
                    variant='standard'
                    onChange={(e) => setName({...name, "firstName": e.target.value})}
                />
                <TextField
                    margin='dense'
                    id='lastName'
                    label='Last Name'
                    fullWidth
                    variant='standard'
                    onChange={(e) => setName({...name, "lastName": e.target.value})}
                />
                <DialogActions>
                    <Button onClick={(e) => handleSubmit(e)}>Save Changes</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}