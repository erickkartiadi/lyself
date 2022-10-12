import { Icon, ListItem, Text, useTheme } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutLeft,
  SequencedTransition,
} from 'react-native-reanimated';
import { useDebouncedCallback } from 'use-debounce';

import { useDeleteTodo, useUpdateTodo } from '../../services/api/todos/todos.hooks';
import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import { BORDER_RADIUS } from '../../theme/theme';
import { Todo } from '../../types/types';
import IMPORTANCE_COLORS from '../../utils/constant/constant';
import { formatReminderTime } from '../../utils/formatTime';
import useToggle from '../../utils/hooks/useToggle';
import normalize from '../../utils/normalize';
import { somethingWentWrongToast } from '../../utils/toast';
import Card from '../base/Card';
import Checkbox from '../base/Checkbox';
import TodoBottomSheet, { TodoFormData } from './TodoBottomSheet';
import TodoSwipeableRight from './TodoSwipeableRight';

interface TodoItemProps {
  enableAnimation?: boolean;
}

function TodoItem({
  importanceLevel,
  reminderTime,
  todo,
  note,
  completed,
  id,
  enableAnimation,
}: Todo & TodoItemProps) {
  const { theme } = useTheme();

  const [currentImportanceLevel, setCurrentImportanceLevel] = useState(importanceLevel);
  const [currentReminderTime, setCurrentReminderTime] = useState(reminderTime);
  const { control, watch } = useForm<TodoFormData>({
    defaultValues: {
      todo,
      note,
    },
  });
  const [isCompleted, toggleIsCompleted] = useToggle(completed);

  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const importanceColor = isCompleted
    ? theme.colors.success
    : (theme.colors[IMPORTANCE_COLORS[currentImportanceLevel]] as string);

  const bottomSheetRef = useRef<Modalize>(null);

  const showBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const watchTodo = watch('todo', todo);
  const watchNote = watch('note', note);

  // close bottom sheet also update todo
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleUpdateTodo = async () => {
    try {
      updateMutation.mutate({
        id,
        completed: isCompleted,
        importanceLevel: currentImportanceLevel,
        reminderTime: currentReminderTime,
        note: watchNote,
        todo: watchTodo,
      });
    } catch (error) {
      if (error) somethingWentWrongToast();
    }
  };

  const debounceToggleTodo = useDebouncedCallback(() => {
    // TODO don't update if current completed == completed
    handleUpdateTodo();
  }, 500);

  const handleDeleteTodo = async () => {
    deleteMutation.mutate(id);
  };

  const isPastDue =
    !isCompleted && dayjs(currentReminderTime?.toDate()).isBefore(dayjs(), 'minute');

  return (
    <Animated.View
      layout={enableAnimation ? SequencedTransition : undefined}
      entering={enableAnimation ? LightSpeedInLeft : undefined}
      exiting={enableAnimation ? LightSpeedOutLeft : undefined}
    >
      <ListItem.Swipeable
        rightContent={
          <TodoSwipeableRight
            onPress={handleDeleteTodo}
            loading={deleteMutation.isLoading}
          />
        }
        rightWidth={normalize(80)}
        containerStyle={[
          spacing.mb_md,
          {
            padding: 0,
            borderRadius: BORDER_RADIUS.md,
            backgroundColor: theme.colors.background,
          },
        ]}
        rightStyle={[spacing.mb_md, spacing.pl_md]}
      >
        <Card
          onPress={showBottomSheet}
          cardStyle={{
            borderLeftWidth: theme.spacing.sm,
            borderStartColor: importanceColor,
          }}
        >
          <View style={[appStyles.flex, appStyles.flexDirRow, appStyles.alignCenter]}>
            <Checkbox
              fillColor={importanceColor}
              checked={isCompleted}
              onCheckboxPress={() => {
                toggleIsCompleted();
                debounceToggleTodo();
              }}
              size={normalize(28)}
            />
            <View style={[appStyles.flex, appStyles.flexDirCol]}>
              <Text
                subtitle
                numberOfLines={3}
                style={{
                  color:
                    isCompleted || watchTodo === ''
                      ? theme.colors.grey3
                      : theme.colors.black,
                  textDecorationLine: isCompleted ? 'line-through' : 'none',
                }}
              >
                {watchTodo === '' ? 'No title' : watchTodo}
              </Text>
              {!isCompleted && currentReminderTime && (
                <View
                  style={[
                    appStyles.flex,
                    appStyles.flexDirRow,
                    appStyles.alignCenter,
                    spacing.mt_xs,
                  ]}
                >
                  <Icon
                    containerStyle={spacing.mr_sm}
                    name="notifications-outline"
                    type="ionicon"
                    size={16}
                    color={isPastDue ? theme.colors.error : theme.colors.grey3}
                  />
                  <Text small color={isPastDue ? theme.colors.error : theme.colors.grey3}>
                    {formatReminderTime(currentReminderTime)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Card>
      </ListItem.Swipeable>
      <TodoBottomSheet
        buttonTitle={watchTodo === '' ? 'DELETE' : 'UPDATE'}
        onSubmit={closeBottomSheet}
        onDeletePress={handleDeleteTodo}
        onClose={handleUpdateTodo}
        isSaveLoading={updateMutation.isLoading}
        isDeleteLoading={deleteMutation.isLoading}
        bottomSheetRef={bottomSheetRef}
        completed={isCompleted}
        control={control}
        currentImportanceLevel={currentImportanceLevel}
        currentReminderTime={currentReminderTime}
        onCheckboxPress={() => toggleIsCompleted()}
        setCurrentImportanceLevel={setCurrentImportanceLevel}
        setCurrentReminderTime={setCurrentReminderTime}
      />
    </Animated.View>
  );
}

TodoItem.defaultProps = {
  enableAnimation: true,
};

export default TodoItem;
