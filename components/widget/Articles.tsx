import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import getArticles from '../../services/api/news';
import { styles } from '../../theme/styles';
import { Article } from '../../types/types';
import BaseViewSeparator from '../bases/BaseViewSeparator';
import ArticleCard from '../cards/ArticleCard';
import SectionTitle from '../SectionTitle';

function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);

  const readArticles = async () => {
    const res = await getArticles();
    setArticles(
      res.data.articles.map((article: any) => ({
        title: article.title,
        source: article.source.name,
        url: article.url,
        publishedAt: article.publishedAt,
        urlToImage: article.urlToImage,
      }))
    );
  };

  useEffect(() => {
    readArticles();
  }, []);

  const renderArticles = ({ item }: { item: Article }) => (
    <ArticleCard
      url={item.url}
      publishedAt={item.publishedAt}
      source={item.source}
      title={item.title}
      urlToImage={item.urlToImage}
    />
  );

  return (
    <View style={styles.section}>
      <SectionTitle title="News about mental health" showRightComponent />
      <FlatList
        overScrollMode="never"
        horizontal
        ItemSeparatorComponent={BaseViewSeparator}
        showsHorizontalScrollIndicator={false}
        style={[styles.noContainerGutter, styles.flatListHorizontal]}
        contentContainerStyle={[
          styles.containerGutter,
          styles.flatListHorizontalContainer,
        ]}
        data={articles}
        renderItem={renderArticles}
      />
    </View>
  );
}

export default Articles;
