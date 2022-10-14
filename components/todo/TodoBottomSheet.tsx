import { Icon } from '@rneui/base';
import { Button, ButtonProps, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Control, Controller } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { CreateTodoDto } from '../../services/api/todos/todos.api';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { heading3 } from '../../styles/typhography';
import { SIZING } from '../../theme/theme';
import IMPORTANCE_COLORS from '../../utils/constant/constant';
import { importanceLevels } from '../../utils/sort';
import BottomSheet, { BottomSheetProps } from '../base/BottomSheet';
import Checkbox from '../base/Checkbox';
import OptionChip from '../base/OptionChip';
import TextInput from '../base/TextInput';
import SectionTitle from '../layout/SectionTitle';
import TodoReminderButton from './TodoReminderButton';

interface TodoBottomSheetProps extends BottomSheetProps {
  control: Control<CreateTodoDto>;
  onSubmit: ButtonProps['onPress'];
  onDelete?: ButtonProps['onPress'];
  buttonTitle: string;
  importanceColor: string;
  isButtonVisible?: boolean;
  isEditing?: boolean;
  isButtonLoading: boolean;
  isDeleteLoading?: boolean;
}

function TodoBottomSheet({
  bottomSheetRef,
  control,
  onSubmit,
  onClose,
  isButtonVisible,
  isEditing,
  onDelete,
  isDeleteLoading,
  isButtonLoading,
  buttonTitle,
  importanceColor,
}: TodoBottomSheetProps) {
  const { theme } = useTheme();

  return (
    <BottomSheet
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
      bottomSheetRef={bottomSheetRef}
      onClose={onClose}
    >
      <View style={[layout.container, layout.section_lg]}>
        <View style={[layout.flex, layout.flex_dir_row]}>
          <Controller
            control={control}
            name="completed"
            render={({ field: { onChange, onBlur, value } }) => (
              <Checkbox
                onPress={() => onChange(!value)}
                onBlur={onBlur}
                checked={value}
                size={SIZING['4xl']}
                fillColor={importanceColor}
              />
            )}
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
        <View style={layout.section_md}>
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
        <View style={layout.section_md}>
          <SectionTitle title="Reminder" />
          <TodoReminderButton control={control} />
        </View>
        <View style={layout.section_md}>
          <SectionTitle title="Importance" />
          <ScrollView horizontal showsVerticalScrollIndicator={false}>
            <Controller
              control={control}
              name="importanceLevel"
              render={({ field: { onChange, value } }) => (
                <>
                  {importanceLevels.map((importance) => (
                    <OptionChip
                      key={importance}
                      containerStyle={spacing.mr_md}
                      radius="sm"
                      size="lg"
                      chipColor={IMPORTANCE_COLORS[importance]}
                      uppercase
                      isSelected={importance === value}
                      onPress={() => onChange(importance)}
                    >
                      {importance}
                    </OptionChip>
                  ))}
                </>
              )}
            />
          </ScrollView>
        </View>
        {isButtonVisible && (
          <View style={[layout.flex_dir_row, spacing.mt_xl]}>
            {isEditing && (
              <Button
                loading={isDeleteLoading}
                radius="md"
                type="outline"
                containerStyle={spacing.mr_md}
                onPress={onDelete}
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
              loading={isButtonLoading}
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
  isEditing: true,
  onDelete: () => {},
  isDeleteLoading: false,
};

export default TodoBottomSheet;
