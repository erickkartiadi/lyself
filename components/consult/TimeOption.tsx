import { Button, ButtonProps, Text, useTheme } from '@rneui/themed';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import * as React from 'react';
import { View } from 'react-native';

dayjs.extend(objectSupport);

interface TimeOptionProps extends Pick<ButtonProps, 'onPress'> {
  hour: number;
  isSelected: boolean;
}
function TimeOption({ hour, isSelected, onPress }: TimeOptionProps) {
  const { theme } = useTheme();
  const formattedHour = dayjs({ hour }).format('HH:00');

  const backgroundColor = isSelected ? theme.colors.primary : theme.colors.cardBackground;

  return (
    <View style={{ width: '20%' }}>
      <Button
        onPress={onPress}
        buttonStyle={{
          backgroundColor,
          borderWidth: 0,
        }}
        containerStyle={{
          alignItems: 'stretch',
          marginVertical: theme.spacing.sm,
          marginHorizontal: theme.spacing.sm,
        }}
        size="md"
      >
        <Text
          small
          style={{
            color: isSelected ? theme.colors.white : theme.colors.black,
          }}
        >
          {formattedHour}
        </Text>
      </Button>
    </View>
  );
}

export default TimeOption;
