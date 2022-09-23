/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { USER_TOKEN_KEY } from '@env';
import axios, { AxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';

// default axios config
export default function loadAxiosInterceptor() {
  axios.interceptors.request.use(async (config: AxiosRequestConfig<any>) => {
    if (config.headers === undefined) config.headers = {};

    // TODO handle if token is empty
    const token = await SecureStore.getItemAsync(USER_TOKEN_KEY);

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
}

export const newsInstance = axios.create();

export const spotifyInstance = axios.create();
