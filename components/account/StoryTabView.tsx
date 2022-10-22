import { TabView } from '@rneui/themed';
import * as React from 'react';
import { FlatList, View } from 'react-native';

import LoadingScreen from '../../screen/Others/LoadingScreen';
import { useGetUserStories } from '../../services/api/stories/stories.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { Story, UserStoryType } from '../../types/types';
import { AuthContext } from '../../utils/context/AuthContext';
import { sortNumber } from '../../utils/sort';
import ActivityIndicator from '../base/ActivityIndicator';
import EmptyState from '../base/EmptyState';
import { VerticalSeparator } from '../layout/ItemSeparator';
import RefreshControl from '../layout/RefreshControl';
import StoryCard from '../story/StoryCard';

const renderStory = ({ item }: { item: Story }) => <StoryCard key={item.id} {...item} />;

function StoryTabView({ type }: { type: UserStoryType }) {
  const { user } = React.useContext(AuthContext);

  const { data, fetchNextPage, isLoading, isRefetching, refetch, isFetchingNextPage } =
    useGetUserStories(user?.uid, type);
  const flattenData = data?.pages
    .flatMap((page) => page)
    .sort((a, b) => sortNumber(a.createdAt.seconds, b.createdAt.seconds, 'DESC'));

  const fetchNextStories = () => fetchNextPage();

  let emptyTitle = "You don't have story yet";
  let emptyText = 'You can always add yours in the story page.';
  if (type === 'liked') {
    emptyTitle = "You don't have any liked story";
    emptyText = 'You can like a story by pressing heart icon on the story';
  }
  if (type === 'saved') {
    emptyTitle = "You don't have any saved story";
    emptyText = 'You can save the story by tapping the bookmark icon on the story';
  }

  return (
    <TabView.Item style={[layout.flex]}>
      <FlatList
        ListEmptyComponent={
          isLoading ? (
            <LoadingScreen />
          ) : (
            <EmptyState title={emptyTitle} subtitle={emptyText} />
          )
        }
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        ItemSeparatorComponent={VerticalSeparator}
        contentContainerStyle={[
          layout.container_gutter,
          layout.flex_grow,
          layout.section_lg,
        ]}
        data={flattenData}
        onEndReached={fetchNextStories}
        onEndReachedThreshold={0.2}
        renderItem={renderStory}
        ListFooterComponent={
          <View style={spacing.mt_xl}>{isFetchingNextPage && <ActivityIndicator />}</View>
        }
      />
    </TabView.Item>
  );
}

export default StoryTabView;
