import { Icon, ListItem, Text, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { deleteTodo, toggleTodo, updateTodo } from '../../services/api/lyself/todo';
import { BORDER_RADIUS } from '../../theme/styles';
import { Todo } from '../../types/types';
import { TODO_IMPORTANCE_COLORS } from '../../utils/constant/constant';
import { formatReminderTime } from '../../utils/formatTimeAgo';
import useToggle from '../../utils/hooks/useToggle';
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
  const watchTodo = watch('todo', todo);
  const [isChecked, toggleIsChecked] = useToggle(completed);

  const importanceColor = theme.colors[
    TODO_IMPORTANCE_COLORS[currentImportanceLevel]
  ] as string;

  const formattedReminderTime =
    currentReminderTime && formatReminderTime(currentReminderTime);

  const bottomSheetRef = useRef<Modalize>(null);

  const showBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const handleEditTodo = async (todoFormData: TodoFormData) => {
    if (todoFormData.todo === '') {
      await deleteTodo(id);
      return;
    }

    await updateTodo(id, {
      completed: isChecked,
      importanceLevel: currentImportanceLevel,
      note: todoFormData.note,
      reminderTime: currentReminderTime,
      todo: todoFormData.todo,
    });
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(id);
  };

  useEffect(() => {
    (async () => {
      await toggleTodo(id, isChecked);
    })();
  }, [isChecked]);

  return (
    <>
      <ListItem.Swipeable
        android_ripple={{
          color: colorAlpha(theme.colors.grey3, 0.1),
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
            checked={isChecked}
            onCheckboxPress={() => toggleIsChecked()}
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
                color: isChecked ? theme.colors.grey3 : theme.colors.black,
                textDecorationLine: isChecked ? 'line-through' : 'none',
                width: '90%',
              }}
            >
              {watchTodo}
            </Text>
            {!isChecked && currentReminderTime && (
              <View
                style={{
                  marginTop: theme.spacing.md,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: theme.colors.cardBackground,
                  padding: theme.spacing.sm,
                  borderRadius: BORDER_RADIUS.sm,
                }}
              >
                <Icon
                  name="notifications-outline"
                  type="ionicon"
                  size={16}
                  color={theme.colors.grey3}
                  containerStyle={{ marginRight: theme.spacing.md }}
                />
                <Text caption style={{ color: theme.colors.grey3 }}>
                  {formattedReminderTime}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ListItem.Swipeable>
      <TodoBottomSheet
        onSubmit={() => {
          handleSubmit(handleEditTodo);
          bottomSheetRef.current?.close();
        }}
        onClose={handleSubmit(handleEditTodo)}
        bottomSheetRef={bottomSheetRef}
        completed={isChecked}
        control={control}
        currentImportanceLevel={currentImportanceLevel}
        currentReminderTime={currentReminderTime}
        onCheckboxPress={() => toggleIsChecked()}
        setCurrentImportanceLevel={setCurrentImportanceLevel}
        setCurrentReminderTime={setCurrentReminderTime}
      />
    </>
  );
}

export default TodoItem;
