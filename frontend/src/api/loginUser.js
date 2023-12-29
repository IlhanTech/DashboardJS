import axios from 'axios';

export default async function loginUser(email, password) {
  const apiUrl = process.env.REACT_APP_API_URL + '/user/login';
  const userData = {
    email,
    password,
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  console.log('Making a POST request to:', apiUrl);
  console.log('Request data:', userData);

  try {
    const response = await axios.post(apiUrl, userData, { headers });
    return response;
  } catch (error) {
    console.error('Error making POST request:', error);
    throw error;
  }
}
