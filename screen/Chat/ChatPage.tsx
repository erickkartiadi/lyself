import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import ViewSeparator from '../../components/ViewSeparator';
import { styles } from '../../theme';
import { comingSoonToast } from '../../utils/comingSoonToast';
import { chatData, psychiatristData } from '../../constant';
import { ChatRouteParamList } from '../../types/routes';
import PsychiatristAvatar, {
  PsychiatristDataProp,
} from '../../components/PsychiatristAvatar';
import Chat from '../../components/Chat';

export type ChatPageProps = NativeStackScreenProps<ChatRouteParamList, 'Chat'>;

function ChatPage() {
  const { theme } = useTheme();

  const renderPsychiatristAvatar = ({
    item,
  }: {
    item: PsychiatristDataProp;
  }) => (
    <PsychiatristAvatar
      name={item.name}
      experience={item.experience}
      uri={item.uri}
    />
  );

  return (
    <ScrollView>
      <View style={styles.containerSection}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: theme.spacing.xl,
            alignItems: 'center',
          }}
        >
          <Text h4>Top-rated psychiatrist</Text>
          <Button
            type="clear"
            title="See all"
            iconPosition="right"
            onPress={comingSoonToast}
            icon={{
              name: 'chevron-forward',
              type: 'ionicon',
              size: 21,
              color: theme.colors.primary,
            }}
            buttonStyle={{
              padding: 0,
              margin: 0,
              paddingHorizontal: 0,
              paddingEnd: 8,
            }}
            radius={99}
          />
        </View>
        <View
          style={[
            styles.noContainerOffset,
            {
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
          ]}
        >
          <FlatList
            horizontal
            ItemSeparatorComponent={ViewSeparator}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
            data={psychiatristData}
            renderItem={renderPsychiatristAvatar}
            keyExtractor={(item: PsychiatristDataProp) => item.name}
          />
        </View>
      </View>

      <View style={styles.containerSection}>
        <Text h4>Active chats</Text>
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
