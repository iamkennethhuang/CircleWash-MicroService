import { Container, Grid } from '@mui/material';
import React from 'react';
import { Typography, Link} from '@mui/material';
import Copyright from './copyright';

const footers = [
    {
        title: "Service",
        subtitles: ['Wash & Fold', 'Dry Clean', 'Sewing & Alterations', 'Self Service', 'Delivery']
    },
    {
        title: "Contact",
        subtitles: ['Hours', 'Location', 'Address']
    },
    {
        title: "Social Media",
        subtitles: ['FaceBook', 'Yelp', 'Instagram', 'Twitter']
    }
]

export default function Footer (){
    return (
        <Container
            maxWidth="md"
            component="footer"
            sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 8,
                py: [3, 6]}}>
            <Grid container spacing={4} justifyContent='space-evenly'>
                {footers.map((footer) => (
                    <Grid item key={footer.title}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            {footer.title}
                        </Typography>
                        <ul>
                            {footer.subtitles.map((item) => (
                                <li key={item}>
                                    <Link href="#" variant="subtitle1" color="text.secondary">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                    ))}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    );
}