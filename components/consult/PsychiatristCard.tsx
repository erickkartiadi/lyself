import { useNavigation } from '@react-navigation/native';
import { Chip, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

import { styles } from '../../theme/styles';
import { ConsultScreenNavigationProps } from '../../types/navigation.types';
import { Psychiatrist } from '../../types/types';
import Avatar from '../base/Avatar';
import Card from '../base/Card';

function PsychiatristCard({
  id,
  uri,
  experience,
  specialty,
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

  const showPsychiatristDetail = () => {
    navigation.navigate('Psychiatrist', {
      id,
      uri,
      experience,
      specialty,
      name,
      rating,
      patients,
      description,
      reviews,
      educations,
      place,
    });
  };

  return (
    <Card onPress={showPsychiatristDetail}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          rounded
          size={5.5}
          source={{ uri }}
          containerStyle={{ marginRight: theme.spacing.xl }}
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
              color="secondary"
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
              color="secondary"
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
              color="secondary"
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
    </Card>
  );
}

export default PsychiatristCard;
