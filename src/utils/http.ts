import axios, { AxiosInstance } from 'axios';

import { BACK_END_URL } from '@constants';

import { clearLS, getAccessTokenFromLS } from '@utils/auth';

class Http {
  instance: AxiosInstance;
  private accessToken: string;

  constructor() {
    this.accessToken = getAccessTokenFromLS();

    this.instance = axios.create({
      baseURL: BACK_END_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }
  setToken(token: string) {
    this.accessToken = token;
  }
  public logout() {
    clearLS();
    this.accessToken = '';
  }
}

export const httpClient = new Http();

export const http = httpClient.instance;
