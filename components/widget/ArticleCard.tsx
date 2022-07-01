import { Icon, Image, Text, useTheme } from '@rneui/themed';

import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ArticleCardProps } from '../../constant';
import BaseCard from '../BaseCard';

function ArticleCard({ title, publisher, time, src }: ArticleCardProps) {
  const { theme } = useTheme();

  return (
    <View>
      <BaseCard
        containerStyle={{
          width: 280,
          paddingTop: 0,
          paddingHorizontal: 0,
          borderWidth: 0,
          elevation: 0,
          borderRadius: theme.spacing.xl,
          backgroundColor: theme.colors.cardBackground,
          overflow: 'hidden',
        }}
      >
        <Image
          containerStyle={{
            width: '100%',
            aspectRatio: 4 / 3,
            borderRadius: theme.spacing.md,
          }}
          PlaceholderContent={<ActivityIndicator />}
          childrenContainerStyle={{ width: '100%' }}
          source={{ uri: src }}
        />
        <View
          style={{
            padding: theme.spacing.xl,
            paddingBottom: theme.spacing.md,
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
    </View>
  );
}

export default ArticleCard;
