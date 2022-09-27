import { FAB, Icon, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import BaseBottomSheet from '../../components/bases/BaseBottomSheet';
import BaseChoiceChip from '../../components/bases/BaseChoiceChip';
import RefreshControl from '../../components/placeholder/RefreshControl';
import SectionTitle from '../../components/SectionTitle';
import TodoBottomSheet, { TodoFormData } from '../../components/todo/TodoBottomSheet';
import TodoItem from '../../components/todo/TodoItem';
import { useCreateTodo, useGetTodos } from '../../services/api/todos/todos.hooks';
import { BORDER_RADIUS, styles } from '../../theme/styles';
import { TodoScreenNavigationProps } from '../../types/navigation.types';
import { Todo } from '../../types/types';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';
import useToggle from '../../utils/hooks/useToggle';
import { OrderBy, TodoFilter, TodoSort } from '../../utils/sort';
import ErrorScreen from '../Others/ErrorScreen';
import LoadingScreen from '../Others/LoadingScreen';
import TodoEmptyScreen from '../Others/TodoEmptyScreen';

const sortItems: {
  label: string;
  sort: TodoSort;
  orderBy: OrderBy;
}[] = [
  {
    label: 'High priority',
    sort: 'importanceLevel',
    orderBy: 'DESC',
  },
  {
    label: 'Low priority',
    sort: 'importanceLevel',
    orderBy: 'ASC',
  },

  {
    label: 'Soon',
    sort: 'reminderTime',
    orderBy: 'ASC',
  },
  {
    label: 'Later',
    sort: 'reminderTime',
    orderBy: 'DESC',
  },
];

const filterItems: {
  label: string;
  filter: TodoFilter;
}[] = [
  {
    label: 'Todo',
    filter: 'Todo',
  },
  {
    label: 'All',
    filter: 'All',
  },

  {
    label: 'Completed',
    filter: 'Completed',
  },
];
function TodoScreen({ navigation }: TodoScreenNavigationProps) {
  const { theme } = useTheme();

  const [selectedSort, setSelectedSort] = useState<{
    sort: TodoSort;
    orderBy: OrderBy;
  }>({
    sort: 'importanceLevel',
    orderBy: 'DESC',
  });

  const [selectedFilter, setSelectedFilter] = useState<TodoFilter>('Todo');

  const { isLoading, isError, data, isFetching, refetch } = useGetTodos(
    selectedFilter,
    selectedSort.sort,
    selectedSort.orderBy
  );

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

  const todoBottomSheetRef = useRef<Modalize>(null);
  const filterBottomSheetRef = useRef<Modalize>(null);

  const handleAddTodo = async ({ todo, note }: TodoFormData) => {
    if (todo === '' || todo === null) return;

    mutation.mutate({
      completed: isCompleted,
      importanceLevel: newImportanceLevel,
      note,
      todo,
      reminderTime: newReminderTime,
    });

    todoBottomSheetRef.current?.close();
    setNewImportanceLevel('none');
    setNewReminderTime(null);
    reset();
  };

  // issue: header hide screen after layout animation run
  // https://github.com/software-mansion/react-native-reanimated/issues/2906
  // temporary fix by add padding
  useApplyHeaderWorkaround(navigation.setOptions);

  // FIXME cannot update a component (`NativeStackNavigator`)
  navigation.setOptions({
    headerRight: React.useCallback(
      () => (
        <View>
          <Icon
            name="filter"
            type="ionicon"
            onPress={() => filterBottomSheetRef.current?.open()}
            iconStyle={{
              color:
                !(
                  selectedSort.sort === 'importanceLevel' &&
                  selectedSort.orderBy === 'DESC'
                ) || selectedFilter !== 'Todo'
                  ? theme.colors.primary
                  : theme.colors.black,
            }}
            containerStyle={{
              borderRadius: BORDER_RADIUS.rounded,
              aspectRatio: 1,
            }}
          />
        </View>
      ),
      [selectedSort, selectedFilter]
    ),
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectedFilter,
    });
  }, [selectedFilter]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;
  return (
    <>
      {/* FIXME cannot use FlatList, because exiting animation won't work */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        contentContainerStyle={[
          styles.sectionLarge,
          styles.containerGutter,
          { flexGrow: 1 },
        ]}
      >
        {data.length <= 0 ? (
          <TodoEmptyScreen />
        ) : (
          <>
            {data.map((props) => (
              <TodoItem key={props.id} {...props} />
            ))}
          </>
        )}
      </ScrollView>
      <FAB
        placement="right"
        color={theme.colors.primary}
        onPress={() => todoBottomSheetRef.current?.open()}
        icon={<Icon name="add" type="ionicon" size={28} color={theme.colors.white} />}
      />
      <TodoBottomSheet
        isSaveLoading={mutation.isLoading}
        onSubmit={handleSubmit(handleAddTodo)}
        bottomSheetRef={todoBottomSheetRef}
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
      <BaseBottomSheet
        bottomSheetRef={filterBottomSheetRef}
        modalStyle={[styles.containerGutter, styles.sectionLarge]}
      >
        <Text h2>Filter</Text>
        <View style={[styles.sectionLarge]}>
          <SectionTitle title="Sort" />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: theme.spacing.sm,
            }}
          >
            {sortItems.map(({ label, sort, orderBy }) => (
              <BaseChoiceChip
                key={label}
                containerStyle={{
                  marginRight: theme.spacing.md,
                  marginBottom: theme.spacing.md,
                }}
                onPress={() => setSelectedSort({ orderBy, sort })}
                isSelected={
                  selectedSort.sort === sort && selectedSort.orderBy === orderBy
                }
              >
                {label}
              </BaseChoiceChip>
            ))}
          </View>
        </View>
        <View style={[styles.sectionLarge]}>
          <SectionTitle title="Filter" />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: theme.spacing.sm,
            }}
          >
            {filterItems.map(({ label, filter }) => (
              <BaseChoiceChip
                key={label}
                containerStyle={{
                  marginRight: theme.spacing.md,
                  marginBottom: theme.spacing.md,
                }}
                onPress={() => setSelectedFilter(filter)}
                isSelected={selectedFilter === filter}
              >
                {label}
              </BaseChoiceChip>
            ))}
          </View>
        </View>
      </BaseBottomSheet>
    </>
  );
}

export default TodoScreen;
