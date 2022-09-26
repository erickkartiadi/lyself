import { ButtonProps, useTheme } from '@rneui/themed';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import * as React from 'react';
import { View } from 'react-native';

import BaseChoiceChip from '../bases/BaseChoiceChip';

dayjs.extend(objectSupport);

interface TimeOptionProps extends Pick<ButtonProps, 'onPress'> {
  hour: number;
  isSelected: boolean;
}
function TimeOption({ hour, isSelected, onPress }: TimeOptionProps) {
  const { theme } = useTheme();
  const formattedHour = dayjs({ hour }).format('HH:00');

  return (
    <View style={{ width: '20%' }}>
      <BaseChoiceChip
        isSelected={isSelected}
        containerStyle={{
          marginHorizontal: theme.spacing.sm,
          marginVertical: theme.spacing.sm,
        }}
        onPress={onPress}
      >
        {formattedHour}
      </BaseChoiceChip>
    </View>
  );
}

export default TimeOption;
