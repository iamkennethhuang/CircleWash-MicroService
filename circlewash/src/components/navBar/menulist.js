import React from 'react';
import { Box} from '@mui/material';
import { List } from '@mui/material';
import { ListItemText } from '@mui/material';
import { ListItemButton } from '@mui/material';
import { ListItem } from '@mui/material';
import { Paper } from '@mui/material';
import logo from '../../pictures/logo.svg';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

export const menulist = (
    <div style={{ width: '100%' }}>
    <Box sx={{justifyContent: 'center', display: 'flex'}}>
        <Button elevation={0} sx={{ mt: 7, mb: 3}}>
            <Link href='/'>
                <img src={logo} className="App-logo" alt="logo" />
            </Link>
        </Button>
    </Box>
    <Box sx={{width: 300, justifyContent: 'center', display: 'flex'}}>
        
        <List>
            <ListItem >
                <ListItemButton>
                    <ListItemText primary="Service" />
                </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton>
                    <ListItemText primary="FasCard" />
                </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton>
                    <ListItemText primary="Delivery" />
                </ListItemButton>
            </ListItem> 
            <ListItem >
                <ListItemButton >
                    <Link href='/support'>
                        <ListItemText primary="Support" />
                    </Link>
                </ListItemButton>
            </ListItem> 
            <ListItem >
                <ListItemButton>
                    <Link href='/contactus'>
                        <ListItemText primary="Contact Us" />
                    </Link>
                </ListItemButton>    
            </ListItem>
            <ListItem >
                <ListItemButton>
                    <ListItemText primary="About" />
                </ListItemButton>
            </ListItem>  
        </List>
    </Box>
    </div>
);


