'use client';
import React, { useState, useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import './index.css';
const url = 'https://course-api.com/react-tabs-project';

const App = ({ initialJobs }) => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState(initialJobs);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setLoading(false);
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newJobs = await response.json();
      setJobs(newJobs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (!jobs || !jobs.length || loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }

  const { company, dates, duties, title } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((job, index) => (
            <button
              key={job.id}
              className={`job-btn ${index === value ? 'active-btn' : ''}`}
              onClick={() => setValue(index)}
            >
              {job.company}
            </button>
          ))}
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => (
            <div key={index} className="job-desc">
              <FaAngleDoubleRight className="job-icon" />
              <p>{duty}</p>
            </div>
          ))}
        </article>
      </div>
      <button type="button" className="btn">
        more info
      </button>
    </section>
  );
};

App.getInitialProps = async () => {
  const response = await fetch(url);
  const initialJobs = await response.json();
  return { initialJobs };
};

export default App;
