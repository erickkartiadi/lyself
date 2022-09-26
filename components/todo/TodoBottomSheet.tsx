import { Icon } from '@rneui/base';
import { Button, ButtonProps, useTheme } from '@rneui/themed';
import React, { Dispatch, SetStateAction } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ScrollView, TextInput, View } from 'react-native';

import { FONT, styles } from '../../theme/styles';
import { Todo } from '../../types/types';
import { IMPORTANCE_COLORS } from '../../utils/constant/constant';
import BaseBottomSheet, { BaseBottomSheetProps } from '../bases/BaseBottomSheet';
import SectionTitle from '../SectionTitle';
import TodoCheckbox from './TodoCheckbox';
import TodoImportanceButton from './TodoImportanceButton';
import TodoReminderButton from './TodoReminderButton';

export type TodoFormData = Pick<Todo, 'todo' | 'note'>;

interface TodoBottomSheetProps extends BaseBottomSheetProps, Pick<Todo, 'completed'> {
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
}: TodoBottomSheetProps) {
  const { theme } = useTheme();

  const importanceColor = theme.colors[
    IMPORTANCE_COLORS[currentImportanceLevel]
  ] as string;

  return (
    <BaseBottomSheet
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
      bottomSheetRef={bottomSheetRef}
      onClose={onClose}
    >
      <View style={[styles.container, styles.sectionLarge]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginBottom: theme.spacing.md,
          }}
        >
          <TodoCheckbox
            color={importanceColor}
            checked={completed}
            onCheckboxPress={onCheckboxPress}
            size={28}
          />
          <Controller
            control={control}
            name="todo"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  FONT.heading3,
                  {
                    color: theme.colors.black,
                    flex: 1,
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
        <View style={styles.sectionMedium}>
          <SectionTitle title="Note" />
          <Controller
            control={control}
            name="note"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  FONT.small,
                  { textAlignVertical: 'top', color: theme.colors.grey2 },
                ]}
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
        <View style={styles.sectionMedium}>
          <SectionTitle title="Reminder" />
          <TodoReminderButton
            setReminderTime={setCurrentReminderTime}
            reminderTime={currentReminderTime}
          />
        </View>
        <View style={styles.sectionMedium}>
          <SectionTitle title="Importance" />
          <ScrollView horizontal showsVerticalScrollIndicator={false}>
            <TodoImportanceButton
              importanceLevel="none"
              onPress={() => setCurrentImportanceLevel('none')}
              currentImportanceLevel={currentImportanceLevel}
            />
            <TodoImportanceButton
              importanceLevel="low"
              onPress={() => setCurrentImportanceLevel('low')}
              currentImportanceLevel={currentImportanceLevel}
            />
            <TodoImportanceButton
              importanceLevel="medium"
              onPress={() => setCurrentImportanceLevel('medium')}
              currentImportanceLevel={currentImportanceLevel}
            />
            <TodoImportanceButton
              importanceLevel="high"
              onPress={() => setCurrentImportanceLevel('high')}
              currentImportanceLevel={currentImportanceLevel}
            />
          </ScrollView>
        </View>
        {isButtonVisible && (
          <View style={{ flexDirection: 'row', marginTop: theme.spacing.xl }}>
            {isEditing && (
              <Button
                loading={isDeleteLoading}
                radius="md"
                type="outline"
                containerStyle={{ marginRight: theme.spacing.md }}
                onPress={onDeletePress}
              >
                <Icon name="trash" type="ionicon" size={21} color={theme.colors.error} />
              </Button>
            )}
            <Button
              loading={isSaveLoading}
              onPress={onSubmit}
              radius="md"
              containerStyle={{ flex: 1 }}
              fullWidth
            >
              {isEditing ? 'update' : 'save'}
            </Button>
          </View>
        )}
      </View>
    </BaseBottomSheet>
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
