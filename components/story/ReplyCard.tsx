import { Icon, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

import useGetUser from '../../services/api/user/users.hooks';
import layout from '../../styles/layout';
import { SIZING } from '../../theme/theme';
import { Reply, Story } from '../../types/types';
import { AuthContext } from '../../utils/context/AuthContext';
import { formatTimeAgo } from '../../utils/formatTime';
import useStyles from '../../utils/hooks/useStyles';
import Card from '../base/Card';
import UpvoteButton from './UpvoteButton';

interface ReplyCardProps extends Reply {
  storyCreatorId: Story['creatorId'];
  isStoryAnonymous: Story['isAnonymous'];
}

function ReplyCard({
  id,
  createdAt,
  reply,
  userId,
  storyCreatorId,
  isStoryAnonymous,
}: ReplyCardProps) {
  const styles = useStyles();
  const { user } = React.useContext(AuthContext);
  const { theme } = useTheme();

  const { data: replierData } = useGetUser(userId);

  const isCurrentUserReply = userId === user?.uid;
  const isCreatorReply = storyCreatorId === userId;

  let textStyle = !isStoryAnonymous && isCreatorReply ? styles.textBlue : styles.textGrey;
  textStyle = isCurrentUserReply ? styles.textPrimary : textStyle;

  let displayName = !isStoryAnonymous && isCreatorReply ? 'OP' : replierData?.displayName;
  displayName = isCurrentUserReply ? 'You' : displayName;

  return (
    <Card>
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
  );
}

export default ReplyCard;
