import { Icon, Image, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Article } from '../../types/types';
import BaseCard from '../bases/BaseCard';

function ArticleCard({ title, publisher, time, uri, url }: Article) {
  const { theme } = useTheme();

  const handleOpenArticle = () => {
    Linking.openURL(url);
  };

  return (
    <BaseCard width={280} enableCardPadding={false} onPress={handleOpenArticle}>
      <Image
        containerStyle={{
          width: '100%',
          aspectRatio: 4 / 3,
        }}
        PlaceholderContent={<ActivityIndicator />}
        source={{ uri }}
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

export default ArticleCard;
