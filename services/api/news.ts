import { NEWS_API_KEY } from '@env';

import { newsClient } from '../axios/axios';

export default async function getArticles() {
  return newsClient.get('https://newsapi.org/v2/everything', {
    params: {
      q: '"mental health"',
      pageSize: 10,
      apiKey: NEWS_API_KEY,
    },
  });
}
