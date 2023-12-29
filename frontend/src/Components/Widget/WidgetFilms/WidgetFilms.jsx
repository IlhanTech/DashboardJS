import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './WidgetFilms.css';

const WidgetFilms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_FILMS_API_KEY}&s=${searchTerm}`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }, [searchTerm]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div className="widget-container">
      <input
        type="text"
        placeholder="Rechercher un film..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {movies.length === 0 ? (
        <p>Aucun résultat trouvé</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.imdbID}>
              <p className='paraf'>{movie.Title}</p>
              {movie.Poster !== 'N/A' && <img src={movie.Poster} alt={movie.Title} className='imgFilms' />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WidgetFilms;
