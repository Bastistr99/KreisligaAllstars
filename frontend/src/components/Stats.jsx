import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const Stats = ({position, verein, spiele, tore, assists, gelb, gelbrot, rot}) => {
    
    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography variant='h6'>Verein</Typography>
                <Typography variant="body1">{verein}</Typography>   
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h6'>Position</Typography>
                <Typography variant="body1">{position}</Typography>   
            </Grid>
            <Grid item xs={6}>
            <Typography variant='h6'>Spiele</Typography>
                <Typography variant="body1">{spiele}</Typography>   
            </Grid>
            <Grid item xs={6}>
            <Typography variant='h6'>Tore</Typography>
                <Typography variant="body1">{tore}</Typography>   
            </Grid>
            <Grid item xs={6}>
            <Typography variant='h6'>Assists</Typography>
                <Typography variant="body1">{assists}</Typography>   
            </Grid>
            <Grid item xs={6}>
            <Typography variant='h6'>Gelb</Typography>
                <Typography variant="body1">{gelb}</Typography>   
            </Grid>
            <Grid item xs={6}>
            <Typography variant='h6'>Gelbrot</Typography>
                <Typography variant="body1">{gelbrot}</Typography>   
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h6'>Rot</Typography>
                <Typography variant="body1">{rot}</Typography>   
            </Grid>
          </Grid>
        </Box>
      );
}

export default Stats;
