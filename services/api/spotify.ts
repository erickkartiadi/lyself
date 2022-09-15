import axios from 'axios';

export default async function getFeaturedPlaylist(token: string) {
  return axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
