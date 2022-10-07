import { Icon, ListItem, Text, useTheme } from '@rneui/themed';
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
import { BORDER_RADIUS } from '../../theme/styles';
import { Todo } from '../../types/types';
import IMPORTANCE_COLORS from '../../utils/constant/constant';
import { formatReminderTime } from '../../utils/formatTimeAgo';
import useToggle from '../../utils/hooks/useToggle';
import normalize from '../../utils/normalize';
import { somethingWentWrongToast } from '../../utils/toast';
import Card from '../base/Card';
import TodoBottomSheet, { TodoFormData } from './TodoBottomSheet';
import TodoCheckbox from './TodoCheckbox';
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

  const importanceColor = theme.colors[
    IMPORTANCE_COLORS[currentImportanceLevel]
  ] as string;

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
    handleUpdateTodo();
  }, 500);

  const handleDeleteTodo = async () => {
    deleteMutation.mutate(id);
  };
  // FIXME fix invalid date

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
          {
            padding: 0,
            borderRadius: BORDER_RADIUS.md,
            backgroundColor: theme.colors.background,
            marginBottom: theme.spacing.md,
          },
        ]}
        rightStyle={{ marginBottom: theme.spacing.md, paddingLeft: theme.spacing.md }}
      >
        <Card onPress={showBottomSheet}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <TodoCheckbox
              color={importanceColor}
              checked={isCompleted}
              onCheckboxPress={() => {
                toggleIsCompleted();
                debounceToggleTodo();
              }}
              size={normalize(28)}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
              }}
            >
              <Text
                subtitle
                numberOfLines={1}
                style={{
                  color:
                    isCompleted || watchTodo === ''
                      ? theme.colors.grey3
                      : theme.colors.black,
                  textDecorationLine: isCompleted ? 'line-through' : 'none',
                  textDecorationStyle: 'solid',
                  textDecorationColor: importanceColor,
                  width: '90%',
                }}
              >
                {watchTodo === '' ? 'No title' : watchTodo}
              </Text>
              {!isCompleted && currentReminderTime && (
                <View
                  style={{
                    marginTop: theme.spacing.xs,
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    containerStyle={{ marginRight: theme.spacing.sm }}
                    name="notifications-outline"
                    type="ionicon"
                    size={16}
                    color={theme.colors.grey3}
                  />
                  <Text small color={theme.colors.grey3}>
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
