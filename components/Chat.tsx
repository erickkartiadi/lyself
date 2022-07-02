import { Avatar, Badge, Button, ListItem, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { styles } from '../theme';
import { comingSoonToast } from '../utils/comingSoonToast';

function LeftSwipeButton() {
  return (
    <Button
      fullWidth
      onPress={comingSoonToast}
      color="secondary"
      title="Archive"
      radius={0}
      iconPosition="top"
      containerStyle={{ marginHorizontal: 0 }}
      icon={{ name: 'archive', color: 'white', type: 'ionicon' }}
      buttonStyle={{ minHeight: '100%' }}
    />
  );
}
function RightSwipeButton() {
  return (
    <Button
      fullWidth
      onPress={comingSoonToast}
      color="primary"
      title="Delete"
      radius={0}
      iconPosition="top"
      containerStyle={{ marginHorizontal: 0 }}
      icon={{ name: 'trash-bin', color: 'white', type: 'ionicon' }}
      buttonStyle={{ minHeight: '100%' }}
    />
  );
}

interface ChatProps {
  name: string;
  text: string;
  time: string;
  unread: number;
  avatarUrl: string;
}

function Chat({ name, text, time, unread, avatarUrl }: ChatProps) {
  const { theme } = useTheme();

  return (
    <ListItem.Swipeable
      leftContent={LeftSwipeButton}
      rightContent={RightSwipeButton}
      key={name}
      containerStyle={{
        paddingHorizontal: styles.containerSection.paddingHorizontal,
        backgroundColor: theme.colors.background,
      }}
    >
      <Avatar size={68} rounded source={{ uri: avatarUrl }} />
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
              marginBottom: theme.spacing.sm * 0.5,
            }}
          >
            <Text h3>{name}</Text>
            <Text sm>{time}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}
          >
            <Text
              sm
              style={{
                color: unread > 0 ? theme.colors.black : theme.colors.grey2,
              }}
            >
              {text}
            </Text>
            {unread > 0 && (
              <Badge
                status="primary"
                badgeStyle={{ borderWidth: 0 }}
                value={unread}
              />
            )}
          </View>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
}

export default Chat;
