import { FAB, Icon, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ActivityIndicator from '../../components/base/ActivityIndicator';
import { VerticalSeparator } from '../../components/layout/ItemSeparator';
import CategoryChips from '../../components/story/CategoryChips';
import StoryCard from '../../components/story/StoryCard';
import { StoryScreenNavigationProps } from '../../navigation/navigation.types';
import { useGetStories } from '../../services/api/stories/stories.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
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
    isFetchingNextPage,
    isLoading: isStoriesLoading,
    fetchNextPage,
  } = useGetStories(selectedCategoryId);

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
            <EmptyScreen
              title="This category is empty"
              text='Tap "+" to add your own story'
            />
          )
        }
        ItemSeparatorComponent={VerticalSeparator}
        renderItem={({ item }) => <StoryCard {...item} />}
        data={data?.pages.flatMap((page) => page)}
        onEndReached={() => fetchNextPage()}
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
