import { Badge, ListItem, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import { styles } from '../theme/styles';
import { Chat } from '../types/types';
import BaseAvatar from './bases/BaseAvatar';
import { SwipeableLeftButton, SwipeableRightButton } from './SwipeableButton';

function ChatBox({ name, text, time, unread, uri }: Chat) {
  const { theme } = useTheme();

  return (
    <ListItem.Swipeable
      leftContent={SwipeableLeftButton}
      rightContent={SwipeableRightButton}
      key={name}
      containerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <BaseAvatar rounded size={4} source={{ uri }} />
      <ListItem.Content>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            <Text h4 style={{ marginBottom: 0 }}>
              {name}
            </Text>
            <Text caption>{time}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}
          >
            <Text
              style={{
                color: unread > 0 ? theme.colors.grey1 : theme.colors.grey3,
              }}
            >
              {text}
            </Text>
            {unread > 0 && (
              <Badge status="primary" badgeStyle={{ borderWidth: 0 }} value={unread} />
            )}
          </View>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
}

export default ChatBox;
