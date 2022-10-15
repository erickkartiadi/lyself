import { Divider, Icon, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useFindCategory } from '../../services/api/story/story.hooks';
import useGetUser from '../../services/api/user/users.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Story } from '../../types/types';
import { formatTimeAgo } from '../../utils/formatTime';
import useStyles from '../../utils/hooks/useStyles';
import Avatar from '../base/Avatar';
import Card from '../base/Card';
import Chip from '../base/Chip';

// TODO add skeleton placeholder
function StoryCard({ anonymous, content, createdAt, title, userId, categoryId }: Story) {
  const { theme } = useTheme();
  const styles = useStyles();

  const { data } = useGetUser(userId);
  const { data: categoryData } = useFindCategory(categoryId);

  return (
    <Card>
      <View style={[layout.flex_dir_row, layout.align_center]}>
        <Avatar
          size={SIZING['5xl']}
          containerStyle={[spacing.mr_lg]}
          rounded
          avatarUrl={anonymous ? null : data?.photoURL}
        />
        <View>
          <Text subtitle3>{anonymous ? 'Anonymous' : data?.displayName}</Text>
          <Text caption style={styles.textGrey}>
            {formatTimeAgo(createdAt.toDate())}
          </Text>
        </View>
      </View>

      <View style={spacing.my_xl}>
        <Text numberOfLines={3} h4>
          {title}
        </Text>
        {content !== '' && (
          <Text style={spacing.mt_sm} small numberOfLines={6}>
            {content}
          </Text>
        )}
      </View>
      <View style={layout.flex_dir_row}>
        <Chip size="sm" containerStyle={spacing.mr_md}>
          {categoryData?.labelShort}
        </Chip>
      </View>
      <Divider color={theme.colors.secondary} style={spacing.my_xl} />
      <View style={[layout.flex_dir_row, layout.justify_between]}>
        <TouchableOpacity style={[layout.flex_dir_row, layout.align_center]}>
          <Icon
            color={theme.colors.grey3}
            name="heart-outline"
            type="ionicon"
            containerStyle={spacing.mr_sm}
            size={SIZING['3xl']}
          />
          <Text small style={styles.textGrey}>
            15 likes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[layout.flex_dir_row, layout.align_center]}>
          <Icon
            color={theme.colors.grey3}
            name="chatbox-outline"
            type="ionicon"
            size={SIZING['3xl']}
            containerStyle={spacing.mr_sm}
          />
          <Text small style={styles.textGrey}>
            32 replies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[layout.flex_dir_row, layout.align_center]}>
          <Icon
            color={theme.colors.grey3}
            name="eye-outline"
            type="ionicon"
            size={SIZING['3xl']}
            containerStyle={spacing.mr_sm}
          />
          <Text small style={styles.textGrey}>
            100 views
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

export default StoryCard;
