import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SettingMenu from '../../components/SettingMenu';
import SwitchModeSettingMenu from '../../components/SwitchModeSettingMenu';
import { AccountRouteParamList, RootRouteParamList } from '../../types/routes';

export type AccountPageProps = NativeStackScreenProps<
  RootRouteParamList & AccountRouteParamList,
  'Account'
>;
function AccountPage({ navigation }: AccountPageProps) {
  const { theme } = useTheme();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          marginVertical: theme.spacing.xl,
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
              overflow: 'hidden',
              elevation: 1,
              marginBottom: theme.spacing.md,
            }}
            source={{
              uri: 'https://images.unsplash.com/photo-1605979399824-542335ee35d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
            }}
          />
          <Text h4>Erick Kartiadi</Text>
          <Text caption style={{ color: theme.colors.grey2 }}>
            erick007@binus.ac.id
          </Text>
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
            bgColor={theme.colors.primary}
            bgColorDark={theme.colors.primary}
            iconName="chatbubbles"
            iconType="ionicon"
          />
          <SettingMenu
            title="FAQ"
            bgColor={theme.colors.blue}
            bgColorDark={theme.colors.blue}
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
            onPress={() => navigation.navigate('AuthRoutes')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default AccountPage;
