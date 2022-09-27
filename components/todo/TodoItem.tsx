import { Chip, ListItem, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutLeft,
  SequencedTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useDebounce } from 'use-debounce';

import { useDeleteTodo, useUpdateTodo } from '../../services/api/todos/todos.hooks';
import { BORDER_RADIUS } from '../../theme/styles';
import { Todo } from '../../types/types';
import { IMPORTANCE_COLORS } from '../../utils/constant/constant';
import { formatReminderTime } from '../../utils/formatTimeAgo';
import useToggle from '../../utils/hooks/useToggle';
import normalize from '../../utils/normalize';
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

  const handleDeleteTodo = async () => {
    deleteMutation.mutate(id);
  };

  const scaleValue = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  const onPressInAnimation = () => {
    scaleValue.value = withSpring(0.95);
  };

  const onPressOutAnimation = () => {
    scaleValue.value = withSpring(1);
  };

  return (
    <Animated.View
      layout={SequencedTransition}
      entering={LightSpeedInLeft}
      style={animatedStyles}
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
        onPressIn={onPressInAnimation}
        onPressOut={onPressOutAnimation}
        onPress={showBottomSheet}
      >
        <View
          style={[
            {
              backgroundColor: theme.colors.cardBackground,
              padding: theme.spacing.xl,
              borderRadius: BORDER_RADIUS.md,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-start',
            },
          ]}
        >
          <TodoCheckbox
            color={importanceColor}
            checked={isCompleted}
            onCheckboxPress={() => toggleIsCompleted()}
            size={normalize(24)}
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
                textDecorationStyle: 'solid',
                textDecorationColor: importanceColor,
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
                color={theme.colors.background}
                icon={{
                  name: 'notifications-outline',
                  type: 'ionicon',
                  size: 16,
                  color: theme.colors.grey1,
                }}
                titleStyle={{ color: theme.colors.grey1 }}
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
