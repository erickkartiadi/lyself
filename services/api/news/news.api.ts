import axios from 'axios';
import Constant from 'expo-constants';

import { Article } from '../../../types/types';

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

export default async function getNews(): Promise<Article[]> {
  const res = await axios.get('https://newsapi.org/v2/everything', {
    params: {
      q: '"mental health"',
      pageSize: 10,
      apiKey: Constant.manifest?.extra?.newsApiKey,
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
