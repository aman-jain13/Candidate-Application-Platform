import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import JobCard from './components/JobCard';

const App = () => {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
          "limit": 10,
          "offset": 0
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body
        };

        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        const data = await response.json();
        setJobData(data.jdList); // Update to match the property name in the JSON response
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Grid container spacing={2}>
      {jobData && jobData.map((job) => (
        <JobCard key={job.jdUid} {...job} />
      ))}
    </Grid>
  );
};

export default App;
