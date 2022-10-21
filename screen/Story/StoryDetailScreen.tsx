import { FAB, Icon, useTheme } from '@rneui/themed';
import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import disableIllustration from '../../assets/images/disable.png';
import ActivityIndicator from '../../components/base/ActivityIndicator';
import EmptyState from '../../components/base/EmptyState';
import {
  VerticalSeparator,
  VerticalSeparatorSmall,
} from '../../components/layout/ItemSeparator';
import RefreshControl from '../../components/layout/RefreshControl';
import SectionTitle from '../../components/layout/SectionTitle';
import ReplyBottomSheet from '../../components/story/ReplyBottomSheet';
import ReplyCard, { ReplyList } from '../../components/story/ReplyCard';
import StoryCard from '../../components/story/StoryCard';
import { StoryDetailScreenNavigationProps } from '../../navigation/navigation.types';
import { useGetReplies } from '../../services/api/stories/replies/replies.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Reply } from '../../types/types';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';

function StoryDetailScreen({
  navigation,
  route: { params },
}: StoryDetailScreenNavigationProps) {
  useApplyHeaderWorkaround(navigation.setOptions);
  const { id: storyId, isCommentDisabled, creatorId, isAnonymous } = params;

  const { theme } = useTheme();

  const replyBottomSheetRef = React.useRef<Modalize>(null);

  const showReplyBottomSheet = () => {
    replyBottomSheetRef.current?.open();
  };

  const { data: repliesData, isRefetching, refetch, isLoading } = useGetReplies(storyId);

  const renderReplies = ({ item }: { item: Reply }) => (
    <React.Fragment key={item.id}>
      <ReplyCard isStoryAnonymous={isAnonymous} storyCreatorId={creatorId} {...item} />
      <VerticalSeparatorSmall />
      <ReplyList isStoryAnonymous={isAnonymous} storyCreatorId={creatorId} {...item} />
    </React.Fragment>
  );

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={spacing.mb_md}>
              <StoryCard isOnDetailScreen {...params} />
            </View>

            {!isCommentDisabled && !isLoading && (
              <SectionTitle title="Replies" containerStyle={spacing.mt_lg} />
            )}
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={[layout.section_lg, spacing.mt_2xl]}>
              <EmptyState
                source={isCommentDisabled ? disableIllustration : undefined}
                title={isCommentDisabled ? 'Comment is disabled' : 'No reply here'}
                text={
                  isCommentDisabled
                    ? 'You cannot reply on this story'
                    : 'Be the first to reply on this story.'
                }
              />
            </View>
          )
        }
        ItemSeparatorComponent={VerticalSeparator}
        refreshControl={<RefreshControl onRefresh={refetch} refreshing={isRefetching} />}
        data={isCommentDisabled ? [] : repliesData}
        renderItem={renderReplies}
        contentContainerStyle={[layout.container_gutter, layout.section_lg]}
      />

      {!isCommentDisabled && (
        <>
          <ReplyBottomSheet bottomSheetRef={replyBottomSheetRef} repliedId={storyId} />
          <FAB
            placement="right"
            onPress={showReplyBottomSheet}
            color={theme.colors.primary}
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
      )}
    </>
  );
}

export default StoryDetailScreen;
