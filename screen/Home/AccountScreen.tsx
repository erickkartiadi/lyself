import { Text, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import BaseAvatar from '../../components/bases/BaseAvatar';
import SettingMenu from '../../components/SettingMenu';
import SwitchModeSettingMenu from '../../components/SwitchModeSettingMenu';
import { styles } from '../../theme/styles';
import { user } from '../../utils/constant/seed';
import { AuthContext } from '../../utils/context/AuthContext';

function AccountScreen() {
  const { theme } = useTheme();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <ScrollView contentContainerStyle={[styles.section]}>
      <View style={styles.section}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BaseAvatar
            rounded
            size={6}
            containerStyle={{ marginBottom: theme.spacing.xl }}
            source={{
              uri: 'https://images.unsplash.com/photo-1605979399824-542335ee35d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
            }}
          />
          <Text h4>{user.name}</Text>
          <Text caption style={{ color: theme.colors.grey2 }}>
            {user.email}
          </Text>
        </View>
      </View>
      <View style={styles.sectionSmall}>
        <SwitchModeSettingMenu />
      </View>
      <View style={styles.sectionSmall}>
        <SettingMenu
          title="Profile"
          backgroundColor={theme.colors.blue}
          name="person"
          type="ionicon"
        />
        <SettingMenu
          title="Notification"
          backgroundColor={theme.colors.primary}
          name="notifications"
          type="ionicon"
        />
        <SettingMenu
          title="Privacy"
          backgroundColor={theme.colors.purple}
          name="lock-closed"
          type="ionicon"
        />
      </View>
      <View style={styles.sectionSmall}>
        <SettingMenu
          title="Setting"
          backgroundColor={theme.colors.grey0}
          name="settings"
          type="ionicon"
        />
        <SettingMenu
          title="Security"
          backgroundColor={theme.colors.grey4}
          name="shield"
          type="ionicon"
        />
        <SettingMenu
          title="Language"
          backgroundColor={theme.colors.warning}
          name="globe"
          type="ionicon"
          caption="English"
        />
      </View>
      <View style={styles.sectionSmall}>
        <SettingMenu
          title="Ask a Question"
          backgroundColor={theme.colors.primary}
          name="chatbubbles"
          type="ionicon"
        />
        <SettingMenu
          title="FAQ"
          backgroundColor={theme.colors.blue}
          name="book"
          type="ionicon"
        />
        <SettingMenu
          title="Become Our Partner"
          backgroundColor={theme.colors.success}
          name="handshake"
          type="material-community"
        />
      </View>
      <SettingMenu
        title="Sign Out"
        backgroundColor={theme.colors.error}
        name="log-out"
        type="ionicon"
        onPress={handleLogout}
      />
    </ScrollView>
  );
}

export default AccountScreen;
