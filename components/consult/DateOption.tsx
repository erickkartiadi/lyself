import { ButtonProps, Text, useTheme } from '@rneui/themed';
import dayjs from 'dayjs';
import * as React from 'react';

import OptionChip from '../base/OptionChip';

interface DateOptionProps extends Pick<ButtonProps, 'onPress'> {
  date: Date;
  isSelected: boolean;
}

function DateOption({ date, isSelected, onPress }: DateOptionProps) {
  const { theme } = useTheme();

  const dayjsDate = dayjs(date);
  const dayOfWeek = dayjsDate.format('ddd');
  const dateOfMonth = dayjsDate.format('DD');

  const selectedTextColor = isSelected ? theme.colors.white : theme.colors.black;

  return (
    <OptionChip
      isSelected={isSelected}
      onPress={onPress}
      buttonStyle={{
        flex: 1,
        flexDirection: 'column',
        paddingVertical: theme.spacing.xl,
        paddingHorizontal: theme.spacing.xl,
      }}
    >
      <Text
        h1
        h1Style={{
          color: selectedTextColor,
        }}
      >
        {dateOfMonth}
      </Text>
      <Text
        small
        style={{
          textTransform: 'uppercase',
          color: selectedTextColor,
        }}
      >
        {dayOfWeek}
      </Text>
    </OptionChip>
  );
}

export default DateOption;
