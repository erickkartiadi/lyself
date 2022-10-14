import { Button, Icon, useTheme } from '@rneui/themed';
import { Timestamp } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { CreateTodoDto } from '../../services/api/todos/todos.api';
import border from '../../styles/border';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { ThemeModeContext } from '../../utils/context/ThemeModeContext';
import { formatReminderTime } from '../../utils/formatTime';

interface TodoReminderButtonProps {
  control: Control<CreateTodoDto>;
}

function TodoReminderButton({ control }: TodoReminderButtonProps) {
  const { theme } = useTheme();
  const { isDarkMode } = useContext(ThemeModeContext);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  return (
    <Controller
      control={control}
      name="reminderTime"
      render={({ field: { onChange, value } }) => (
        <>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={(date: Date) => {
              onChange(Timestamp.fromDate(date));
              hideDatePicker();
            }}
            onCancel={hideDatePicker}
            isDarkModeEnabled={isDarkMode}
            textColor={theme.colors.primary}
            accentColor={theme.colors.primary}
            minimumDate={new Date()}
          />
          <Button
            // isSelected={value !== null}
            color={value ? 'primary' : 'secondary'}
            titleStyle={{
              color: value ? theme.colors.white : theme.colors.black,
            }}
            radius="sm"
            onPress={showDatePicker}
            size="lg"
            uppercase
            containerStyle={[layout.flex, layout.align_start]}
          >
            <Icon
              name="notifications"
              type="ionicon"
              size={SIZING['2xl']}
              color={value ? theme.colors.white : theme.colors.black}
              containerStyle={spacing.mr_lg}
            />
            {value
              ? formatReminderTime(new Timestamp(value.seconds, value.nanoseconds))
              : 'Remind Me'}
            {value && (
              <Icon
                name="close"
                type="ionicon"
                onPress={() => onChange(null)}
                size={SIZING['2xl']}
                color={theme.colors.black}
                containerStyle={[border.rounded, spacing.ml_2xl]}
              />
            )}
          </Button>
        </>
      )}
    />
  );
}
export default TodoReminderButton;
