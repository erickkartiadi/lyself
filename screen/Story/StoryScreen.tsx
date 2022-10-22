import { FAB, Icon, useTheme } from '@rneui/themed';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ActivityIndicator from '../../components/base/ActivityIndicator';
import EmptyState from '../../components/base/EmptyState';
import { VerticalSeparator } from '../../components/layout/ItemSeparator';
import RefreshControl from '../../components/layout/RefreshControl';
import CategoryChips from '../../components/story/CategoryChips';
import StoryCard from '../../components/story/StoryCard';
import { StoryScreenNavigationProps } from '../../navigation/navigation.types';
import { useGetCategories } from '../../services/api/stories/categories/categories.hooks';
import { useGetStories } from '../../services/api/stories/stories.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Story } from '../../types/types';
import ErrorScreen from '../Others/ErrorScreen';
import LoadingScreen from '../Others/LoadingScreen';

const renderStory = ({ item }: { item: Story }) => <StoryCard key={item.id} {...item} />;

function StoryScreen({ navigation }: StoryScreenNavigationProps) {
  const { theme } = useTheme();
  const queryClient = useQueryClient();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');

  const {
    data,
    isError,
    isFetchingNextPage,
    isLoading: isStoriesLoading,
    fetchNextPage: fetchNextStories,
    refetch: refetchStories,
    isRefetching: isStoriesRefetching,
  } = useGetStories(selectedCategoryId);

  const { refetch: refetchCategories } = useGetCategories();

  const handleOnRefresh = () => {
    refetchStories();
    refetchCategories();
    queryClient.invalidateQueries(['upvote']);
  };
  const isRefreshing = isStoriesRefetching;

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
        ListEmptyComponent={
          isStoriesLoading ? (
            <LoadingScreen />
          ) : (
            <EmptyState
              title="This category is empty"
              subtitle='Tap "+" to add your own story'
            />
          )
        }
        refreshControl={
          <RefreshControl onRefresh={handleOnRefresh} refreshing={isRefreshing} />
        }
        ItemSeparatorComponent={VerticalSeparator}
        renderItem={renderStory}
        data={data?.pages.flatMap((page) => page)}
        onEndReached={() => fetchNextStories()}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          <View style={spacing.mt_xl}>{isFetchingNextPage && <ActivityIndicator />}</View>
        }
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
