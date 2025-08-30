

import apiUrl from '../apiConfig';
import axios from 'axios';

// Get all edit logs (read-only)
export const getEditLogs = (user) => {
  return axios.get(`${apiUrl}/edit_logs/`, {
    headers: user?.token ? { Authorization: `Token ${user.token}` } : {},
  });
};

// Get a single edit log by id
export const getEditLog = (id, user) => {
  return axios.get(`${apiUrl}/edit_logs/${id}/`, {
    headers: user?.token ? { Authorization: `Token ${user.token}` } : {},
  });
};