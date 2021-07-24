import axios from 'axios';



export const api_login = axios.create({
    baseURL: "https://restapi-teste.herokuapp.com/",
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    }
  });

export const api_register = axios.create({
  baseURL: "https://restapi-teste.herokuapp.com/",
  headers: {
  'Content-Type': 'application/json',
  }
});
