import { Text, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import BaseAvatar from '../../components/bases/BaseAvatar';
import SettingMenu from '../../components/SettingMenu';
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
    <ScrollView contentContainerStyle={[styles.sectionLarge]}>
      <View style={styles.sectionLarge}>
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
            size={7}
            containerStyle={{ marginBottom: theme.spacing.xl }}
            source={{
              uri: 'https://images.unsplash.com/photo-1605979399824-542335ee35d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
            }}
          />
          <Text h3>{user.name}</Text>
          <Text color={theme.colors.grey3}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.sectionSmall}>
        <SettingMenu
          title="Profile"
          icon={{ backgroundColor: theme.colors.blue, name: 'person', type: 'ionicon' }}
        />
        <SettingMenu
          title="Notification"
          icon={{
            backgroundColor: theme.colors.primary,
            name: 'notifications',
            type: 'ionicon',
          }}
        />
        <SettingMenu
          title="Privacy"
          icon={{
            backgroundColor: theme.colors.purple,
            name: 'lock-closed',
            type: 'ionicon',
          }}
        />
      </View>
      <View style={styles.sectionSmall}>
        <SettingMenu
          title="Setting"
          icon={{
            backgroundColor: theme.colors.grey0,
            name: 'settings',
            type: 'ionicon',
          }}
        />
        <SettingMenu
          title="Security"
          icon={{ backgroundColor: theme.colors.grey4, name: 'shield', type: 'ionicon' }}
        />
        <SettingMenu
          title="Language"
          icon={{ backgroundColor: theme.colors.warning, name: 'globe', type: 'ionicon' }}
          caption="English"
        />
      </View>
      <View style={styles.sectionSmall}>
        <SettingMenu
          title="Ask a Question"
          icon={{
            backgroundColor: theme.colors.primary,
            name: 'chatbubbles',
            type: 'ionicon',
          }}
        />
        <SettingMenu
          title="FAQ"
          icon={{ backgroundColor: theme.colors.blue, name: 'book', type: 'ionicon' }}
        />
        <SettingMenu
          title="Become Our Partner"
          icon={{
            backgroundColor: theme.colors.success,
            name: 'handshake',
            type: 'material-community',
          }}
        />
      </View>
      <SettingMenu
        title="Sign Out"
        icon={{ backgroundColor: theme.colors.error, name: 'log-out', type: 'ionicon' }}
        onPress={handleLogout}
      />
    </ScrollView>
  );
}

export default AccountScreen;
