import React from 'react';
import { Avatar, Text, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import colorAlpha from 'color-alpha';
import { useNavigation } from '@react-navigation/native';
import BaseCard from '../atoms/BaseCard';
import Label from '../atoms/Label';
import { ConsultScreenNavigationProps } from '../../navigation/navigation.types';
import { ReviewCardProps } from './ReviewCard';
import { EducationCardProps } from './EducationCard';

export interface PsychiatristCardProps {
  uri: string;
  experience: number;
  rating: number;
  patients: number;
  name: string;
  specialty: string;
  description: string;
  reviews: ReviewCardProps[];
  educations: EducationCardProps[];
}

function PsychiatristCard({
  uri,
  experience,
  specialty,
  name,
  rating,
  patients,
  description,
  reviews,
  educations,
}: PsychiatristCardProps) {
  const { theme } = useTheme();
  const navigation =
    useNavigation<ConsultScreenNavigationProps['navigation']>();
  return (
    <BaseCard
      onPress={() =>
        navigation.navigate('Psychiatrist', {
          uri,
          experience,
          specialty,
          name,
          rating,
          patients,
          description,
          reviews,
          educations,
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
              {`${experience} yrs`}
            </Label>
          </View>
        </View>
      </View>
    </BaseCard>
  );
}

export default PsychiatristCard;
