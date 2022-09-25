import { FAB, Icon, useTheme } from '@rneui/themed';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

import RefreshControl from '../../components/placeholder/RefreshControl';
import TodoBottomSheet, { TodoFormData } from '../../components/todo/TodoBottomSheet';
import TodoItem from '../../components/todo/TodoItem';
import { useCreateTodo, useGetTodos } from '../../services/api/todos/todos.hooks';
import { styles } from '../../theme/styles';
import { TodoScreenNavigationProps } from '../../types/navigation.types';
import { Todo } from '../../types/types';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';
import useToggle from '../../utils/hooks/useToggle';
import ErrorScreen from '../Others/ErrorScreen';
import LoadingScreen from '../Others/LoadingScreen';
import TodoEmptyScreen from '../Others/TodoEmptyScreen';

function TodoScreen({ navigation }: TodoScreenNavigationProps) {
  const { theme } = useTheme();

  const { isLoading, isError, data, isFetching, refetch } = useGetTodos();
  const mutation = useCreateTodo();

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

  // issue: header hide screen after layout animation run
  // https://github.com/software-mansion/react-native-reanimated/issues/2906
  // temporary fix by add padding
  useApplyHeaderWorkaround(navigation.setOptions);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;
  return (
    <>
      {/* FIXME cannot use FlatList, because exiting animation won't work */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        contentContainerStyle={[styles.sectionLarge, { flex: 1 }]}
      >
        {data.length <= 0 ? (
          <TodoEmptyScreen />
        ) : (
          data.map((props) => <TodoItem key={props.id} {...props} />)
        )}
      </ScrollView>
      <FAB
        placement="right"
        color={theme.colors.primary}
        onPress={() => bottomSheetRef.current?.open()}
        icon={<Icon name="add" type="ionicon" size={28} color={theme.colors.white} />}
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
