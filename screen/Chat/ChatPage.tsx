import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from '../../theme';
import { chatData } from '../../constant';
import { ChatRouteParamList } from '../../types/routes';
import Chat from '../../components/Chat';

export type ChatPageProps = NativeStackScreenProps<ChatRouteParamList, 'Chat'>;

function ChatPage() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.noContainerOffset}>
          {chatData.map(({ name, text, unread, time, avatar_url }) => (
            <Chat
              key={name}
              name={name}
              text={text}
              unread={unread}
              time={time}
              avatarUrl={avatar_url}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default ChatPage;
