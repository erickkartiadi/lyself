import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Text, useTheme } from '@rneui/themed';
import BaseCard from '../atoms/BaseCard';

export interface EducationCardProps {
  id: number;
  institutionName: string;
  uri: string;
  startYear: number;
  studyPeriod: number;
}

function EducationCard({
  id,
  institutionName,
  uri,
  startYear,
  studyPeriod,
}: EducationCardProps) {
  const { theme } = useTheme();

  return (
    <BaseCard cardPadding="lg" key={id}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          size={58}
          containerStyle={{
            borderRadius: theme.spacing.md,
            borderWidth: 1,
            borderColor: theme.colors.grey5,
            padding: theme.spacing.sm,
            marginRight: theme.spacing.lg,
          }}
          source={{
            uri,
          }}
        />
        <View>
          <Text numberOfLines={1} subtitle1>
            {institutionName}
          </Text>
          <Text style={{ color: theme.colors.grey3 }} caption>
            {`${startYear} - ${startYear + studyPeriod}`}
          </Text>
        </View>
      </View>
    </BaseCard>
  );
}

export default EducationCard;
