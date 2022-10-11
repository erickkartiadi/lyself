import { Chip, Divider, Icon, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useGetUser from '../../services/api/user/users.hooks';
import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import { Story } from '../../types/types';
import { formatTimeAgo } from '../../utils/formatTime';
import normalize from '../../utils/normalize';
import Avatar from '../base/Avatar';
import Card from '../base/Card';

function StoryCard({ anonymous, content, createdAt, title, userId }: Story) {
  const { theme } = useTheme();

  const { data } = useGetUser(userId);

  return (
    <Card>
      <View style={[appStyles.flexDirRow, appStyles.alignCenter]}>
        <Avatar
          size={2.75}
          containerStyle={[spacing.mr_lg]}
          rounded
          avatarUrl={data?.photoURL}
        />
        <View>
          <Text subtitle2>{data?.displayName}</Text>
          <Text caption color={theme.colors.grey3}>
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
      <View style={appStyles.flexDirRow}>
        <Chip
          color="secondary"
          titleStyle={{ color: theme.colors.grey3 }}
          radius="xs"
          size="sm"
          containerStyle={spacing.mr_sm}
        >
          mental illness
        </Chip>
        <Chip
          color="secondary"
          titleStyle={{ color: theme.colors.grey3 }}
          radius="xs"
          size="sm"
        >
          motivation
        </Chip>
      </View>
      <Divider color={theme.colors.secondary} style={spacing.my_xl} />
      <View style={[appStyles.flexDirRow, appStyles.justifyBetween]}>
        <TouchableOpacity style={[appStyles.flexDirRow, appStyles.alignCenter]}>
          <Icon
            color={theme.colors.grey3}
            name="heart-outline"
            type="ionicon"
            containerStyle={spacing.mr_sm}
            size={normalize(22, 'height')}
          />
          <Text small color={theme.colors.grey3}>
            15 likes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[appStyles.flexDirRow, appStyles.alignCenter]}>
          <Icon
            color={theme.colors.grey3}
            name="chatbox-outline"
            type="ionicon"
            size={normalize(22, 'height')}
            containerStyle={spacing.mr_sm}
          />
          <Text small color={theme.colors.grey3}>
            32 replies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[appStyles.flexDirRow, appStyles.alignCenter]}>
          <Icon
            color={theme.colors.grey3}
            name="eye-outline"
            type="ionicon"
            size={normalize(22, 'height')}
            containerStyle={spacing.mr_sm}
          />
          <Text small color={theme.colors.grey3}>
            100 views
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

export default StoryCard;
