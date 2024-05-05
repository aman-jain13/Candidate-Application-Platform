import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import JobCard from './components/JobCard';
import './App.css';
import Filters from './components/Filters';

const App = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);
  const loader = useRef(null);
  const [filters, setFilters] = useState({
    minExperience: '',
    companyName: '',
    location: '',
    remote: '',
    techStack: '',
    role: '',
    minBasePay: '',
  });

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
  
  const applyFilters = () => {
    let filteredJobs = jobData.filter(job => {
      return (
        (filters.minExperience === '' || (job.minExp <= parseInt(filters.minExperience) && job.maxExp >= parseInt(filters.minExperience))) &&
        (filters.companyName === '' || job.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) &&
        (filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (filters.remote === '' || job.location.toLowerCase() === 'remote') &&
        (filters.techStack === '' || job.techStack.toLowerCase().includes(filters.techStack.toLowerCase())) &&
        (filters.role === '' || job.jobRole.toLowerCase().includes(filters.role.toLowerCase())) &&
        (filters.minBasePay === '' || (job.minJdSalary >= parseInt(filters.minBasePay)))
      );
    });

    return filteredJobs;
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="App">
      <div>
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        <Grid container spacing={2} className="job-grid">
        {applyFilters().map((job, index) => (
          <Grid item key={index} className="job-card">
            <JobCard {...job} />
          </Grid>
        ))}
          {loading && <div className="loading" ref={loader}>Loading...</div>}
        </Grid>
      </div>
    </main>
  );  
};

export default App;
