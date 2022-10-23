import { Icon, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

import { useSaveStory } from '../../services/api/stories/stories.hooks';
import { useFindUser } from '../../services/api/user/users.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Story } from '../../types/types';
import { AuthContext } from '../../utils/context/AuthContext';
import useStyles from '../../utils/hooks/useStyles';

function SaveButton({ id }: Pick<Story, 'id'>) {
  const { theme } = useTheme();
  const styles = useStyles();
  const { user } = React.useContext(AuthContext);
  const { data: currentUserData } = useFindUser(user?.uid);

  const saveStoryMutation = useSaveStory();

  const isSaved = React.useMemo(
    () => currentUserData?.savedStoryIds.some((storyId) => storyId === id),
    [currentUserData]
  );

  const debounceSaveStory = useDebouncedCallback(() => {
    if (!user) return;

    saveStoryMutation.mutate({
      id,
      cancelSave: isSaved ?? false,
      currentUserId: user?.uid,
    });
  }, 250);

  return (
    <TouchableOpacity
      onPress={debounceSaveStory}
      style={[layout.flex_dir_row, layout.align_center]}
    >
      <Icon
        color={isSaved ? theme.colors.warning : theme.colors.grey3}
        name={isSaved ? 'bookmark' : 'bookmark-outline'}
        type="ionicon"
        size={SIZING['2xl']}
        containerStyle={spacing.mr_sm}
      />
      <Text small style={isSaved ? styles.textWarning : styles.textGrey}>
        {isSaved ? 'Saved' : 'Save'}
      </Text>
    </TouchableOpacity>
  );
}

export default SaveButton;
