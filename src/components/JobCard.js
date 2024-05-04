import React from 'react';
import { Grid, Paper, CardContent, Typography, Box, Button } from '@mui/material';

const JobCard = ({ job }) => {
  return (
    <Grid item>
      <Paper>
        <CardContent>
          <Box>
            <Typography>{job.company}</Typography>
            <Typography>{job.title}</Typography>
            <Typography>{job.location}</Typography>
          </Box>
          <Box>
            <Typography>{job.description}</Typography>
          </Box>
          <Box>
            <a href="#" target="_blank" rel="noopener noreferrer">View Job</a>
          </Box>
          <Box>
            <Typography>Minimum Experience: {job.experience}</Typography>
          </Box>
        </CardContent>
        <Box textAlign="center">
          <Button variant="contained" color="primary">Apply</Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default JobCard;
