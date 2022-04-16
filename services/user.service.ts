import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'

import { fetchWrapper } from '../helpers';
import { Registration } from '../models/RegistrationModel';
import { ResponseCode } from '../constants/error-code';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const userSubject = new BehaviorSubject(typeof window !== 'undefined' && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : "");

export const userService = {
  user: userSubject.asObservable(),
  get userValue() { return userSubject.value },
  register,
  login,
  logout,
  getAll
};

function login(email: string, password: string) {
  return fetchWrapper.post(`${baseUrl}/auth/login`, { email, password })
    .then(res => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      if(res.code == ResponseCode.OK){
        localStorage.setItem('user', JSON.stringify(res.token));
        userSubject.next(res.token);
      }
      return res;
    });
}
function register(data: Registration){
  return fetchWrapper.post(`${baseUrl}/auth/register`, data)
    .then(res => {
      return res;
    });
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem('user');
  userSubject.next(null);
  Router.push('/login');
}

function getAll() {
  return fetchWrapper.get(`${baseUrl}/user`);
}
