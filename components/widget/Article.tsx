import { Icon, Image, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';
import * as Linking from 'expo-linking';
import BaseCard from '../BaseCard';
import { ArticleCardProps, dataArticles } from '../../constant';
import { styles } from '../../theme';
import ViewSeparator from '../ViewSeparator';

function ArticleCard({ title, publisher, time, src, url }: ArticleCardProps) {
  const { theme } = useTheme();

  const handleOpenArticle = () => {
    Linking.openURL(url);
  };

  return (
    <Pressable onPress={handleOpenArticle}>
      <BaseCard
        containerStyle={{
          width: 280,
          paddingTop: 0,
          paddingHorizontal: 0,
          overflow: 'hidden',
        }}
      >
        <Image
          containerStyle={{
            width: '100%',
            aspectRatio: 4 / 3,
          }}
          PlaceholderContent={<ActivityIndicator />}
          childrenContainerStyle={{ width: '100%' }}
          source={{ uri: src }}
        />
        <View
          style={{
            padding: theme.spacing.xl,
            paddingBottom: theme.spacing.xs,
          }}
        >
          <Text h4>{title}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text sm>{publisher}</Text>
            <Icon type="entypo" name="dot-single" color={theme.colors.grey4} />
            <Text sm>{time} ago</Text>
          </View>
        </View>
      </BaseCard>
    </Pressable>
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
    <View style={styles.containerSection}>
      <Text h3>News about mental health</Text>
      <View style={styles.noContainerOffset}>
        <FlatList
          horizontal
          ItemSeparatorComponent={ViewSeparator}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
          data={dataArticles}
          renderItem={renderArticles}
          keyExtractor={(item: ArticleCardProps) => item.title}
        />
      </View>
    </View>
  );
}

export { ArticleCard, ArticleWidget };
