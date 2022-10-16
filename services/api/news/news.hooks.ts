import { useQuery } from '@tanstack/react-query';

import { Article } from '../../../types/types';
import fetchNews from './news';

const useGetNews = () =>
  useQuery<Article[]>(['articles'], fetchNews, {
    staleTime: 3600000,
  });
export default useGetNews;
