import { Chip, Divider, Icon, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import normalize from '../../utils/normalize';
import Avatar from '../base/Avatar';
import Card from '../base/Card';

function StoryCard() {
  const { theme } = useTheme();

  return (
    <Card>
      <View style={[appStyles.flexDirRow, appStyles.alignCenter]}>
        <Avatar
          size={2.75}
          containerStyle={[spacing.mr_lg]}
          rounded
          source={{ uri: 'https://i.pravatar.cc/150' }}
        />
        <View>
          <Text subtitle2>Tessa Adam</Text>
          <Text caption color={theme.colors.grey3}>
            1h ago
          </Text>
        </View>
      </View>

      <View style={spacing.my_xl}>
        <Text numberOfLines={3} h4>
          Mental illness can be comfortable
        </Text>
        <Text style={spacing.mt_sm} small numberOfLines={6}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut nam incidunt
          deleniti veniam labore? Cupiditate, ab repudiandae aut itaque deleniti rem quia
          voluptatum unde quam quibusdam? Ad ex voluptates quisquam quod? Aliquam illo ex
          odio quisquam rerum culpa, nulla quasi voluptas! Et atque quas in rem qui facere
          commodi adipisci!
        </Text>
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
