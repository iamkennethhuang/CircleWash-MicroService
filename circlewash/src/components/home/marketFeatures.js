import React from 'react';
import { Container, Typography } from '@mui/material';
import { Grid } from '@mui/material';

import wash from '../../pictures/wash.JPG';

export default function MarketFeatures(){
    return (
        <Container>
            <Grid container direction='row' spacing={5}>
                <Grid item xs={5} md={5}>
                    <Typography component="h4" variant='h5' align='left' color='GrayText.primary' gutterBottom>
                        Free Delivery within San Francisco
                    </Typography>
                    <Typography component='p' varient='body2' algin='left' color="text.secondary">
                        We pickup and return your clothes cleaned to your preference in as little as 4 hours. 
                        Please click the button to schdule a pickup in SF 
                    </Typography>
                </Grid>
                <Grid item xs={7} md={7}>
                    <img src={wash} alt="PickUpImage" width="100%" />
                </Grid>
            </Grid>
            <Grid container direction='row' spacing={5}>
                <Grid item xs={7} md={7}>
                    <img src={wash} alt="PickUpImage" width="100%" />
                </Grid>
                <Grid item xs={5} md={5}>
                    <Typography component="h4" variant='h5' align='left' color='GrayText.primary' gutterBottom>
                        Free Delivery within San Francisco
                    </Typography>
                    <Typography component='p' varient='body2' algin='left' color="text.secondary">
                        We pickup and return your clothes cleaned to your preference in as little as 4 hours. 
                        Please click the button to schdule a pickup in SF 
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}