import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Avatar from '../components/base/Avatar';
import SettingMenu from '../components/base/SettingMenu';
import layout from '../styles/layout';
import spacing from '../styles/spacing';
import { SIZING } from '../theme/theme';
import { AuthContext } from '../utils/context/AuthContext';
import useStyles from '../utils/hooks/useStyles';
import { somethingWentWrongToast } from '../utils/toast';

function AccountTabScreen() {
  const { theme } = useTheme();
  const { user, logout } = React.useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      somethingWentWrongToast();
    }
  };

  const styles = useStyles();

  return (
    <ScrollView contentContainerStyle={[layout.sectionLarge]}>
      <View style={layout.sectionLarge}>
        <View
          style={[
            layout.flex,
            layout.flexDirCol,
            layout.alignCenter,
            layout.justifyCenter,
          ]}
        >
          <Avatar
            size={SIZING['9xl']}
            containerStyle={spacing.mb_xl}
            avatarUrl={user?.photoURL}
          />
          <Text h3>{user?.displayName}</Text>
          <Text style={styles.textGrey}>{user?.email}</Text>
        </View>
      </View>
      <View style={layout.sectionSmall}>
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
      <View style={layout.sectionSmall}>
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
      <View style={layout.sectionSmall}>
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

export default AccountTabScreen;
