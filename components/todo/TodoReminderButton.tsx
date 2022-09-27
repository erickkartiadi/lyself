import { Button, Icon, useTheme } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { BORDER_RADIUS } from '../../theme/styles';
import { Todo } from '../../types/types';
import { ThemeModeContext } from '../../utils/context/ThemeModeContext';
import { formatReminderTime } from '../../utils/formatTimeAgo';

interface TodoReminderButtonProps extends Pick<Todo, 'reminderTime'> {
  setReminderTime: React.Dispatch<React.SetStateAction<Date | null>>;
}

function TodoReminderButton({ reminderTime, setReminderTime }: TodoReminderButtonProps) {
  const { theme } = useTheme();
  const { isDarkMode } = useContext(ThemeModeContext);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleDatePickerConfirm = (date: Date) => {
    setReminderTime(date);
    hideDatePicker();
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDatePickerConfirm}
        onCancel={hideDatePicker}
        isDarkModeEnabled={isDarkMode}
        textColor={theme.colors.primary}
        accentColor={theme.colors.primary}
        minimumDate={new Date()}
      />
      <Button
        containerStyle={{ alignItems: 'flex-start', flex: 1 }}
        buttonStyle={{ backgroundColor: theme.colors.cardBackground }}
        titleStyle={{
          color: reminderTime ? theme.colors.primary : theme.colors.black,
          textAlign: 'left',
        }}
        radius="sm"
        onPress={showDatePicker}
      >
        <Icon
          name="notifications-outline"
          type="ionicon"
          size={18}
          color={reminderTime ? theme.colors.primary : theme.colors.black}
          containerStyle={{ marginRight: theme.spacing.lg }}
        />
        {reminderTime ? formatReminderTime(reminderTime) : 'Remind Me'}
        {reminderTime && (
          <Icon
            name="close"
            onPress={() => setReminderTime(null)}
            type="ionicon"
            size={18}
            containerStyle={{
              marginLeft: theme.spacing.xl * 1.5,
              borderRadius: BORDER_RADIUS.rounded,
            }}
          />
        )}
      </Button>
    </>
  );
}
export default TodoReminderButton;
