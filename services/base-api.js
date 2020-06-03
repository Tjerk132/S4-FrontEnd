import axios from 'axios';
import Host from '@/models/Host';

let host = new Host();

let headers = {
  'cache-control': 'no-cache'
};
//comment for testing
let accessToken = localStorage.getItem('jwt-token');
if (accessToken && accessToken !== '') {
    headers.Authorization = accessToken;

};
let baseUrl = `https://${host.ip}:${host.port}`;

const service = axios.create({
  baseURL: baseUrl,
  headers: headers
});

export default service;

