import React from 'react';
import { View } from 'react-native';

import { useGetTodos } from '../../services/api/todos/todos.hooks';
import layout from '../../styles/layout';
import { Todo } from '../../types/types';
import SectionTitle from '../layout/SectionTitle';
import TodoItem from '../todo/TodoItem';

// FIXME fix list won't update
function TodoSection() {
  const { isLoading, data } = useGetTodos('Todo', 'reminderTime', 'DESC');

  if (!data || data?.length <= 0 || isLoading) {
    return <View />;
  }

  return (
    <View style={layout.sectionLarge}>
      <SectionTitle title="My Goal" showRightComponent screen="TodoStack" />
      {data?.map((props: Todo) => (
        <TodoItem enableAnimation={false} key={props.id} {...props} />
      ))}
    </View>
  );
}

export default TodoSection;
