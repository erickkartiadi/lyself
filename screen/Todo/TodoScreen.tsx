import { FAB, useTheme } from '@rneui/themed';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList } from 'react-native';
import { Modalize } from 'react-native-modalize';

import BaseIcon from '../../components/bases/BaseIcon';
import BaseViewSeparator from '../../components/bases/BaseViewSeparator';
import RefreshControl from '../../components/placeholder/RefreshControl';
import TodoBottomSheet, { TodoFormData } from '../../components/todo/TodoBottomSheet';
import TodoItem from '../../components/todo/TodoItem';
import { createTodo, fetchTodos } from '../../services/api/lyself/todo';
import { styles } from '../../theme/styles';
import { Todo } from '../../types/types';
import useToggle from '../../utils/hooks/useToggle';
import ErrorScreen from '../Others/ErrorScreen';
import LoadingScreen from '../Others/LoadingScreen';
import TodoEmptyScreen from '../Others/TodoEmptyScreen';

const renderTodoList = ({
  item: { id, importanceLevel, reminderTime, todo, note, completed },
}: {
  item: Todo;
}) => (
  <TodoItem
    id={id}
    note={note}
    todo={todo}
    reminderTime={reminderTime}
    importanceLevel={importanceLevel}
    completed={completed}
  />
);

function TodoScreen() {
  const { theme } = useTheme();

  const queryClient = useQueryClient();
  const { isLoading, isError, data, isFetching, refetch } = useQuery<Todo[]>(
    ['todos'],
    fetchTodos
  );
  const mutation = useMutation(createTodo, {
    onSuccess: (newTodo: Todo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => [
        ...(oldTodos || []),
        newTodo,
      ]);
    },
  });

  const [isCompleted, toggleIsCompleted] = useToggle(false);
  const [newImportanceLevel, setNewImportanceLevel] =
    useState<Todo['importanceLevel']>('none');
  const [newReminderTime, setNewReminderTime] = useState<Todo['reminderTime']>(null);
  const { control, handleSubmit, reset, watch } = useForm<TodoFormData>({
    defaultValues: {
      todo: '',
      note: '',
    },
  });

  const bottomSheetRef = useRef<Modalize>(null);

  const handleAddTodo = async ({ todo, note }: TodoFormData) => {
    bottomSheetRef.current?.close();

    if (todo === '' || todo === null) return;

    mutation.mutate({
      completed: isCompleted,
      importanceLevel: newImportanceLevel,
      note,
      todo,
      reminderTime: newReminderTime,
    });

    setNewImportanceLevel('none');
    setNewReminderTime(null);
    reset();
  };

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <>
      <FlatList
        overScrollMode="never"
        ItemSeparatorComponent={BaseViewSeparator}
        style={[styles.noContainerGutter, styles.flatListHorizontal]}
        contentContainerStyle={[
          styles.containerGutter,
          styles.flatListHorizontalContainer,
          { flexGrow: 1 },
        ]}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        ListEmptyComponent={<TodoEmptyScreen />}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderTodoList}
      />
      <FAB
        color={theme.colors.primary}
        placement="right"
        onPress={() => bottomSheetRef.current?.open()}
        icon={
          <BaseIcon
            name="add"
            type="ionicon"
            size={28}
            backgroundColor="transparent"
            color={theme.colors.white}
            width={32}
          />
        }
      />
      <TodoBottomSheet
        onSubmit={handleSubmit(handleAddTodo)}
        bottomSheetRef={bottomSheetRef}
        completed={false}
        control={control}
        currentImportanceLevel={newImportanceLevel}
        currentReminderTime={newReminderTime}
        onCheckboxPress={() => toggleIsCompleted()}
        setCurrentImportanceLevel={setNewImportanceLevel}
        setCurrentReminderTime={setNewReminderTime}
        isButtonVisible={watch('todo', '') !== ''}
        isEditing={false}
      />
    </>
  );
}

export default TodoScreen;
