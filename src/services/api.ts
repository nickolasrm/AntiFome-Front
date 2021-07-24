import axios from 'axios';

export const api_login = axios.create({
    baseURL: "https://restapi-teste.herokuapp.com/login",
    headers: {
    'Content-Type': 'application/json',
    }
  });

export const api_donations = axios.create({
    baseURL: "https://restapi-teste.herokuapp.com/donations",
    headers: {
    'Content-Type': 'application/json',
    }
  });

export const api_packages = axios.create({
    baseURL: "https://restapi-teste.herokuapp.com/packages",
    headers: {
    'Content-Type': 'application/json',
    }
  });

  
export const api_register = axios.create({
  baseURL: "https://restapi-teste.herokuapp.com/register",
  headers: {
  'Content-Type': 'application/json',
  }
});


