import React from 'react';
import { Paper, CardContent, Typography, Box, Button } from '@mui/material';

const JobCard = ({ companyName, jobRole, location, jobDetailsFromCompany, jdLink, minExp, maxExp }) => {
  return (
    <Paper>
      <CardContent>
        <Box>
          <Typography>{companyName}</Typography>
          <Typography>{jobRole}</Typography>
          <Typography>{location}</Typography>
        </Box>
        <Box>
          <Typography>{jobDetailsFromCompany}</Typography>
        </Box>
        <Box>
          <a href={jdLink} target="_blank" rel="noopener noreferrer">View Job</a>
        </Box>
        <Box>
          <Typography>Experience: {minExp}-{maxExp} years</Typography>
        </Box>
      </CardContent>
      <Box textAlign="center">
        <Button variant="contained" color="primary">Easy Apply</Button>
      </Box>
    </Paper>
  );
};

export default JobCard;