import { Icon, Image, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import * as Linking from 'expo-linking';
import BaseCard from '../../atoms/BaseCard';
import ViewSeparator from '../../atoms/BaseDivider';
import { ArticleCardProps, articlesData } from '../../../constant';
import SectionTitle from '../SectionTitle';
import { styles } from '../../../theme/styles';

function ArticleCard({ title, publisher, time, src, url }: ArticleCardProps) {
  const { theme } = useTheme();

  const handleOpenArticle = () => {
    Linking.openURL(url);
  };

  return (
    <BaseCard width={280} disablePadding onPress={handleOpenArticle}>
      <Image
        containerStyle={{
          width: '100%',
          aspectRatio: 4 / 3,
        }}
        PlaceholderContent={<ActivityIndicator />}
        source={{ uri: src }}
      />
      <View
        style={{
          padding: theme.spacing.xl,
        }}
      >
        <Text subtitle1>{title}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text caption>{publisher}</Text>
          <Icon type="entypo" name="dot-single" color={theme.colors.grey4} />
          <Text caption>{time} ago</Text>
        </View>
      </View>
    </BaseCard>
  );
}

function ArticleWidget() {
  const renderArticles = ({ item }: { item: ArticleCardProps }) => (
    <ArticleCard
      src={item.src}
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
        ItemSeparatorComponent={ViewSeparator}
        showsHorizontalScrollIndicator={false}
        style={[styles.noContainerGutter, styles.flatListHorizontal]}
        contentContainerStyle={[
          styles.scrollViewContainer,
          styles.flatListHorizontalContainer,
        ]}
        data={articlesData}
        renderItem={renderArticles}
        keyExtractor={(item: ArticleCardProps) => item.title}
      />
    </View>
  );
}

export { ArticleCard, ArticleWidget };
