import React from 'react';
import { Box, TextField, Select, MenuItem } from '@mui/material';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <Box className="filters">
      <TextField
        label="Search Company Name"
        variant="outlined"
        value={filters.companyName}
        onChange={(e) => onFilterChange('companyName', e.target.value)}
      />
      <Select
        value={filters.minExperience}
        onChange={(e) => onFilterChange('minExperience', e.target.value)}
        variant="outlined"
      >
        <MenuItem value="">Min Experience</MenuItem>
        {[...Array(10)].map((_, index) => (
          <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
        ))}
      </Select>
      <TextField
        label="Location"
        variant="outlined"
        value={filters.location}
        onChange={(e) => onFilterChange('location', e.target.value)}
      />
      <Select
        value={filters.remote}
        onChange={(e) => onFilterChange('remote', e.target.value)}
        variant="outlined"
      >
        <MenuItem value="">Remote/On-site</MenuItem>
        <MenuItem value="remote">Remote</MenuItem>
        <MenuItem value="on-site">On-site</MenuItem>
      </Select>
      <TextField
        label="Tech Stack"
        variant="outlined"
        value={filters.techStack}
        onChange={(e) => onFilterChange('techStack', e.target.value)}
      />
      <TextField
        label="Role"
        variant="outlined"
        value={filters.role}
        onChange={(e) => onFilterChange('role', e.target.value)}
      />
      <Select
        value={filters.minBasePay}
        onChange={(e) => onFilterChange('minBasePay', e.target.value)}
        variant="outlined"
      >
        <MenuItem value="">Min Base Pay</MenuItem>
        {Array.from({ length: 8 }, (_, i) => i * 10).map((value) => (
          <MenuItem key={value} value={value * 10}>{value}L</MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Filters;
