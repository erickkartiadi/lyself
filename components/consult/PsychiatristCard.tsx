import { useNavigation } from '@react-navigation/native';
import { Chip, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

import { styles } from '../../theme/styles';
import { ConsultScreenNavigationProps } from '../../types/navigation.types';
import { Psychiatrist } from '../../types/types';
import BaseAvatar from '../bases/BaseAvatar';
import BaseCard from '../bases/BaseCard';

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
  const navigation = useNavigation<ConsultScreenNavigationProps['navigation']>();
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
          containerStyle={{ marginRight: theme.spacing.lg }}
        />
        <View style={{ flex: 1 }}>
          <Text subtitle>{name}</Text>
          <Text small color={theme.colors.grey3}>
            {specialty}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: theme.spacing.md,
              alignItems: 'center',
            }}
          >
            <Chip
              titleStyle={{ color: theme.colors.black }}
              title={`${rating}%`}
              color={theme.colors.background}
              icon={{
                name: 'heart',
                type: 'ionicon',
                size: 18,
                color: theme.colors.primary,
              }}
              size="sm"
              buttonStyle={[styles.shadowMedium]}
              containerStyle={{ marginRight: theme.spacing.sm }}
            />
            <Chip
              titleStyle={{ color: theme.colors.black }}
              title={`${experience} yrs`}
              color={theme.colors.background}
              icon={{
                name: 'work',
                type: 'material-icon',
                size: 18,
                color: theme.colors.warning,
              }}
              buttonStyle={[styles.shadowMedium]}
              containerStyle={{ marginRight: theme.spacing.sm }}
              size="sm"
            />
            <Chip
              titleStyle={{ color: theme.colors.black }}
              title={`${patients}`}
              color={theme.colors.background}
              icon={{
                name: 'people',
                type: 'ionicon',
                size: 18,
                color: theme.colors.blue,
              }}
              buttonStyle={[styles.shadowMedium]}
              containerStyle={{ marginRight: theme.spacing.sm }}
              size="sm"
            />
          </View>
        </View>
      </View>
    </BaseCard>
  );
}

export default PsychiatristCard;
