const axios = require('axios');

export const api = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 120000,
  headers: {'content-type': 'application/json'}
});

