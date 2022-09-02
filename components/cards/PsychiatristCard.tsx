import { useNavigation } from '@react-navigation/native';
import { Text, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import * as React from 'react';
import { View } from 'react-native';

import { ConsultScreenNavigationProps } from '../../types/navigation.types';
import { Psychiatrist } from '../../types/types';
import BaseAvatar from '../bases/BaseAvatar';
import BaseCard from '../bases/BaseCard';
import BaseLabel from '../bases/BaseLabel';

function PsychiatristCard({
  id,
  uri,
  experience,
  specialty,
  otherSpecialties,
  name,
  rating,
  patients,
  description,
  reviews,
  educations,
  place,
}: Psychiatrist) {
  const { theme } = useTheme();
  const navigation =
    useNavigation<ConsultScreenNavigationProps['navigation']>();
  return (
    <BaseCard
      onPress={() =>
        navigation.navigate('Psychiatrist', {
          id,
          uri,
          experience,
          specialty,
          otherSpecialties,
          name,
          rating,
          patients,
          description,
          reviews,
          educations,
          place,
        })
      }
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <BaseAvatar
          rounded
          size={5}
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
            <BaseLabel
              color={theme.colors.primary}
              showIcon
              labelSize="sm"
              iconName="heart"
              iconType="ionicon"
            >
              {rating}
            </BaseLabel>
            <BaseLabel
              color={theme.colors.yellow}
              showIcon
              labelSize="sm"
              iconName="briefcase"
              iconType="ionicon"
            >
              {`${experience} yrs`}
            </BaseLabel>
          </View>
        </View>
      </View>
    </BaseCard>
  );
}

export default PsychiatristCard;
