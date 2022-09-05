import React from 'react';
import { FlatList, View } from 'react-native';

import { articlesData } from '../../constant/seed';
import { styles } from '../../theme/styles';
import { Article } from '../../types/types';
import BaseViewSeparator from '../bases/BaseViewSeparator';
import ArticleCard from '../cards/ArticleCard';
import SectionTitle from '../SectionTitle';

function Articles() {
  const renderArticles = ({ item }: { item: Article }) => (
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
        data={articlesData}
        renderItem={renderArticles}
      />
    </View>
  );
}

export default Articles;
