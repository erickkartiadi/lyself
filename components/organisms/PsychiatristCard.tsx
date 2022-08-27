import React from 'react';
import { Avatar, Text, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import colorAlpha from 'color-alpha';
import { useNavigation } from '@react-navigation/native';
import BaseCard from '../atoms/BaseCard';

import { ExploreScreenProps } from '../../screen/Explore/ExploreScreen';
import Label from '../atoms/Label';

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
            <Label
              color={theme.colors.primary}
              showIcon
              name="heart"
              type="ionicon"
            >
              {rating}
            </Label>
            <Label
              color={theme.colors.yellow}
              showIcon
              name="briefcase"
              type="ionicon"
            >
              {experience}
            </Label>
          </View>
        </View>
      </View>
    </BaseCard>
  );
}

export default PsychiatristCard;
