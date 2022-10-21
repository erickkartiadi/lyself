import { Icon, ListItem, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { useGetReplies } from '../../services/api/stories/replies/replies.hooks';
import useGetUser from '../../services/api/user/users.hooks';
import border from '../../styles/border';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Reply, Story } from '../../types/types';
import { AuthContext } from '../../utils/context/AuthContext';
import { formatTimeAgo } from '../../utils/formatTime';
import useStyles from '../../utils/hooks/useStyles';
import ActivityIndicator from '../base/ActivityIndicator';
import Card from '../base/Card';
import { VerticalSeparatorSmall } from '../layout/ItemSeparator';
import ReplyBottomSheet from './ReplyBottomSheet';
import ReplySwipeableLeft from './ReplySwipeableLeft';
import UpvoteButton from './UpvoteButton';

interface ReplyCardProps extends Reply {
  storyCreatorId: Story['creatorId'];
  isStoryAnonymous: Story['isAnonymous'];
}

function ReplyCard({
  createdAt,
  id,
  isStoryAnonymous,
  reply,
  storyCreatorId,
  userId,
}: ReplyCardProps) {
  const styles = useStyles();
  const { user } = React.useContext(AuthContext);
  const { theme } = useTheme();
  const replyBottomSheetRef = React.useRef<Modalize>(null);
  const { data: replierData } = useGetUser(userId);

  const isCurrentUserReply = userId === user?.uid;
  const isCreatorReply = storyCreatorId === userId;

  let textStyle = !isStoryAnonymous && isCreatorReply ? styles.textBlue : styles.textGrey;
  textStyle = isCurrentUserReply ? styles.textPrimary : textStyle;

  let displayName = !isStoryAnonymous && isCreatorReply ? 'OP' : replierData?.displayName;
  displayName = isCurrentUserReply ? 'You' : displayName;

  const showReplyBottomSheet = (direction: 'right' | 'left') => {
    if (direction === 'right') {
      setTimeout(() => {
        replyBottomSheetRef.current?.open();
      }, 500);
    }
  };

  return (
    <>
      <ListItem.Swipeable
        rightContent={<ReplySwipeableLeft />}
        onSwipeBegin={showReplyBottomSheet}
        rightWidth={SIZING['8xl']}
        containerStyle={[spacing.p_0, border.radius_md]}
        rightStyle={[spacing.pl_md, layout.justify_center]}
      >
        <Card containerStyle={[layout.flex]}>
          <View style={[layout.flex_dir_row, layout.justify_between]}>
            <View>
              <View style={[layout.flex, layout.flex_dir_row, layout.align_center]}>
                <Text caption style={textStyle}>
                  {displayName}
                </Text>
                <Icon
                  type="entypo"
                  size={SIZING.xl}
                  name="dot-single"
                  color={theme.colors.grey3}
                />
                <Text caption style={styles.textGrey}>
                  {formatTimeAgo(createdAt.toDate())}
                </Text>
              </View>
              <Text small>{reply}</Text>
            </View>
            <UpvoteButton type="reply" buttonStyle="column" id={id} showText={false} />
          </View>
        </Card>
      </ListItem.Swipeable>
      <ReplyBottomSheet
        headerTitle={`Reply to ${replierData?.displayName}`}
        bottomSheetRef={replyBottomSheetRef}
        repliedId={id}
      />
    </>
  );
}

export function ReplyList({
  id,
  isStoryAnonymous,
  storyCreatorId,
}: Pick<ReplyCardProps, 'isStoryAnonymous' | 'storyCreatorId' | 'id'>) {
  const { data: repliesData, isLoading } = useGetReplies(id);

  const renderReplies = ({ item }: { item: Reply }) => (
    <View key={item.id} style={[spacing.pl_xl]}>
      <ReplyCard
        isStoryAnonymous={isStoryAnonymous}
        storyCreatorId={storyCreatorId}
        {...item}
      />
      <VerticalSeparatorSmall />
      <ReplyList
        id={item.id}
        isStoryAnonymous={isStoryAnonymous}
        storyCreatorId={storyCreatorId}
      />
    </View>
  );

  return (
    <FlatList
      data={repliesData}
      ListEmptyComponent={isLoading ? <ActivityIndicator /> : undefined}
      renderItem={renderReplies}
    />
  );
}

export default React.memo(ReplyCard);
