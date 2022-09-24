import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_EXPIRES_TIME_KEY,
  SPOTIFY_REFRESH_TOKEN_KEY,
  SPOTIFY_TOKEN_KEY,
} from '@env';
import { Buffer } from 'buffer';
import * as SecureStore from 'expo-secure-store';

import { Playlist } from '../../types/types';
import { spotifyClient } from '../axios/axios';

const clientId = SPOTIFY_CLIENT_ID;
const clientSecret = SPOTIFY_CLIENT_SECRET;
const redirectUri = SPOTIFY_CLIENT_SECRET;

type SpotifyImage = {
  url: string;
  height: number;
  width: number;
};

type SpotifyTrack = {
  href: string;
  items: [];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
};

type SpotifyExternalUrl = {
  spotify: string;
};

type SpotifyFollower = {
  href: string;
  total: number;
};

type SpotifyPlaylist = {
  collaborative: boolean;
  description: string | null;
  external_urls: SpotifyExternalUrl;
  followers: SpotifyFollower;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: {
    display_name: string;
    external_urls: SpotifyExternalUrl;
    followers: SpotifyFollower;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  tracks: SpotifyTrack;
  public: boolean;
  snapshot_id: string;
  type: string;
  uri: string;
};

export async function fetchAccessToken(code: string): Promise<void> {
  const res = await spotifyClient.post('https://accounts.spotify.com/api/token', null, {
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

export async function fetchRefreshToken(): Promise<void> {
  const refreshToken = await SecureStore.getItemAsync(SPOTIFY_REFRESH_TOKEN_KEY);

  const res = await spotifyClient.post('https://accounts.spotify.com/api/token', null, {
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

export async function fetchFeaturedPlaylist(): Promise<Playlist[]> {
  const token = await SecureStore.getItemAsync(SPOTIFY_TOKEN_KEY);
  const tokenExpirationTime = await SecureStore.getItemAsync(SPOTIFY_EXPIRES_TIME_KEY);
  const isTokenExpired =
    !tokenExpirationTime ||
    new Date().getTime() > parseInt(tokenExpirationTime || '0', 10);

  if (isTokenExpired) await fetchRefreshToken();

  const res = await spotifyClient.get(
    'https://api.spotify.com/v1/browse/featured-playlists',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.playlists.items.map((item: SpotifyPlaylist) => ({
    id: item.id,
    name: item.name,
    imageUrl: item.images[0].url,
    creator: item.owner.display_name,
    spotifyUrl: item.external_urls.spotify,
  }));
}
