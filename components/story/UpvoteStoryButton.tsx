import { Icon, Text, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDebouncedCallback } from 'use-debounce';

import { useFindUpvote, useUpvoteStory } from '../../services/api/stories/stories.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Story } from '../../types/types';
import { AuthContext } from '../../utils/context/AuthContext';
import useStyles from '../../utils/hooks/useStyles';

function UpvoteStoryButton({ id }: Pick<Story, 'id'>) {
  const { theme } = useTheme();
  const styles = useStyles();
  const { user } = useContext(AuthContext);

  const { data: upvoteData } = useFindUpvote(id);
  const upvoteStoryMutation = useUpvoteStory();

  const isLiked = upvoteData?.userIds.some((userId) => userId === user?.uid);

  const debounceUpdateLike = useDebouncedCallback(() => {
    if (!user) return;

    upvoteStoryMutation.mutate({
      id,
      cancelUpvote: isLiked ?? false,
      currentUserId: user?.uid,
    });
  }, 250);

  return (
    <TouchableOpacity
      onPress={debounceUpdateLike}
      style={[layout.flex_dir_row, layout.align_center]}
    >
      <Icon
        color={isLiked ? theme.colors.primary : theme.colors.grey3}
        name={isLiked ? 'heart' : 'heart-outline'}
        type="ionicon"
        containerStyle={spacing.mr_sm}
        size={SIZING['3xl']}
      />
      <Text small style={isLiked ? styles.textPrimary : styles.textGrey}>
        {upvoteData?.count} likes
      </Text>
    </TouchableOpacity>
  );
}

export default UpvoteStoryButton;
