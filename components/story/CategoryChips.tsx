import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useGetCategories } from '../../services/api/stories/stories.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { text } from '../../styles/typhography';
import useStyles from '../../utils/hooks/useStyles';
import Chip from '../base/Chip';

interface CategoryChipsProps {
  selectedCategoryId: string;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
}

function CategoryChips({
  setSelectedCategoryId,
  selectedCategoryId,
}: CategoryChipsProps) {
  const styles = useStyles();

  const { data } = useGetCategories();

  return (
    <View style={[styles.defaultBackground, spacing.mb_xl, layout.flex_dir_row]}>
      <FlatList
        horizontal
        overScrollMode="never"
        style={layout.no_container_gutter}
        contentContainerStyle={layout.container_gutter}
        showsHorizontalScrollIndicator={false}
        data={data?.pages.flatMap((page) => page)}
        ListHeaderComponent={
          <Chip
            chipColor="primary"
            isActive={selectedCategoryId === 'all'}
            onPress={() => setSelectedCategoryId('all')}
            containerStyle={spacing.mr_md}
          >
            All
          </Chip>
        }
        renderItem={({ item }) => (
          <Chip
            chipColor="primary"
            isActive={item.id === selectedCategoryId}
            onPress={() => setSelectedCategoryId(item.id)}
            containerStyle={spacing.mr_md}
            titleStyle={item.name !== item.nameShort ? text.uppercase : text.capitalize}
          >
            {item.nameShort}
          </Chip>
        )}
      />
    </View>
  );
}

export default CategoryChips;
