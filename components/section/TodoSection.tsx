import React from 'react';
import { View } from 'react-native';

import { useGetTodos } from '../../services/api/todos/todos.hooks';
import { styles } from '../../theme/styles';
import { Todo } from '../../types/types';
import SectionTitle from '../layout/SectionTitle';
import TodoItem from '../todo/TodoItem';

function TodoSection() {
  const { isLoading, data } = useGetTodos('Todo', 'reminderTime', 'DESC');

  if (!data || data?.length <= 0 || isLoading) {
    return <View />;
  }

  return (
    <View style={styles.sectionLarge}>
      <SectionTitle title="My Goal" showRightComponent screen="TodoStack" />
      {data?.map((props: Todo) => (
        <TodoItem enableAnimation={false} key={props.id} {...props} />
      ))}
    </View>
  );
}

export default TodoSection;
