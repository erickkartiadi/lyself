import axios from 'axios';
import { Buffer } from 'buffer';
import Constant from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

import { Playlist } from '../../types/types';

const clientId = Constant.manifest?.extra?.spotifyClientId;
const clientSecret = Constant.manifest?.extra?.spotifyClientSecret;
const redirectUri = Constant.manifest?.extra?.redirectUri;
const spotifyExpiresTimeKey = Constant.manifest?.extra?.spotifyExpiresTimeKey;
const spotifyRefreshTokenKey = Constant.manifest?.extra?.spotifyRefreshTokenKey;
const spotifyTokenKey = Constant.manifest?.extra?.spotifyTokenKey;

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
  const res = await axios.post('https://accounts.spotify.com/api/token', null, {
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

  await SecureStore.setItemAsync(spotifyTokenKey, accessToken);
  await SecureStore.setItemAsync(spotifyRefreshTokenKey, refreshToken);
  await SecureStore.setItemAsync(spotifyExpiresTimeKey, expirationTime.toString());

  SecureStore.getItemAsync(spotifyTokenKey);
}

export async function fetchRefreshToken(): Promise<void> {
  const refreshToken = await SecureStore.getItemAsync(spotifyRefreshTokenKey);

  const res = await axios.post('https://accounts.spotify.com/api/token', null, {
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
  await SecureStore.setItemAsync(spotifyTokenKey, newAccessToken);
  await SecureStore.setItemAsync(spotifyExpiresTimeKey, expirationTime.toString());
}

export async function fetchFeaturedPlaylist(): Promise<Playlist[]> {
  const token = await SecureStore.getItemAsync(spotifyTokenKey);
  const tokenExpirationTime = await SecureStore.getItemAsync(spotifyExpiresTimeKey);
  const isTokenExpired =
    !tokenExpirationTime ||
    new Date().getTime() > parseInt(tokenExpirationTime || '0', 10);

  if (isTokenExpired) await fetchRefreshToken();

  const res = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.playlists.items.map((item: SpotifyPlaylist) => ({
    id: item.id,
    name: item.name,
    imageUrl: item.images[0].url,
    creator: item.owner.display_name,
    spotifyUrl: item.external_urls.spotify,
  }));
}
