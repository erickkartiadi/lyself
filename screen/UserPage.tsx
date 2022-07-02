import { Avatar, Divider, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { ScrollView, View } from 'react-native';
import SettingMenu from '../components/SettingMenu';
import SwitchModeSettingMenu from '../components/SwitchModeSettingMenu';
import { styles } from '../theme';
import { ChatPageProps } from './Chat/ChatPage';

function UserPage({ navigation }: ChatPageProps) {
  const { theme } = useTheme();

  return (
    <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: theme.colors.background,
          paddingTop: theme.spacing.xl * 2,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar
            rounded
            size={96}
            containerStyle={{
              borderWidth: 2,
              borderColor: theme.colors.cardBackground,
              overflow: 'hidden',
              elevation: 1,
              marginBottom: theme.spacing.md,
            }}
            source={{
              uri: 'https://instagram.fcgk29-1.fna.fbcdn.net/v/t51.2885-19/262444890_632892304395690_6565347219672419326_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fcgk29-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=00380RuglZsAX9mCexL&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AT9K0obl2_YwfnRcz-qfHMkavh0EsD9blyjKG53ishhK0Q&oe=62C79450&_nc_sid=8fd12b',
            }}
          />
          <Text h3 h2Style={{ marginBottom: 2 }}>
            Erick Kartiadi
          </Text>
          <Text sm style={{ color: theme.colors.grey2 }}>
            erick007@binus.ac.id
          </Text>
        </View>
        <View
          style={{
            marginTop: theme.spacing.xl * 1.5,
          }}
        >
          <Divider color={theme.colors.cardBackground} width={1} />
        </View>
      </View>
      <View style={{ marginTop: theme.spacing.md }}>
        <View>
          <SwitchModeSettingMenu />
        </View>
        <View style={{ paddingVertical: theme.spacing.sm }}>
          <SettingMenu
            title="Profile"
            bgColor={theme.colors.secondary}
            bgColorDark={theme.colors.secondary}
            iconName="person"
            iconType="ionicon"
          />
          <SettingMenu
            title="Notification"
            bgColor={theme.colors.primary}
            bgColorDark={theme.colors.primary}
            iconName="notifications"
            iconType="ionicon"
          />
          <SettingMenu
            title="Privacy"
            bgColor={theme.colors.purple}
            bgColorDark={theme.colors.purple}
            iconName="lock-closed"
            iconType="ionicon"
          />
        </View>
        <View style={{ paddingVertical: theme.spacing.lg }}>
          <SettingMenu
            title="Setting"
            bgColor={theme.colors.grey0}
            bgColorDark={theme.colors.grey2}
            iconName="settings"
            iconType="ionicon"
          />
          <SettingMenu
            title="Security"
            bgColor={theme.colors.grey4}
            bgColorDark={theme.colors.grey4}
            iconName="shield"
            iconType="ionicon"
          />
          <SettingMenu
            title="Language"
            bgColor={theme.colors.yellow}
            bgColorDark={theme.colors.yellow}
            iconName="globe"
            iconType="ionicon"
            value="English"
          />
        </View>
        <View style={{ paddingVertical: theme.spacing.lg }}>
          <SettingMenu
            title="Ask a Question"
            bgColor="#FF88BB"
            bgColorDark="#b35f83"
            iconName="chatbubbles"
            iconType="ionicon"
          />
          <SettingMenu
            title="FAQ"
            bgColor="#5B92FF"
            bgColorDark="#4066b3"
            iconName="book"
            iconType="ionicon"
          />
          <SettingMenu
            title="Become Our Partner"
            bgColor={theme.colors.success}
            bgColorDark={theme.colors.success}
            iconName="handshake"
            iconType="material-community"
          />
        </View>
        <View style={{ paddingVertical: theme.spacing.lg }}>
          <SettingMenu
            title="Sign Out"
            bgColor={theme.colors.error}
            bgColorDark={theme.colors.error}
            iconName="log-out"
            iconType="ionicon"
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default UserPage;
