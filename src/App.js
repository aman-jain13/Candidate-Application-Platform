import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import JobCard from './components/JobCard';
import './App.css';

const App = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);
  const loader = useRef(null);

  const fetchJobs = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        "limit": 10,
        "offset": (page.current - 1) * 10
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
      };

      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
      const data = await response.json();

      if (data.jdList.length === 0) {
        setHasMore(false);
      } else {
        setJobData(prevJobs => [...prevJobs, ...data.jdList]);
        page.current++;
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const handleScroll = () => {
    if (loading || !hasMore) return;
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      fetchJobs();
    }
  };
  

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Grid container spacing={2} className="job-grid">
      {jobData && jobData.map((job) => (
        <Grid item key={job.jdUid} className="job-card">
          <JobCard {...job} />
        </Grid>
      ))}
      {loading && <div className="loading" ref={loader}>Loading...</div>}
    </Grid>
  );
};

export default App;
