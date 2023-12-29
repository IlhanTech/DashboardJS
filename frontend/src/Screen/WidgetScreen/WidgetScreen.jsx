import React from 'react';
import WidgetWeather from '../../Components/Widget/WidgetWeather/WidgetWeather';
import WidgetFilms from '../../Components/Widget/WidgetFilms/WidgetFilms';
import WidgetSteam from '../../Components/Widget/WidgetSteam/WidgetSteam';
import './WidgetScreen.css';
import ButtonGoogleLogout from '../../Components/ButtonGoogleLogout/ButtonGoogleLogout';

const WidgetScreen = () => {

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Widget</div>
        <div className='underline'></div>
      </div>
      <div className='widgets-container'>
        <WidgetWeather />
        <WidgetFilms />
        <WidgetSteam />
      </div>
      <ButtonGoogleLogout />
    </div>
  );
};

export default WidgetScreen;
