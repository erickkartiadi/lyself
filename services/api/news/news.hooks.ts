import { useQuery } from '@tanstack/react-query';

import { Article } from '../../../types/types';
import getNews from './news.api';

const useGetNews = () =>
  useQuery<Article[]>(['articles'], getNews, {
    staleTime: 3600000,
  });
export default useGetNews;
