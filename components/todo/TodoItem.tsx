import { Icon, ListItem, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutLeft,
  SequencedTransition,
} from 'react-native-reanimated';
import { useDebounce } from 'use-debounce';

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

function TodoItem({ importanceLevel, reminderTime, todo, note, completed, id }: Todo) {
  const { theme } = useTheme();

  const [currentImportanceLevel, setCurrentImportanceLevel] = useState(importanceLevel);
  const [currentReminderTime, setCurrentReminderTime] = useState(reminderTime);
  const { control, watch, handleSubmit } = useForm<TodoFormData>({
    defaultValues: {
      todo,
      note,
    },
  });
  const [isCompleted, toggleIsCompleted] = useToggle(completed);
  const [debouncedIsCompleted] = useDebounce(isCompleted, 1000);

  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const importanceColor = theme.colors[
    IMPORTANCE_COLORS[currentImportanceLevel]
  ] as string;

  const bottomSheetRef = useRef<Modalize>(null);

  const showBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const handleUpdateTodo = async (todoFormData: TodoFormData) => {
    try {
      await updateMutation.mutateAsync({
        id,
        completed: isCompleted,
        importanceLevel: currentImportanceLevel,
        reminderTime: currentReminderTime,
        note: todoFormData.note,
        todo: todoFormData.todo,
      });
    } catch (error) {
      if (error) somethingWentWrongToast();
    }

    bottomSheetRef.current?.close();
  };

  const watchTodo = watch('todo', todo);
  const watchNote = watch('note', note);

  // update todo if checkbox has changed for 1 second
  useEffect(() => {
    updateMutation.mutateAsync({
      completed: debouncedIsCompleted,
      id,
      importanceLevel: currentImportanceLevel,
      reminderTime: currentReminderTime,
      note: watchNote,
      todo: watchTodo,
    });
  }, [debouncedIsCompleted]);

  const handleDeleteTodo = async () => {
    deleteMutation.mutate(id);
  };

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
              onCheckboxPress={() => toggleIsCompleted()}
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
        onSubmit={handleSubmit(handleUpdateTodo)}
        onDeletePress={handleDeleteTodo}
        onClose={async () => {
          updateMutation.mutate({
            id,
            completed: isCompleted,
            importanceLevel: currentImportanceLevel,
            reminderTime: currentReminderTime,
            note: watchNote,
            todo: watchTodo,
          });
        }}
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

export default TodoItem;
