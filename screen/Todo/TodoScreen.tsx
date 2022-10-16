import { FAB, Icon, Text, useTheme } from '@rneui/themed';
import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import BottomSheet from '../../components/base/BottomSheet';
import Chip from '../../components/base/Chip';
import RefreshControl from '../../components/layout/RefreshControl';
import TodoBottomSheet from '../../components/todo/TodoBottomSheet';
import TodoItem from '../../components/todo/TodoItem';
import { TodoScreenNavigationProps } from '../../navigation/navigation.types';
import { CreateTodoDto } from '../../services/api/todos/todos.api';
import { useCreateTodo, useGetTodos } from '../../services/api/todos/todos.hooks';
import border from '../../styles/border';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import IMPORTANCE_COLORS from '../../utils/constant/constant';
import { OrderBy, TodoFilter, TodoSort } from '../../utils/sort';
import { somethingWentWrongToast } from '../../utils/toast';
import ErrorScreen from '../Others/ErrorScreen';
import LoadingScreen from '../Others/LoadingScreen';
import TodoEmptyScreen from './TodoEmptyScreen';

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
  const todoBottomSheetRef = useRef<Modalize>(null);
  const filterBottomSheetRef = useRef<Modalize>(null);

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

  const { control, handleSubmit, reset, watch } = useForm<CreateTodoDto>({
    defaultValues: {
      todo: '',
      note: '',
      completed: false,
      reminderTime: null,
      importanceLevel: 'none',
    },
  });
  const watchImportance = watch('importanceLevel');
  const watchCompleted = watch('completed');
  const watchTodo = watch('todo');

  const isTodoExist = watchTodo !== '';
  const importanceColor = watchCompleted
    ? theme.colors.success
    : (theme.colors[IMPORTANCE_COLORS[watchImportance]] as string);

  const handleAddTodo = async ({
    todo,
    note,
    completed,
    reminderTime,
    importanceLevel,
  }: CreateTodoDto) => {
    mutation.mutate(
      {
        completed,
        importanceLevel,
        note,
        todo,
        reminderTime: reminderTime
          ? new Timestamp(reminderTime?.seconds, reminderTime?.nanoseconds)
          : null,
      },
      {
        onSettled: () => {
          todoBottomSheetRef.current?.close();
          reset();
        },
        onError: () => {
          somethingWentWrongToast();
        },
      }
    );
  };

  const filterButton = React.useCallback(
    () => (
      <Icon
        name="filter"
        type="ionicon"
        onPress={() => filterBottomSheetRef.current?.open()}
        iconStyle={{
          color:
            !(
              selectedSort.sort === 'importanceLevel' && selectedSort.orderBy === 'DESC'
            ) || selectedFilter !== 'Todo'
              ? theme.colors.primary
              : theme.colors.black,
        }}
        containerStyle={[border.rounded, layout.ratio_square]}
      />
    ),
    [selectedSort, selectedFilter]
  );

  // useApplyHeaderWorkaround(navigation.setOptions);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectedFilter,
      headerRight: filterButton,
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
          layout.section_lg,
          layout.container_gutter,
          layout.flex_grow,
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
        icon={
          <Icon
            name="add"
            type="ionicon"
            size={SIZING['4xl']}
            color={theme.colors.white}
          />
        }
      />
      <TodoBottomSheet
        buttonTitle="SAVE"
        isButtonLoading={mutation.isLoading}
        onSubmit={handleSubmit(handleAddTodo)}
        bottomSheetRef={todoBottomSheetRef}
        control={control}
        isButtonVisible={isTodoExist}
        importanceColor={importanceColor}
        isEditing={false}
      />
      <BottomSheet
        showHeader={false}
        adjustToContentHeight
        bottomSheetRef={filterBottomSheetRef}
        headerTitle="Filter"
        modalStyle={[layout.container_gutter]}
      >
        <View style={[layout.section_lg]}>
          <Text subtitle>Sort</Text>
          <View
            style={[layout.flex, layout.flex_dir_row, spacing.mt_lg, layout.flex_wrap]}
          >
            {sortItems.map(({ label, sort, orderBy }) => (
              <Chip
                chipColor="primary"
                size="lg"
                radius="md"
                key={label}
                containerStyle={[spacing.mr_md, spacing.mb_md]}
                onPress={() => setSelectedSort({ orderBy, sort })}
                isActive={selectedSort.sort === sort && selectedSort.orderBy === orderBy}
              >
                {label}
              </Chip>
            ))}
          </View>
        </View>
        <View style={[layout.section_lg]}>
          <Text subtitle>Filter</Text>
          <View
            style={[layout.flex, layout.flex_dir_row, spacing.mt_md, layout.flex_wrap]}
          >
            {filterItems.map(({ label, filter }) => (
              <Chip
                chipColor="primary"
                key={label}
                containerStyle={[spacing.mr_md, spacing.mr_md]}
                size="lg"
                onPress={() => setSelectedFilter(filter)}
                isActive={selectedFilter === filter}
              >
                {label}
              </Chip>
            ))}
          </View>
        </View>
      </BottomSheet>
    </>
  );
}

export default TodoScreen;
