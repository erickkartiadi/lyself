import { Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

import { Education } from '../../types/types';
import BaseAvatar from '../bases/BaseAvatar';
import BaseCard from '../bases/BaseCard';

function EducationCard({
  id,
  institutionName,
  uri,
  startYear,
  studyPeriod,
}: Education) {
  const { theme } = useTheme();

  return (
    <BaseCard cardPadding="lg" key={id}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <BaseAvatar
          containerStyle={{
            marginRight: theme.spacing.xl,
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
