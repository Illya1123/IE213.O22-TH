'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      const tours = response.data;
      setLoading(false);
      setTours(tours);
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

useEffect(() => {
    fetchTours();
}, []);

let content;
if (loading) {
    content = <Loading />;
} else if (tours.length === 0) {
    content = (
        <div className='title'>
            <h2>no tours left</h2>
            <button className='btn' onClick={() => fetchTours()}>
                refresh
            </button>
        </div>
    );
} else {
    content = <Tours tours={tours} removeTour={removeTour} />;
}

return (
    <main>
        {content}
    </main>
);
};

const Loading = () => {
  return (
    <div className="loading">
      <h1>loading...</h1>
    </div>
  );
};

const Tour = ({ id, image, info, name, price, removeTour }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">${price}</h4>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? 'show less' : '  read more'}
          </button>
        </p>
        <button className="delete-btn" onClick={() => removeTour(id)}>
          not interested
        </button>
      </footer>
    </article>
  );
};

const Tours = ({ tours, removeTour }) => {
  return (
    <section>
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <div>
        {tours.map((tour) => {
          return <Tour key={tour.id} {...tour} removeTour={removeTour} />;
        })}
      </div>
    </section>
  );
};

export default App;
