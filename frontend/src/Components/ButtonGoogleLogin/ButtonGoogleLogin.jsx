import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClientID = process.env.REACT_APP_GoogleClientID;

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const onSuccess = (res) => {
    const tokenId = res.tokenId;
    sendTokenToBackend(tokenId);
    navigate('/dashboard');
  };

  const onFailure = (error) => {
    console.error('Google Sign-In failed:', error);
    console.error('Failure Details:', error.details);
    navigate('/login');
  };

  const sendTokenToBackend = async (tokenId) => {
    const apiUrl = process.env.REACT_APP_API_URL + '/user/google';
    const headers = {
      'Content-Type': 'application/json',
    };
    const data = { idToken: tokenId };

    try {
      const response = await axios.post(apiUrl, data, { headers });
      console.log('Backend response:', response.data);
    } catch (error) {
      console.error('Error sending token to backend:', error.message);
    }
  };

  return (
    <GoogleLogin
      clientId={ClientID}
      buttonText="Se connecter avec Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  );
};

export default GoogleSignInButton;
