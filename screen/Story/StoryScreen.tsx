import { FAB, Icon, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { VerticalSeparator } from '../../components/layout/ItemSeparator';
import RefreshControl from '../../components/layout/RefreshControl';
import CategoryChips from '../../components/story/CategoryChips';
import StoryCard from '../../components/story/StoryCard';
import { StoryScreenNavigationProps } from '../../navigation/navigation.types';
import { useGetCategories, useGetStories } from '../../services/api/story/story.hooks';
import layout from '../../styles/layout';
import { SIZING } from '../../theme/theme';
import EmptyScreen from '../Others/EmptyScreen';
import ErrorScreen from '../Others/ErrorScreen';
import LoadingScreen from '../Others/LoadingScreen';

function StoryScreen({ navigation }: StoryScreenNavigationProps) {
  const { theme } = useTheme();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');

  const {
    data,
    isError,
    isRefetching: isStoriesRefetching,
    refetch: refetchStories,
    isLoading: isStoriesLoading,
  } = useGetStories(selectedCategoryId);

  const { isRefetching: isCategoriesRefetching, refetch: refetchCategories } =
    useGetCategories();

  const handleOnRefresh = () => {
    refetchCategories();
    refetchStories();
  };

  const isRefreshing = isStoriesRefetching || isCategoriesRefetching;

  if (isError) return <ErrorScreen />;
  return (
    <>
      <FlatList
        contentContainerStyle={[
          layout.flex_grow,
          layout.container_gutter,
          layout.section_lg,
        ]}
        ListHeaderComponent={
          <CategoryChips
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
          />
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleOnRefresh} />
        }
        ListEmptyComponent={
          isStoriesLoading ? (
            <LoadingScreen />
          ) : (
            <EmptyScreen
              title="This category is empty"
              text='Tap "+" to add your own story'
            />
          )
        }
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
