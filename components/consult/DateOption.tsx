import { Button, ButtonProps, Text, useTheme } from '@rneui/themed';
import dayjs from 'dayjs';
import * as React from 'react';

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

  const backgroundColor = isSelected ? theme.colors.primary : theme.colors.secondary;
  const selectedTextColor = isSelected ? theme.colors.white : textColor;

  return (
    <Button
      onPress={onPress}
      buttonStyle={{
        backgroundColor,
        borderWidth: 0,
        flex: 1,
        flexDirection: 'column',
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
    </Button>
  );
}

export default DateOption;
