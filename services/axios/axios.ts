/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

import { API_BASE_URL, USER_TOKEN_KEY } from '@env';
import axios, { AxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

import { ErrorResponseData } from './axios.types';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
export const newsClient = axios.create();
export const spotifyClient = axios.create();

// default axios config
export default function loadAxiosInterceptor() {
  apiClient.interceptors.request.use(async (config: AxiosRequestConfig<any>) => {
    if (config.headers === undefined) config.headers = {};

    const token = await SecureStore.getItemAsync(USER_TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isAxiosError(error) && error.response?.data) {
        const { statusCode, message } = error.response.data as ErrorResponseData;

        if (statusCode === 400) {
          Toast.show({
            type: 'error',
            text1: 'Form error',
            text2: message[0],
          });
        }

        if (statusCode === 401) {
          Toast.show({
            type: 'error',
            text1: message instanceof Array ? message[0] : message,
          });
        }
        if (statusCode === 409) {
          Toast.show({
            type: 'error',
            text1: `Email already taken`,
          });
        }

        return Promise.reject();
      }
      return Promise.reject(error);
    }
  );
}
