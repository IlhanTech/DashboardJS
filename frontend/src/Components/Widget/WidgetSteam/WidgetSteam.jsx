import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import './WidgetSteam.css';

const WidgetSteam = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [playerCount, setPlayerCount] = useState(null);
  const [num, setNum] = useState(0);

  const fetchGames = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/steam/getAppList`);
      setGames(response.data.applist.apps || []);
    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  }, []);

  const fetchPlayerCount = useCallback(async () => {
    if (selectedGame) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/steam/getPlayerCount?appid=${selectedGame.appid}`);
        setPlayerCount(response.data.response.player_count || 0);
      } catch (error) {
        console.error('Error fetching player count data:', error);
      }
    }
  }, [selectedGame]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const game = games.find((game) => game.name.toLowerCase() === searchTerm.toLowerCase());
      if (game) {
        setSelectedGame(game);
        setPlayerCount(null);
      } else {
        console.warn('Jeu non trouvé dans la liste.');
        setSelectedGame(null);
        setPlayerCount(null);
      }
    }
  };

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    fetchPlayerCount();
  }, [selectedGame, fetchPlayerCount]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchPlayerCount();
      setNum((prevNum) => prevNum + 1);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [selectedGame, fetchPlayerCount],);

  return (
    <div className="widget-container">
      <input
        type="text"
        placeholder="Rechercher un jeu..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {selectedGame ? (
        <div>
          <p className='paraf'>Nom du jeu : {selectedGame.name}</p>
          {playerCount !== null ? (
            <p className='paraf'>Nombre de joueurs actuels : {playerCount}</p>
          ) : (
            <p className='paraf'>Chargement du nombre de joueurs...</p>
          )}
          <p className='paraf'>Nombre de rafraîchissements : {num}</p>
        </div>
      ) : (
        <p>Jeu non sélectionné</p>
      )}
    </div>
  );
};

export default WidgetSteam;
