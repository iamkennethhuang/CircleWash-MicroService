import React, {useEffect, useState} from 'react';
import HomeIcon from '@mui/icons-material/Home';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import WorkIcon from '@mui/icons-material/Work';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MuiDrawer from '@mui/material/Drawer';
import { IconButton, Divider, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import { styled, useTheme} from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import {ProtectedContent} from '../../path/protectedContent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import localstorageService from '../../services/localstorageService';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(${theme.spacing(8)} + 1px)`,
    // },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MyDrawer({open, handleDrawerClose}){
    const theme = useTheme();
    const[user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(async() => {
        const token = await localstorageService.getLogInInfoWithExpiry('token');
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://localhost:8000/employee/profile',
            
        })
        .then((res) => {
            setUser(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <Drawer variant='permanent' open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose} >
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItemButton
                    onClick={() => navigate('/')}
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" sx={{opacity: open ? 1 : 0}} />
                </ListItemButton>
                <ProtectedContent user={user} role={['admin']}>
                    <ListItemButton
                        onClick={() => navigate('/pendingstaff')}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}>
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}>
                            <HourglassBottomIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pending Staff" sx={{opacity: open ? 1 : 0}} />
                    </ListItemButton>
                </ProtectedContent>
                <ListItemButton
                    onClick={() => navigate('/case')}
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Case" sx={{opacity: open ? 1 : 0}} />
                </ListItemButton>
                <ProtectedContent user={user} role={['admin']}>
                    <ListItemButton
                        onClick={() => navigate('/managestaff')}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}>
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}>
                            <SupervisorAccountIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage Permissions" sx={{opacity: open ? 1 : 0}} />
                    </ListItemButton>
                </ProtectedContent>
                <ProtectedContent user={user} role={['admin']}>
                    <ListItemButton
                        onClick={() => navigate('/case/request')}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}>
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}>
                            <RequestQuoteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Support Case Request" sx={{opacity: open ? 1 : 0}} />
                    </ListItemButton>
                </ProtectedContent>
                <ListItemButton
                    onClick={() => navigate('/machine/stats/')}
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}>
                        <LocalLaundryServiceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Machine Statistic" sx={{opacity: open ? 1 : 0}} />
                </ListItemButton>
                <ListItemButton
                    onClick={() => navigate('/profile')}
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}>
                        <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Account" sx={{opacity: open ? 1 : 0}} />
                </ListItemButton>
            </List>
        </Drawer>
    );

}

