import React from 'react';
import { Avatar, Text, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import colorAlpha from 'color-alpha';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import BaseCard from './BaseCard';
import { ExploreScreenProps } from '../screen/Explore/ExploreScreen';
import { BORDER_RADIUS } from '../theme/styles';

export interface PsychiatristCardProps {
  uri: string;
  experience: string;
  name: string;
  rating: string;
  specialty: string;
}

function PsychiatristCard({
  uri,
  experience,
  specialty,
  name,
  rating,
}: PsychiatristCardProps) {
  const { theme } = useTheme();
  const navigation = useNavigation<ExploreScreenProps['navigation']>();
  return (
    <BaseCard
      onPress={() =>
        navigation.navigate('Psychiatrist', {
          uri,
          experience,
          specialty,
          name,
          rating,
        })
      }
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          rounded
          size={84}
          source={{ uri }}
          containerStyle={{ marginRight: theme.spacing.xl }}
        />
        <View style={{ flex: 1 }}>
          <Text subtitle1>{name}</Text>
          <Text
            subtitle2
            style={{ color: colorAlpha(theme.colors.black, 0.75) }}
          >
            {specialty}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            <View
              style={{
                backgroundColor: colorAlpha(theme.colors.primary, 0.2),
                paddingHorizontal: theme.spacing.lg,
                paddingVertical: theme.spacing.sm,
                borderRadius: BORDER_RADIUS.rounded,
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: theme.spacing.md,
                marginTop: theme.spacing.md,
              }}
            >
              <Icon
                name="heart"
                type="ionicon"
                size={18}
                color={theme.colors.primary}
                style={{ marginRight: theme.spacing.sm, marginTop: 2 }}
              />
              <Text subtitle2>{`${rating}%`}</Text>
            </View>
            <View
              style={{
                backgroundColor: colorAlpha(theme.colors.blue, 0.2),
                paddingHorizontal: theme.spacing.lg,
                paddingVertical: theme.spacing.sm,
                borderRadius: BORDER_RADIUS.rounded,
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: theme.spacing.md,
                marginTop: theme.spacing.md,
              }}
            >
              <Icon
                name="briefcase"
                type="ionicon"
                size={18}
                color={theme.colors.blue}
                style={{ marginRight: theme.spacing.sm }}
              />
              <Text subtitle2>{`${experience}`}</Text>
            </View>
          </View>
        </View>
      </View>
    </BaseCard>
  );
}

export default PsychiatristCard;
