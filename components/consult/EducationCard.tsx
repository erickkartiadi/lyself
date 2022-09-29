import { Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

import { Education } from '../../types/types';
import Avatar from '../base/Avatar';
import Card from '../base/Card';

function EducationCard({ id, institutionName, uri, startYear, studyPeriod }: Education) {
  const { theme } = useTheme();

  return (
    <Card cardPadding="lg" key={id}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          containerStyle={{
            marginRight: theme.spacing.xl,
          }}
          source={{
            uri,
          }}
        />
        <View>
          <Text numberOfLines={1} subtitle>
            {institutionName}
          </Text>
          <Text color={theme.colors.grey3} small>
            {`${startYear} - ${startYear + studyPeriod}`}
          </Text>
        </View>
      </View>
    </Card>
  );
}

export default EducationCard;
