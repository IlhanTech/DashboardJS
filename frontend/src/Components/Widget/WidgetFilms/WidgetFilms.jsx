import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WidgetFilms.css';

const WidgetFilms = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const currentDate = new Date();
        const lastWeekDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
        const currentDateFormatted = currentDate.toISOString().split('T')[0];
        const lastWeekDateFormatted = lastWeekDate.toISOString().split('T')[0];

        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_FILMS_API_KEY}&primary_release_date.gte=${lastWeekDateFormatted}&primary_release_date.lte=${currentDateFormatted}`);
        setMovies(response.data.results || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des films:', error);
      }
    };

    fetchMovies();

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % movies.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [movies.length]);

  return (
    <div className="widget-container">
      {movies.length === 0 ? (
        <p>Aucun film récent trouvé</p>
      ) : (
        <div>
          <p className='paraf'>Voici notre suggestion pour vous :</p>
          <p className='paraf'>{movies[currentIndex].title}</p>
          {movies[currentIndex].poster_path && <img src={`https://image.tmdb.org/t/p/w500${movies[currentIndex].poster_path}`} alt={movies[currentIndex].title} className='imgFilms' />}
        </div>
      )}
    </div>
  );
};

export default WidgetFilms;
