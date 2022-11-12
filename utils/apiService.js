import axios from 'axios';

const BASE_URL = 'https://ia-server2-production.up.railway.app/api';

export default async function LoadLens() {
  const response = await axios.get(`${BASE_URL}/iols`);
  return response;
}

