import { ButtonProps, Text, useTheme } from '@rneui/themed';
import dayjs from 'dayjs';
import * as React from 'react';

import BaseChoiceChip from '../bases/BaseChoiceChip';

interface DateOptionProps extends Pick<ButtonProps, 'onPress'> {
  date: Date;
  isSelected: boolean;
}

function DateOption({ date, isSelected, onPress }: DateOptionProps) {
  const { theme } = useTheme();

  const dayjsDate = dayjs(date);
  const dayOfWeek = dayjsDate.format('ddd');
  const dateOfMonth = dayjsDate.format('DD');

  const isToday = dayjsDate.isSame(dayjs(), 'date');

  const textColor = isToday ? theme.colors.primary : theme.colors.black;
  const selectedTextColor = isSelected ? theme.colors.primary : textColor;

  return (
    <BaseChoiceChip
      isSelected={isSelected}
      onPress={onPress}
      buttonStyle={{
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
      }}
    >
      <Text
        h2
        h2Style={{
          color: selectedTextColor,
        }}
      >
        {dateOfMonth}
      </Text>
      <Text
        caption
        style={{
          textTransform: 'uppercase',
          color: selectedTextColor,
        }}
      >
        {dayOfWeek}
      </Text>
    </BaseChoiceChip>
  );
}

export default DateOption;
