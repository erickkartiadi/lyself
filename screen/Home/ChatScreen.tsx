import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import ChatBox from '../../components/ChatBox';
import { Chat } from '../../types/types';
import { chatData } from '../../utils/constant/seed';

function ChatScreen() {
  const renderChat = ({ item }: { item: Chat }) => (
    <ChatBox
      uri={item.uri}
      name={item.name}
      text={item.text}
      time={item.time}
      unread={item.unread}
    />
  );

  return (
    <FlatList
      data={chatData}
      renderItem={renderChat}
      keyExtractor={(item: Chat) => item.name}
    />
  );
}

export default ChatScreen;
