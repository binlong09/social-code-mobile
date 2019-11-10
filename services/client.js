import axios from 'axios';
import Constants from './constants';

export const axiosInstance = axios.create({
  baseURL: __DEV__ ? Constants.DEVELOPMENT_SERVER : Constants.PRODUCTION_SERVER,
  headers: { 'Content-Type': 'application/json' }
})