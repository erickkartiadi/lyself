import { Chip, ListItem, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Animated, {
  Layout,
  LightSpeedInLeft,
  LightSpeedOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useDebounce } from 'use-debounce';

import { useDeleteTodo, useUpdateTodo } from '../../services/api/todos/todos.hooks';
import { BORDER_RADIUS, GUTTER_SIZE, styles } from '../../theme/styles';
import { Todo } from '../../types/types';
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
      layout={Layout.springify()}
      entering={LightSpeedInLeft}
      style={animatedStyles}
      exiting={LightSpeedOutLeft}
    >
      <ListItem.Swipeable
        rightContent={<TodoSwipeableRight onPress={handleDeleteTodo} />}
        rightWidth={120}
        containerStyle={[
          styles.containerGutter,
          {
            padding: 0,
            marginRight: GUTTER_SIZE,
            borderRadius: BORDER_RADIUS.md,
            backgroundColor: theme.colors.background,
            marginBottom: theme.spacing.md,
          },
        ]}
        rightStyle={{ marginBottom: theme.spacing.md }}
        onPressIn={onPressInAnimation}
        onPressOut={onPressOutAnimation}
        onPress={showBottomSheet}
      >
        <View
          style={[
            {
              marginRight: GUTTER_SIZE * -1,
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
