import React, {useState} from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { Box, Toolbar, IconButton} from '@mui/material';
import { CssBaseline } from '@mui/material';
import { styled, useTheme} from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from './drawer';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',}) //provided the compont and option
    //when theme and open props is pass without shouldForwardProp option define
    //it will pass the props to the real element in the dom tree 
    //and react will be unhappy
    //so shouldForwardProp exists to prevent styling props from being passed down
    //and create invalid attribute
  (({ theme, open }) => ({
    background: "#2D3744",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,}),
    ...(open && { //the ... means property spread notation? and if open is true new transition replace the previous transition
    //if there's two attributes with the same name, the last attribute will replace the first one
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

export default function NavBar(){
    const[open, setOpen] = useState(false);

    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return(
        <Box sx={{display: 'flex'}}>
            <CssBaseline /> 
            <AppBar position='absolute' open={open}>
                <Toolbar >
                    <IconButton
                        edge="start"
                        color='inherit'
                        onClick={handleDrawerOpen}
                        sx={{
                            marginRight: 5,
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer theme={theme} open={open} handleDrawerClose={handleDrawerClose} />
        </Box>
    );
}