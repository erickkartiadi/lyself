import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList, View } from 'react-native';

import fetchNews from '../../services/api/news';
import appStyles from '../../theme/appStyles';
import { Article } from '../../types/types';
import ArticleCard, { ArticleCardPlaceholder } from '../cards/ArticleCard';
import HorizontalSeparator from '../layout/HorizontalSeparator';
import SectionTitle from '../layout/SectionTitle';

const renderArticles = ({ item }: { item: Article }) => (
  <ArticleCard
    url={item.url}
    publishedAt={item.publishedAt}
    source={item.source}
    title={item.title}
    urlToImage={item.urlToImage}
  />
);
const renderEmptyArticles = () => (
  <View style={[appStyles.w100, appStyles.flexDirRow]}>
    <ArticleCardPlaceholder />
    <HorizontalSeparator />
    <ArticleCardPlaceholder />
    <HorizontalSeparator />
    <ArticleCardPlaceholder />
  </View>
);

function ArticleSection() {
  const articlesQuery = useQuery<Article[]>(['articles'], fetchNews);

  return (
    <View style={appStyles.sectionLarge}>
      <SectionTitle title="Articles about mental health" showRightComponent />
      <FlatList
        overScrollMode="never"
        horizontal
        ListEmptyComponent={renderEmptyArticles}
        ItemSeparatorComponent={HorizontalSeparator}
        showsHorizontalScrollIndicator={false}
        style={[appStyles.noContainerGutter]}
        contentContainerStyle={[appStyles.containerGutter]}
        data={articlesQuery.data}
        renderItem={renderArticles}
      />
    </View>
  );
}

export default ArticleSection;
