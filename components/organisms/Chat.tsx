import { Avatar, Badge, Button, ListItem, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { comingSoonToast } from '../../utils/comingSoonToast';
import { styles } from '../../theme/styles';

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

export interface ChatProps {
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
      containerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Avatar size={62} rounded source={{ uri: avatarUrl }} />
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
            <Text subtitle1 style={{ marginBottom: 0 }}>
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
              subtitle2
              style={{
                color: unread > 0 ? theme.colors.grey1 : theme.colors.grey3,
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