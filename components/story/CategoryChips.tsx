import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { useGetCategories } from '../../services/api/stories/categories/categories.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { text } from '../../styles/typhography';
import { Category } from '../../types/types';
import Chip from '../base/Chip';
import { HorizontalSeparatorSmall } from '../layout/ItemSeparator';

interface CategoryChipsProps {
  selectedCategoryId: string;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
}

function CategoryChips({
  setSelectedCategoryId,
  selectedCategoryId,
}: CategoryChipsProps) {
  const { data, fetchNextPage } = useGetCategories();
  const flattenData = data?.pages.flatMap((page) => page);

  const renderCategoryChips = ({ item }: { item: Category }) => (
    <Chip
      key={item.id}
      chipColor="primary"
      isActive={item.id === selectedCategoryId}
      onPress={() => setSelectedCategoryId(item.id)}
      titleStyle={item.name !== item.nameShort ? text.uppercase : text.capitalize}
    >
      {item.nameShort}
    </Chip>
  );

  return (
    <FlatList
      horizontal
      overScrollMode="never"
      style={[layout.no_container_gutter, spacing.mb_xl]}
      contentContainerStyle={layout.container_gutter}
      showsHorizontalScrollIndicator={false}
      data={flattenData}
      ItemSeparatorComponent={HorizontalSeparatorSmall}
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
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={0.2}
      renderItem={renderCategoryChips}
    />
  );
}

export default CategoryChips;
