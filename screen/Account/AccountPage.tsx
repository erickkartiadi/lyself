import { Avatar, Divider, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { ScrollView, View } from 'react-native';
import SettingMenu from '../../components/SettingMenu';
import SwitchModeSettingMenu from '../../components/SwitchModeSettingMenu';

function AccountPage() {
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
              uri: 'https://images.unsplash.com/photo-1605979399824-542335ee35d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
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

export default AccountPage;
