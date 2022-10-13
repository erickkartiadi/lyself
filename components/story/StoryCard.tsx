import { Chip, Divider, Icon, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useGetUser from '../../services/api/user/users.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Story } from '../../types/types';
import { formatTimeAgo } from '../../utils/formatTime';
import useStyles from '../../utils/hooks/useStyles';
import Avatar from '../base/Avatar';
import Card from '../base/Card';

// TODO add skeleton placeholder
function StoryCard({ anonymous, content, createdAt, title, userId }: Story) {
  const { theme } = useTheme();
  const styles = useStyles();

  const { data } = useGetUser(userId);

  return (
    <Card>
      <View style={[layout.flexDirRow, layout.alignCenter]}>
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
      <View style={layout.flexDirRow}>
        <Chip
          color="secondary"
          titleStyle={styles.textGrey}
          radius="xs"
          size="sm"
          containerStyle={spacing.mr_sm}
        >
          mental illness
        </Chip>
        <Chip color="secondary" titleStyle={styles.textGrey} radius="xs" size="sm">
          motivation
        </Chip>
      </View>
      <Divider color={theme.colors.secondary} style={spacing.my_xl} />
      <View style={[layout.flexDirRow, layout.justifyBetween]}>
        <TouchableOpacity style={[layout.flexDirRow, layout.alignCenter]}>
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
        <TouchableOpacity style={[layout.flexDirRow, layout.alignCenter]}>
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
        <TouchableOpacity style={[layout.flexDirRow, layout.alignCenter]}>
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
