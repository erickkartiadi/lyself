import { NEWS_API_KEY } from '@env';

import { Article } from '../../types/types';
import { newsClient } from '../axios/axios';

type NewsEverything = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export default async function fetchNews(): Promise<Article[]> {
  const res = await newsClient.get('https://newsapi.org/v2/everything', {
    params: {
      q: '"mental health"',
      pageSize: 10,
      apiKey: NEWS_API_KEY,
    },
  });

  return res.data.articles.map(
    ({ title, source: { name }, url, publishedAt, urlToImage }: NewsEverything) => ({
      title,
      source: name,
      url,
      publishedAt,
      urlToImage,
    })
  );
}
