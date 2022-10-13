import { Icon, useTheme } from '@rneui/themed';
import { Timestamp } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import border from '../../styles/border';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Todo } from '../../types/types';
import { ThemeModeContext } from '../../utils/context/ThemeModeContext';
import { formatReminderTime } from '../../utils/formatTime';
import OptionChip from '../base/OptionChip';

interface TodoReminderButtonProps extends Pick<Todo, 'reminderTime'> {
  setReminderTime: React.Dispatch<React.SetStateAction<Todo['reminderTime']>>;
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
    setReminderTime(Timestamp.fromDate(date));
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
      <OptionChip
        isSelected={reminderTime !== null}
        radius="sm"
        onPress={showDatePicker}
        size="lg"
        uppercase
        containerStyle={[layout.flex, layout.alignStart]}
      >
        <Icon
          name="notifications"
          type="ionicon"
          size={SIZING['2xl']}
          color={reminderTime ? theme.colors.white : theme.colors.black}
          containerStyle={spacing.mr_lg}
        />
        {reminderTime ? formatReminderTime(reminderTime) : 'Remind Me'}
        {reminderTime && (
          <Icon
            name="close"
            type="ionicon"
            onPress={() => setReminderTime(null)}
            size={SIZING['2xl']}
            color={theme.colors.black}
            containerStyle={[border.rounded, spacing.ml_2xl]}
          />
        )}
      </OptionChip>
    </>
  );
}
export default TodoReminderButton;
