import { Icon, Text, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

import { UpvoteStoryDto } from '../../services/api/stories/upvotes/upvotes.api';
import {
  useFindUpvote,
  useUpvote,
} from '../../services/api/stories/upvotes/upvotes.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { AuthContext } from '../../utils/context/AuthContext';
import useStyles from '../../utils/hooks/useStyles';

interface UpvoteStoryButtonProps extends Pick<UpvoteStoryDto, 'id' | 'type'> {
  buttonStyle?: 'column' | 'row';
  showText?: boolean;
  iconSize?: number;
}

function UpvoteButton({
  id,
  iconSize,
  showText,
  buttonStyle,
  type,
}: UpvoteStoryButtonProps) {
  const { theme } = useTheme();
  const styles = useStyles();
  const { user } = useContext(AuthContext);

  const { data: upvoteData } = useFindUpvote(id);
  const upvoteMutation = useUpvote();

  const isLiked = upvoteData?.userIds.some((userId) => userId === user?.uid);

  const debounceUpdateLike = useDebouncedCallback(() => {
    if (!user) return;

    upvoteMutation.mutate({
      id,
      cancelUpvote: isLiked ?? false,
      currentUserId: user?.uid,
      type,
    });
  }, 250);

  return (
    <TouchableOpacity
      disabled={upvoteMutation.isLoading}
      onPress={debounceUpdateLike}
      style={[
        buttonStyle === 'row' ? layout.flex_dir_row : layout.flex_dir_col,
        layout.align_center,
      ]}
    >
      <Icon
        color={isLiked ? theme.colors.primary : theme.colors.grey3}
        name={isLiked ? 'heart' : 'heart-outline'}
        type="ionicon"
        containerStyle={buttonStyle === 'row' && spacing.mr_sm}
        size={iconSize}
      />
      <Text small style={isLiked ? styles.textPrimary : styles.textGrey}>
        {upvoteData?.count}
        {showText && ' likes'}
      </Text>
    </TouchableOpacity>
  );
}

UpvoteButton.defaultProps = {
  buttonStyle: 'row',
  showText: true,
  iconSize: SIZING['3xl'],
};

export default UpvoteButton;
