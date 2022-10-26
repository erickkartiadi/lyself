import { FAB, Icon, useTheme } from '@rneui/themed';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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
import useStyles from '../../utils/hooks/useStyles';
import ErrorScreen from '../Others/ErrorScreen';
import LoadingScreen from '../Others/LoadingScreen';

const renderStory = ({ item }: { item: Story }) => <StoryCard key={item.id} {...item} />;

function StoryScreen({ navigation }: StoryScreenNavigationProps) {
  const { theme } = useTheme();
  const queryClient = useQueryClient();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const styles = useStyles();
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

  const fabTranslateY = useSharedValue(0);
  const categoryTranslateY = useSharedValue(0);
  const fabOpacity = useSharedValue(1);
  const categoryOpacity = useSharedValue(1);
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const duration = 400;

  const animatedCategoryStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(categoryTranslateY.value, {
          duration,
          easing: Easing.inOut(Easing.ease),
        }),
      },
    ],
    opacity: withTiming(categoryOpacity.value, {
      duration,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  const animatedFABStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(fabTranslateY.value, {
          duration,
          easing: Easing.inOut(Easing.ease),
        }),
      },
    ],
    opacity: withTiming(fabOpacity.value, {
      duration,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  // TODO throttle event
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      // scroll up
      if (lastContentOffset.value > event.contentOffset.y && isScrolling.value) {
        fabTranslateY.value = 0;

        categoryTranslateY.value = 0;
        categoryOpacity.value = 1;
        fabOpacity.value = 1;
      }
      // scroll down
      else if (lastContentOffset.value < event.contentOffset.y && isScrolling.value) {
        fabTranslateY.value = 100;
        categoryTranslateY.value = -100;
        categoryOpacity.value = 0;
        fabOpacity.value = 0;
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  });

  if (isError) return <ErrorScreen />;
  return (
    <>
      <Animated.FlatList
        scrollEventThrottle={1000}
        onScroll={scrollHandler}
        contentContainerStyle={[layout.flex_grow, layout.container_gutter]}
        alwaysBounceVertical={false}
        stickyHeaderIndices={[0]}
        overScrollMode="never"
        ListHeaderComponent={
          <Animated.View style={[styles.defaultBackground, animatedCategoryStyle]}>
            <CategoryChips
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
            />
          </Animated.View>
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
      <Animated.View style={animatedFABStyle}>
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
      </Animated.View>
    </>
  );
}

export default StoryScreen;
