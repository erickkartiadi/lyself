import { Icon } from '@rneui/base';
import { Button, ButtonProps, useTheme } from '@rneui/themed';
import React, { Dispatch, SetStateAction } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ScrollView, TextInput, View } from 'react-native';

import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import { FONT } from '../../theme/theme';
import { Todo } from '../../types/types';
import IMPORTANCE_COLORS from '../../utils/constant/constant';
import normalize from '../../utils/normalize';
import { importanceLevelItems } from '../../utils/sort';
import BottomSheet, { BottomSheetProps } from '../base/BottomSheet';
import OptionChip from '../base/OptionChip';
import SectionTitle from '../layout/SectionTitle';
import TodoCheckbox from './TodoCheckbox';
import TodoReminderButton from './TodoReminderButton';

export type TodoFormData = Pick<Todo, 'todo' | 'note'>;

interface TodoBottomSheetProps extends BottomSheetProps, Pick<Todo, 'completed'> {
  currentReminderTime: Todo['reminderTime'];
  currentImportanceLevel: Todo['importanceLevel'];
  control: Control<TodoFormData>;
  setCurrentReminderTime: Dispatch<SetStateAction<Todo['reminderTime']>>;
  setCurrentImportanceLevel: Dispatch<SetStateAction<Todo['importanceLevel']>>;
  onSubmit: ButtonProps['onPress'];
  onDeletePress?: ButtonProps['onPress'];
  onClose?: () => void;
  onCheckboxPress: (checked: boolean) => void;
  isButtonVisible?: boolean;
  isEditing?: boolean;
  isDeleteLoading?: boolean;
  isSaveLoading: boolean;
  buttonTitle: string;
}

function TodoBottomSheet({
  bottomSheetRef,
  completed,
  currentImportanceLevel,
  currentReminderTime,
  onCheckboxPress,
  control,
  setCurrentReminderTime,
  setCurrentImportanceLevel,
  onSubmit,
  onClose,
  isButtonVisible,
  isEditing,
  onDeletePress,
  isDeleteLoading,
  isSaveLoading,
  buttonTitle,
}: TodoBottomSheetProps) {
  const { theme } = useTheme();

  const importanceColor = theme.colors[
    IMPORTANCE_COLORS[currentImportanceLevel]
  ] as string;

  return (
    <BottomSheet
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
      bottomSheetRef={bottomSheetRef}
      onClose={onClose}
    >
      <View style={[appStyles.container, appStyles.sectionLarge]}>
        <View style={[appStyles.flex, appStyles.flexDirRow, spacing.mb_md]}>
          <TodoCheckbox
            color={importanceColor}
            checked={completed}
            onCheckboxPress={onCheckboxPress}
            size={normalize(32)}
          />
          <Controller
            control={control}
            name="todo"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  FONT.heading3,
                  appStyles.flex,
                  {
                    color: theme.colors.black,
                  },
                ]}
                placeholder="What are you planning today?"
                placeholderTextColor={theme.colors.grey3}
                selectionColor={theme.colors.primary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View style={appStyles.sectionMedium}>
          <SectionTitle title="Note" />
          <Controller
            control={control}
            name="note"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[{ textAlignVertical: 'top' }]}
                placeholder="Add note"
                placeholderTextColor={theme.colors.grey3}
                onChangeText={onChange}
                onBlur={onBlur}
                selectionColor={theme.colors.primary}
                value={value}
                multiline
              />
            )}
          />
        </View>
        <View style={appStyles.sectionMedium}>
          <SectionTitle title="Reminder" />
          <TodoReminderButton
            setReminderTime={setCurrentReminderTime}
            reminderTime={currentReminderTime}
          />
        </View>
        <View style={appStyles.sectionMedium}>
          <SectionTitle title="Importance" />
          <ScrollView horizontal showsVerticalScrollIndicator={false}>
            {importanceLevelItems.map(({ importance, label }) => (
              <OptionChip
                size="lg"
                containerStyle={spacing.mr_md}
                chipColor={IMPORTANCE_COLORS[importance]}
                radius="sm"
                uppercase
                key={importance}
                isSelected={importance === currentImportanceLevel}
                onPress={() => setCurrentImportanceLevel(importance)}
              >
                {label}
              </OptionChip>
            ))}
          </ScrollView>
        </View>
        {isButtonVisible && (
          <View style={[appStyles.flexDirRow, spacing.mt_xl]}>
            {isEditing && (
              <Button
                loading={isDeleteLoading}
                radius="md"
                type="outline"
                containerStyle={spacing.mr_md}
                onPress={onDeletePress}
              >
                <Icon
                  name="trash"
                  type="ionicon"
                  size={normalize(22)}
                  color={theme.colors.error}
                />
              </Button>
            )}
            <Button
              loading={isSaveLoading}
              onPress={onSubmit}
              radius="md"
              containerStyle={appStyles.flex}
              fullWidth
            >
              {buttonTitle}
            </Button>
          </View>
        )}
      </View>
    </BottomSheet>
  );
}

TodoBottomSheet.defaultProps = {
  isButtonVisible: true,
  onClose: () => {},
  onDeletePress: () => {},
  isEditing: true,
  isDeleteLoading: false,
};

export default TodoBottomSheet;
