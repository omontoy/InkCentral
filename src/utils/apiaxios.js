import axios from 'axios';

export const inkCentralServer = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
});