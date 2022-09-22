import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_EXPIRES_TIME_KEY,
  SPOTIFY_REFRESH_TOKEN_KEY,
  SPOTIFY_TOKEN_KEY,
} from '@env';
import { Buffer } from 'buffer';
import * as SecureStore from 'expo-secure-store';

import { spotifyInstance } from '../axios/axios';

const clientId = SPOTIFY_CLIENT_ID;
const clientSecret = SPOTIFY_CLIENT_SECRET;
const redirectUri = SPOTIFY_CLIENT_SECRET;

export async function fetchFeaturedPlaylist() {
  const token = await SecureStore.getItemAsync(SPOTIFY_TOKEN_KEY);

  return spotifyInstance.get('https://api.spotify.com/v1/browse/featured-playlists', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchAccessToken(code: string) {
  const res = await spotifyInstance.post('https://accounts.spotify.com/api/token', null, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
        'base64'
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    },
  });

  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
  } = res.data;

  const expirationTime = new Date().getTime() + expiresIn * 1000;

  await SecureStore.setItemAsync(SPOTIFY_TOKEN_KEY, accessToken);
  await SecureStore.setItemAsync(SPOTIFY_REFRESH_TOKEN_KEY, refreshToken);
  await SecureStore.setItemAsync(SPOTIFY_EXPIRES_TIME_KEY, expirationTime.toString());

  SecureStore.getItemAsync(SPOTIFY_TOKEN_KEY);
}

export async function fetchRefreshToken() {
  const refreshToken = await SecureStore.getItemAsync(SPOTIFY_REFRESH_TOKEN_KEY);

  const res = await spotifyInstance.post('https://accounts.spotify.com/api/token', null, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
        'base64'
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
  });

  const { access_token: newAccessToken, expires_in: expiresIn } = res.data;

  const expirationTime = new Date().getTime() + expiresIn * 1000;
  await SecureStore.setItemAsync(SPOTIFY_TOKEN_KEY, newAccessToken);
  await SecureStore.setItemAsync(SPOTIFY_EXPIRES_TIME_KEY, expirationTime.toString());
}
