import axios from 'axios';

export const inkCentralServer = axios.create({
  baseURL: 'http://localhost:8000'
});