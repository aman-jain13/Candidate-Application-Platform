import React from 'react';
import { Paper, CardContent, Typography, Box, ButtonBase } from '@mui/material';
import '../css/JobCard.css'; // Make sure this path is correct

const JobCard = ({ companyName, jobRole, location, jobDetailsFromCompany, jdLink, minExp, maxExp, logoUrl }) => {
  return (
    <Paper className="job-card">
      <CardContent>
				<Box className="job-info-box">
          <img src={logoUrl} alt="Company Logo" className="company-logo" />
          <div className="job-details">
            <Typography className="company-name">{companyName}</Typography>
            <Typography className="job-title">{jobRole}</Typography>
            <Typography className="location">{location}</Typography>
          </div>
        </Box>
        <Box className="job-description">
          <Typography className="about-company-tag">About Company: </Typography>
          <Box>
            <Typography><strong>About Us</strong></Typography>  
            <Typography>{jobDetailsFromCompany}</Typography>
          </Box>
        </Box>
        <Box className="view-job">
          <a href={jdLink} target="_blank" rel="noopener noreferrer">View Job</a>
        </Box>
        <Box>
          <Typography>Experience: {minExp}-{maxExp} years</Typography>
        </Box>
      </CardContent>
      <Box className="button-box">
        <ButtonBase className="custom-btn">⚡ Easy Apply</ButtonBase>
      </Box>
    </Paper>
  );
};

export default JobCard;