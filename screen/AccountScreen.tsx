import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Avatar from '../components/base/Avatar';
import SettingMenu from '../components/base/SettingMenu';
import { styles } from '../theme/styles';
import { AuthContext } from '../utils/context/AuthContext';
import { somethingWentWrongToast } from '../utils/toast';

function AccountScreen() {
  const { theme } = useTheme();
  const { user, logout } = React.useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      somethingWentWrongToast();
    }
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
          {user?.photoURL ? (
            <Avatar
              rounded
              size={7}
              containerStyle={{ marginBottom: theme.spacing.xl }}
              source={{
                uri: user.photoURL,
              }}
            />
          ) : (
            <Avatar
              rounded
              size={7}
              icon={{ name: 'person', type: 'ionicon', color: theme.colors.grey3 }}
              containerStyle={{
                backgroundColor: theme.colors.secondary,
                marginBottom: theme.spacing.xl,
              }}
            />
          )}
          <Text h3>{user?.displayName}</Text>
          <Text color={theme.colors.grey3}>{user?.email}</Text>
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
