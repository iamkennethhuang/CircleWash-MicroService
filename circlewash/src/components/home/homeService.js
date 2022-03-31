import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import dryClean from '../../pictures/dryClean.JPG';
import sewing from '../../pictures/sewing.JPG';
import wash from '../../pictures/wash.JPG';
import resting from '../../pictures/resting.JPG';
// import { styled } from '@mui/material/styles';
// import { CssBaseline } from '@mui/material';

const services = [
    {
        serviceName: 'Wash & Fold',
        description: 'filler for wash and fold',
        productPic: resting
    },
    {
        serviceName: 'Dry Clean',
        description:'filler for dry clean',
        productPic: dryClean
    },
    {
        serviceName: 'Sewing & Alterations',
        description: 'filler for sewing',
        productPic: sewing
    },
]

function HomeService(){
    return(
        <React.Fragment>
            <Container component='main' sx={{ pt: 8 }}>
                <Typography component="h1" variant='h2' align='center' color='GrayText.primary' gutterBottom>
                    Service
                </Typography>
            </Container>
            <Container component="main">
                <Grid container justifyContent="center" spacing={4}>
                    {services.map((service) => (
                        <Grid item key={service.serviceName} >
                            <Card sx={{}} elevation={0}>
                                <CardActionArea>
                                    <CardMedia component='img' image={service.productPic} alt={service.serviceName} sx={{width: 300}}/ >
                                </CardActionArea>    
                                    <CardContent>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            {service.serviceName}
                                        </Typography>
                                    </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default HomeService;