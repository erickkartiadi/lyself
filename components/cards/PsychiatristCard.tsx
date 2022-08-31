import { useNavigation } from '@react-navigation/native';
import { Avatar, Text, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import React from 'react';
import { View } from 'react-native';

import { ConsultScreenNavigationProps } from '../../navigation/navigation.types';
import BaseCard from '../bases/BaseCard';
import BaseLabel from '../bases/BaseLabel';
import { EducationCardProps } from './EducationCard';
import { ReviewCardProps } from './ReviewCard';

export type PsychiatristLocation = {
  name: string;
  address: string;
  link: string;
  uri: string;
};

export interface PsychiatristCardProps {
  uri: string;
  experience: number;
  rating: number;
  patients: number;
  name: string;
  description: string;
  specialty: string;
  otherSpecialties: string[];
  reviews: ReviewCardProps[];
  educations: EducationCardProps[];
  psychiatristLocation: PsychiatristLocation;
}

function PsychiatristCard({
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
  psychiatristLocation,
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
          otherSpecialties,
          name,
          rating,
          patients,
          description,
          reviews,
          educations,
          psychiatristLocation,
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
