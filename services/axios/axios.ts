/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

import axios from 'axios';
import Constant from 'expo-constants';

export const apiClient = axios.create({
  baseURL: Constant.manifest?.extra?.apiBaseUrl,
});
export const newsClient = axios.create();
export const spotifyClient = axios.create();
