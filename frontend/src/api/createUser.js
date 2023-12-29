import axios from 'axios';

export default async function createUser(name, email, password) {
  const apiUrl = process.env.REACT_APP_API_URL + '/user/signup';
  const userData = {
    name,
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
