import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import ViewSeparator from '../../components/ViewSeparator';
import { styles } from '../../theme';
import { comingSoonToast } from '../../utils/comingSoonToast';
import { psychiatristData } from '../../constant';
import { ChatRouteParamList } from '../../routes/types';
import PsychiatristAvatar, {
  PsychiatristDataProp,
} from '../../components/PsychiatristAvatar';

const renderPsychiatristAvatar = ({ item }: { item: PsychiatristDataProp }) => (
  <PsychiatristAvatar
    name={item.name}
    experience={item.experience}
    uri={item.uri}
  />
);

export type ChatPageProps = NativeStackScreenProps<ChatRouteParamList, 'Chat'>;

function ChatPage({ navigation }: ChatPageProps) {
  const { theme } = useTheme();

  return (
    <ScrollView>
      <View style={styles.containerSection}>
        <View>
          <Text style={{ fontSize: 24, fontFamily: 'Inter-Bold' }}>
            Find trustworthy
          </Text>
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: 24,
              fontFamily: 'Inter-Bold',
            }}
          >
            Psychiatrist
          </Text>
        </View>
      </View>
      <View style={{ ...styles.containerSection, marginTop: theme.spacing.lg }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: theme.spacing.xl * 1.25,
            alignItems: 'center',
          }}
        >
          <Text h3>Top-rated psychiatrist</Text>
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
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            ...styles.noContainerOffset,
          }}
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
    </ScrollView>
  );
}

export default ChatPage;
