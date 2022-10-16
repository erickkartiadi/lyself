import { FAB, Icon, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Chip from '../../components/base/Chip';
import { VerticalSeparator } from '../../components/layout/ItemSeparator';
import RefreshControl from '../../components/layout/RefreshControl';
import StoryCard from '../../components/story/StoryCard';
import { StoryScreenNavigationProps } from '../../navigation/navigation.types';
import { useGetCategories, useGetStories } from '../../services/api/story/story.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import useStyles from '../../utils/hooks/useStyles';

function StoryScreen({ navigation }: StoryScreenNavigationProps) {
  const { theme } = useTheme();
  const styles = useStyles();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');

  const {
    data,
    isRefetching: isStoriesRefetching,
    refetch: refetchStories,
  } = useGetStories(selectedCategoryId);

  const {
    data: categoriesData,
    isRefetching: isCategoriesRefetching,
    refetch: refetchCategories,
  } = useGetCategories();

  const handleOnRefresh = () => {
    refetchCategories();
    refetchStories();
  };

  const isRefreshing = isStoriesRefetching || isCategoriesRefetching;

  const StoryChipFilters = (
    <View style={[styles.defaultBackground, spacing.mb_xl, layout.flex_dir_row]}>
      <FlatList
        horizontal
        overScrollMode="never"
        style={layout.no_container_gutter}
        contentContainerStyle={layout.container_gutter}
        showsHorizontalScrollIndicator={false}
        data={categoriesData}
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
          >
            {item.nameShort}
          </Chip>
        )}
      />
    </View>
  );

  return (
    <>
      <FlatList
        contentContainerStyle={[
          layout.flex_grow,
          layout.container_gutter,
          layout.section_lg,
        ]}
        ListHeaderComponent={StoryChipFilters}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleOnRefresh} />
        }
        // TODO add list empty component
        ItemSeparatorComponent={VerticalSeparator}
        renderItem={({ item }) => <StoryCard {...item} />}
        data={data}
      />
      <FAB
        placement="right"
        color={theme.colors.primary}
        onPress={() => navigation.navigate('StoryStack', { screen: 'AddStory' })}
        icon={
          <Icon
            name="add"
            type="ionicon"
            size={SIZING['4xl']}
            color={theme.colors.white}
          />
        }
      />
    </>
  );
}

export default StoryScreen;
