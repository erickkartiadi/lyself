import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList, View } from 'react-native';

import fetchNews from '../../services/api/news';
import layout from '../../styles/layout';
import { Article } from '../../types/types';
import ArticleCard, { ArticleCardPlaceholder } from '../cards/ArticleCard';
import { HorizontalSeparator } from '../layout/ItemSeparator';
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
  <View style={[layout.w100, layout.flexDirRow]}>
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
    <View style={layout.sectionLarge}>
      <SectionTitle title="Articles about mental health" showRightComponent />
      <FlatList
        overScrollMode="never"
        horizontal
        ListEmptyComponent={renderEmptyArticles}
        ItemSeparatorComponent={HorizontalSeparator}
        showsHorizontalScrollIndicator={false}
        style={[layout.noContainerGutter]}
        contentContainerStyle={[layout.containerGutter]}
        data={articlesQuery.data}
        renderItem={renderArticles}
      />
    </View>
  );
}

export default ArticleSection;
