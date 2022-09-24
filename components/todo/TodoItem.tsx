import { Chip, ListItem, Text, useTheme } from '@rneui/themed';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useDebounce } from 'use-debounce';

import { deleteTodo, updateTodo } from '../../services/api/lyself/todo';
import { Todo } from '../../types/types';
import colorAlpha from '../../utils/colorAlpha';
import { IMPORTANCE_COLORS } from '../../utils/constant/constant';
import { formatReminderTime } from '../../utils/formatTimeAgo';
import useToggle from '../../utils/hooks/useToggle';
import { somethingWentWrongToast } from '../../utils/toast';
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

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: (todos) => queryClient.setQueriesData(['todos'], todos),
  });

  const updateMutation = useMutation(updateTodo, {
    onSuccess: (todos) => queryClient.setQueriesData(['todos'], todos),
  });

  const importanceColor = theme.colors[
    IMPORTANCE_COLORS[currentImportanceLevel]
  ] as string;

  const bottomSheetRef = useRef<Modalize>(null);

  const showBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const handleUpdateTodo = async (todoFormData: TodoFormData) => {
    if (todoFormData.todo === '') {
      deleteMutation.mutate(id);
    }
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

  const handleDeleteTodo = async () => {
    deleteMutation.mutate(id);
  };

  // update todo if checkbox has changed for 1 second
  useEffect(() => {
    updateMutation.mutateAsync({
      completed: debouncedIsCompleted,
      id,
      importanceLevel: currentImportanceLevel,
      reminderTime: currentReminderTime,
      note: watch('note', note),
      todo: watch('todo', todo),
    });
  }, [debouncedIsCompleted]);

  return (
    <>
      <ListItem.Swipeable
        android_ripple={{
          color: colorAlpha(theme.colors.grey4, 0.1),
          foreground: true,
        }}
        leftContent={<TodoSwipeableRight onPress={handleDeleteTodo} />}
        rightContent={<TodoSwipeableRight onPress={handleDeleteTodo} />}
        containerStyle={{
          backgroundColor: theme.colors.background,
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.lg,
        }}
        onPress={showBottomSheet}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <TodoCheckbox
            boxOutlineColor={importanceColor}
            checked={isCompleted}
            onCheckboxPress={() => toggleIsCompleted()}
            size={25}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: isCompleted ? theme.colors.grey3 : theme.colors.black,
                textDecorationLine: isCompleted ? 'line-through' : 'none',
                width: '90%',
              }}
            >
              {watch('todo', todo)}
            </Text>
            {!isCompleted && currentReminderTime && (
              <Chip
                containerStyle={{
                  alignSelf: 'flex-start',
                  marginTop: theme.spacing.md,
                }}
                color={theme.colors.cardBackground}
                icon={{
                  name: 'notifications-outline',
                  type: 'ionicon',
                  size: 16,
                  color: theme.colors.grey3,
                }}
                size="sm"
                titleStyle={{ color: theme.colors.grey3 }}
                title={formatReminderTime(currentReminderTime)}
              />
            )}
          </View>
        </View>
      </ListItem.Swipeable>
      <TodoBottomSheet
        onSubmit={handleSubmit(handleUpdateTodo)}
        onDeletePress={handleDeleteTodo}
        onClose={async () => {
          updateMutation.mutate({
            id,
            completed: isCompleted,
            importanceLevel: currentImportanceLevel,
            reminderTime: currentReminderTime,
            note: watch('note', note),
            todo: watch('todo', todo),
          });
        }}
        bottomSheetRef={bottomSheetRef}
        completed={isCompleted}
        control={control}
        currentImportanceLevel={currentImportanceLevel}
        currentReminderTime={currentReminderTime}
        onCheckboxPress={() => toggleIsCompleted()}
        setCurrentImportanceLevel={setCurrentImportanceLevel}
        setCurrentReminderTime={setCurrentReminderTime}
      />
    </>
  );
}

export default TodoItem;
