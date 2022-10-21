import { Icon, ListItem, Text, useTheme } from '@rneui/themed';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutLeft,
  SequencedTransition,
} from 'react-native-reanimated';
import { useDebouncedCallback } from 'use-debounce';

import { CreateTodoDto } from '../../services/api/todos/todos.api';
import { useDeleteTodo, useUpdateTodo } from '../../services/api/todos/todos.hooks';
import border from '../../styles/border';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Todo } from '../../types/types';
import IMPORTANCE_COLORS from '../../utils/constant/constant';
import { formatReminderTime } from '../../utils/formatTime';
import Card from '../base/Card';
import Checkbox from '../base/Checkbox';
import TodoBottomSheet from './TodoBottomSheet';
import TodoSwipeableRight from './TodoSwipeableRight';

function TodoItem({ importanceLevel, reminderTime, todo, note, completed, id }: Todo) {
  const { theme } = useTheme();

  const { control, watch, setValue } = useForm<CreateTodoDto>({
    defaultValues: {
      todo,
      note,
      completed,
      reminderTime,
      importanceLevel,
    },
  });

  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const bottomSheetRef = useRef<Modalize>(null);

  const watchCompleted = watch('completed', completed);
  const watchTodo = watch('todo', todo);
  const watchNote = watch('note', note);
  const watchReminderTime = watch('reminderTime', reminderTime);
  const watchImportanceLevel = watch('importanceLevel', importanceLevel);

  const importanceColor = watchCompleted
    ? theme.colors.success
    : (theme.colors[IMPORTANCE_COLORS[watchImportanceLevel]] as string);

  // close bottom sheet also update todo
  const closeBottomSheet = () => bottomSheetRef.current?.close();
  const showBottomSheet = () => bottomSheetRef.current?.open();

  const handleUpdateTodo = async () => {
    const convertedReminderTime = watchReminderTime
      ? new Timestamp(watchReminderTime?.seconds, watchReminderTime?.nanoseconds)
      : null;

    const isReminderTimeChanged =
      JSON.stringify(reminderTime) === JSON.stringify(watchReminderTime);

    // no update if there's no change
    if (
      completed === watchCompleted &&
      importanceLevel === watchImportanceLevel &&
      isReminderTimeChanged &&
      note === watchNote &&
      todo === watchTodo
    )
      return;

    updateTodoMutation.mutate(
      {
        id,
        completed: watchCompleted,
        importanceLevel: watchImportanceLevel,
        reminderTime: convertedReminderTime,
        note: watchNote,
        todo: watchTodo,
      },
      {
        onSettled: () => {
          closeBottomSheet();
        },
      }
    );
  };

  const debounceToggleTodo = useDebouncedCallback(() => {
    handleUpdateTodo();
  }, 500);

  const handleDeleteTodo = async () => {
    deleteTodoMutation.mutate(id, {
      onSuccess: () => {
        closeBottomSheet();
      },
    });
  };

  const isPastDue =
    !watchCompleted && dayjs(reminderTime?.toDate()).isBefore(dayjs(), 'minute');
  const pastDueColor = isPastDue ? theme.colors.error : theme.colors.grey3;

  return (
    <Animated.View
      layout={SequencedTransition}
      entering={LightSpeedInLeft}
      exiting={LightSpeedOutLeft}
    >
      <ListItem.Swipeable
        rightContent={
          <TodoSwipeableRight
            onPress={handleDeleteTodo}
            loading={deleteTodoMutation.isLoading}
          />
        }
        rightWidth={SIZING['8xl']}
        containerStyle={[spacing.mb_md, spacing.p_0, border.radius_md]}
        rightStyle={[spacing.mb_md, spacing.pl_md]}
      >
        <Card
          onPress={showBottomSheet}
          cardStyle={[
            border.left_width_xl,
            {
              borderStartColor: importanceColor,
            },
          ]}
        >
          <View style={[layout.flex, layout.flex_dir_row, layout.align_center]}>
            <Checkbox
              onPress={() => {
                setValue('completed', !watchCompleted);
                debounceToggleTodo();
              }}
              fillColor={importanceColor}
              checked={watchCompleted}
            />
            <View style={[layout.flex, layout.flex_dir_col]}>
              <Text
                subtitle
                numberOfLines={3}
                style={{
                  color:
                    watchCompleted || watchTodo === ''
                      ? theme.colors.grey3
                      : theme.colors.black,
                  textDecorationLine: watchCompleted ? 'line-through' : 'none',
                }}
              >
                {watchTodo === '' ? 'No title' : watchTodo}
              </Text>
              {!watchCompleted && reminderTime && (
                <View
                  style={[
                    layout.flex,
                    layout.flex_dir_row,
                    layout.align_center,
                    spacing.mt_xs,
                  ]}
                >
                  <Icon
                    containerStyle={spacing.mr_sm}
                    name="notifications-outline"
                    type="ionicon"
                    size={SIZING.xl}
                    color={pastDueColor}
                  />
                  <Text small style={{ color: pastDueColor }}>
                    {formatReminderTime(reminderTime)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Card>
      </ListItem.Swipeable>
      <TodoBottomSheet
        importanceColor={importanceColor}
        onSubmit={handleUpdateTodo}
        onClose={handleUpdateTodo}
        onDelete={handleDeleteTodo}
        buttonTitle="UPDATE"
        isButtonLoading={updateTodoMutation.isLoading}
        isDeleteLoading={deleteTodoMutation.isLoading}
        bottomSheetRef={bottomSheetRef}
        control={control}
      />
    </Animated.View>
  );
}

TodoItem.defaultProps = {
  enableAnimation: true,
};

export default TodoItem;
