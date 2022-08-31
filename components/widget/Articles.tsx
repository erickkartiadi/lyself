import React from 'react';
import { FlatList, View } from 'react-native';

import { articlesData } from '../../constant/constant';
import { styles } from '../../theme/styles';
import BaseDivider from '../bases/BaseDivider';
import ArticleCard, { ArticleCardProps } from '../cards/ArticleCard';
import SectionTitle from '../SectionTitle';

function Articles() {
  const renderArticles = ({ item }: { item: ArticleCardProps }) => (
    <ArticleCard
      uri={item.uri}
      time={item.time}
      publisher={item.publisher}
      title={item.title}
      url={item.url}
    />
  );

  return (
    <View style={styles.section}>
      <SectionTitle title="News about mental health" showRightButton />
      <FlatList
        overScrollMode="never"
        horizontal
        ItemSeparatorComponent={BaseDivider}
        showsHorizontalScrollIndicator={false}
        style={[styles.noContainerGutter, styles.flatListHorizontal]}
        contentContainerStyle={[
          styles.containerGutter,
          styles.flatListHorizontalContainer,
        ]}
        data={articlesData}
        renderItem={renderArticles}
        keyExtractor={(item: ArticleCardProps) => item.title}
      />
    </View>
  );
}

export default Articles;
