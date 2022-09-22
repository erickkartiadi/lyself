import { FAB, useTheme } from '@rneui/themed';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, RefreshControl } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Toast from 'react-native-toast-message';

import BaseIcon from '../../components/bases/BaseIcon';
import BaseViewSeparator from '../../components/bases/BaseViewSeparator';
import TodoEmptyMessage from '../../components/empty/TodoEmptyMessage';
import TodoBottomSheet, { TodoFormData } from '../../components/todo/TodoBottomSheet';
import TodoItem from '../../components/todo/TodoItem';
import { createTodo, fetchTodo } from '../../services/api/lyself/todo';
import { ErrorResponseData } from '../../services/axios/axios.types';
import { styles } from '../../theme/styles';
import { Todo } from '../../types/types';
import useToggle from '../../utils/hooks/useToggle';
import { somethingWentWrongToast } from '../../utils/toast';
import LoadingScreen from '../Others/LoadingScreen';

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
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { theme } = useTheme();

  const [currentImportanceLevel, setCurrentImportanceLevel] =
    useState<Todo['importanceLevel']>('none');
  const [currentReminderTime, setCurrentReminderTime] =
    useState<Todo['reminderTime']>(null);
  const { control, handleSubmit, reset, watch } = useForm<TodoFormData>({
    defaultValues: {
      todo: '',
      note: '',
    },
  });

  const watchTodo = watch('todo', '');

  const [isChecked, toggleIsChecked] = useToggle(false);

  const handleCheckboxPress = (checked: boolean) => {
    toggleIsChecked();
  };

  const bottomSheetRef = useRef<Modalize>(null);

  const loadTodos = async () => {
    const res = await fetchTodo();
    setTodoList(res.data.todos);
  };

  const onRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    await loadTodos();
    setIsRefreshing(false);
  }, []);

  const handleAddTodo = async ({ todo, note }: TodoFormData) => {
    if (todo === '' || todo === null) return;
    try {
      await createTodo({
        completed: isChecked,
        importanceLevel: currentImportanceLevel,
        note,
        todo,
        reminderTime: currentReminderTime,
      });

      bottomSheetRef.current?.close();
      await loadTodos();
      setCurrentImportanceLevel('none');
      setCurrentReminderTime(null);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const { message } = error.response.data as ErrorResponseData;

        Toast.show({
          type: 'error',
          text2: message instanceof Array ? message[0] : message,
        });
      } else {
        somethingWentWrongToast();
      }
    }
  };

  // TODO lottie files loading
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await loadTodos();
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <LoadingScreen />;

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
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            progressBackgroundColor={theme.colors.cardBackground}
            colors={[theme.colors.primary]}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={<TodoEmptyMessage />}
        showsHorizontalScrollIndicator={false}
        data={todoList}
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
        currentImportanceLevel={currentImportanceLevel}
        currentReminderTime={currentReminderTime}
        onCheckboxPress={handleCheckboxPress}
        setCurrentImportanceLevel={setCurrentImportanceLevel}
        setCurrentReminderTime={setCurrentReminderTime}
        isButtonVisible={watchTodo !== ''}
      />
    </>
  );
}

export default TodoScreen;
