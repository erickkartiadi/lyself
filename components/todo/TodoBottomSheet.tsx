import { Icon } from '@rneui/base';
import { Button, ButtonProps, useTheme } from '@rneui/themed';
import React, { Dispatch, SetStateAction } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { heading3 } from '../../styles/typhography';
import { SIZING } from '../../theme/theme';
import { Todo } from '../../types/types';
import IMPORTANCE_COLORS from '../../utils/constant/constant';
import { importanceLevelItems } from '../../utils/sort';
import BottomSheet, { BottomSheetProps } from '../base/BottomSheet';
import Checkbox from '../base/Checkbox';
import OptionChip from '../base/OptionChip';
import TextInput from '../base/TextInput';
import SectionTitle from '../layout/SectionTitle';
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

  const importanceColor = completed
    ? theme.colors.success
    : (theme.colors[IMPORTANCE_COLORS[currentImportanceLevel]] as string);

  return (
    <BottomSheet
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
      bottomSheetRef={bottomSheetRef}
      onClose={onClose}
    >
      <View style={[layout.container, layout.sectionLarge]}>
        <View style={[layout.flex, layout.flexDirRow]}>
          {/* FIXME checkbox wont toggle */}
          <Checkbox
            checked={completed}
            onCheckboxPress={onCheckboxPress}
            size={SIZING['4xl']}
            fillColor={importanceColor}
          />
          <Controller
            control={control}
            name="todo"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                showBorder={false}
                enableErrorMessage={false}
                placeholder="What are you planning today?"
                multiline
                containerStyle={layout.flex}
                inputStyle={heading3}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View style={layout.sectionMedium}>
          <SectionTitle title="Note" marginBottom="sm" />
          <Controller
            control={control}
            name="note"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                showBorder={false}
                enableErrorMessage={false}
                placeholder="Add note"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                multiline
              />
            )}
          />
        </View>
        <View style={layout.sectionMedium}>
          <SectionTitle title="Reminder" />
          <TodoReminderButton
            setReminderTime={setCurrentReminderTime}
            reminderTime={currentReminderTime}
          />
        </View>
        <View style={layout.sectionMedium}>
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
          <View style={[layout.flexDirRow, spacing.mt_xl]}>
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
                  size={SIZING['3xl']}
                  color={theme.colors.error}
                />
              </Button>
            )}
            <Button
              loading={isSaveLoading}
              onPress={onSubmit}
              radius="md"
              containerStyle={layout.flex}
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
