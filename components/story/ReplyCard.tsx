import { Icon, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { useGetReplies } from '../../services/api/stories/replies/replies.hooks';
import { useFindUser } from '../../services/api/user/users.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Reply, Story } from '../../types/types';
import { AuthContext } from '../../utils/context/AuthContext';
import { formatTimeAgo } from '../../utils/formatTime';
import useStyles from '../../utils/hooks/useStyles';
import useToggle from '../../utils/hooks/useToggle';
import AnimatedPressable from '../base/AnimatedPressable';
import Avatar from '../base/Avatar';
import Card from '../base/Card';
import { HorizontalSeparator, VerticalSeparatorSmall } from '../layout/ItemSeparator';
import ReplyBottomSheet from './ReplyBottomSheet';
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
  const { data: replierData } = useFindUser(userId);

  const isCurrentUserReply = userId === user?.uid;
  const isCreatorReply = storyCreatorId === userId;

  let textStyle = !isStoryAnonymous && isCreatorReply ? styles.textBlue : styles.textGrey;
  textStyle = isCurrentUserReply ? styles.textPrimary : textStyle;

  let displayName = !isStoryAnonymous && isCreatorReply ? 'OP' : replierData?.displayName;
  displayName = isCurrentUserReply ? 'You' : displayName;

  const showReplyBottomSheet = () => {
    replyBottomSheetRef.current?.open();
  };

  const [isReplyActionVisible, toggleIsReplyActionVisible] = useToggle(false);

  return (
    <>
      <AnimatedPressable onPress={() => toggleIsReplyActionVisible()}>
        <Card containerStyle={[layout.flex]}>
          <View style={[layout.flex_dir_row, layout.justify_between]}>
            <View style={[layout.flex, layout.flex_dir_row, layout.align_center]}>
              <Avatar
                size={SIZING.xl}
                avatarUrl={replierData?.photoURL}
                containerStyle={spacing.mr_xs}
              />
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
          </View>
          <Text style={spacing.mt_sm} small>
            {reply}
          </Text>
          <View
            style={[
              layout.flex_dir_row,
              layout.align_center,
              !isReplyActionVisible ? layout.display_none : layout.flex,
              spacing.mt_md,
            ]}
          >
            <UpvoteButton
              iconSize={SIZING['2xl']}
              type="reply"
              buttonStyle="row"
              id={id}
              showText={false}
            />
            <HorizontalSeparator />
            <TouchableOpacity
              onPress={showReplyBottomSheet}
              style={[layout.flex_dir_row, layout.align_center]}
            >
              <Icon
                color={theme.colors.grey3}
                name="arrow-undo-outline"
                type="ionicon"
                size={SIZING['2xl']}
                containerStyle={spacing.mr_sm}
              />
              <Text small style={styles.textGrey}>
                Replies
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </AnimatedPressable>
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
  const { data: repliesData } = useGetReplies(id);

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

  return <FlatList data={repliesData} renderItem={renderReplies} />;
}

export default React.memo(ReplyCard);
