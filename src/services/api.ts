import axios from 'axios';

export const api_login = axios.create({
    baseURL: "http://169.57.189.185/login",
    headers: {
    'Content-Type': 'application/json',
    }
  });

export const api_donations = axios.create({
    baseURL: "http://169.57.189.185/donations",
    headers: {
    'Content-Type': 'application/json',
    }
  });

export const api_packages = axios.create({
    baseURL: "http://169.57.189.185/packages",
    headers: {
    'Content-Type': 'application/json',
    }
  });

  
export const api_register = axios.create({
  baseURL: "http://169.57.189.185/register",
  headers: {
  'Content-Type': 'application/json',
  }
});


export const api_institution = axios.create({
  baseURL: "http://169.57.189.185/packages/institution",
  headers: {
  'Content-Type': 'application/json',
  }
});



