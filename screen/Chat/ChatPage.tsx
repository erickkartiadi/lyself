import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { ChatRouteParamList } from '../../types/routes';
import Chat, { ChatProps } from '../../components/Chat';

export const chatData: ChatProps[] = [
  {
    name: 'Dr. Johny',
    text: 'Hello Erick, how can i help you?',
    time: '09:18 AM',
    unread: 2,
    avatarUrl:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Dr. Patrick S.',
    time: 'Yesterday',
    text: 'Sent an image',
    unread: 1,
    avatarUrl:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Meg',
    time: 'Last week',
    text: 'This looks great!',
    unread: 0,
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Kate Marks',
    time: 'April, 01 2022',
    text: '🎙️ Sent an audio',
    unread: 3,
    avatarUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Steve A.',
    time: 'January, 07 2022',
    text: '😂',
    unread: 0,
    avatarUrl:
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Dr. Harry S.',
    time: 'November, 28 2021',
    text: 'Thank you',
    unread: 0,
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Dr. Ming ',
    time: 'August, 30 2021',
    text: 'Sent an receipt',
    unread: 0,
    avatarUrl:
      'https://images.unsplash.com/photo-1580281658626-ee379f3cce93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Violetta K.',
    time: 'July, 05 2021',
    text: '🖼️ Sent an image',
    unread: 0,
    avatarUrl:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Bryan Ollifian',
    time: 'April, 03 2021',
    text: 'Thanks mate',
    unread: 0,
    avatarUrl:
      'https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
];

export type ChatPageProps = NativeStackScreenProps<ChatRouteParamList, 'Chat'>;

function ChatPage() {
  const renderChat = ({ item }: { item: ChatProps }) => (
    <Chat
      avatarUrl={item.avatarUrl}
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
      keyExtractor={(item: ChatProps) => item.name}
    />
  );
}

export default ChatPage;
