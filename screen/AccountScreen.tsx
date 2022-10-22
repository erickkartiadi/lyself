import { Icon } from '@rneui/base';
import { Tab, TabView, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import StoryTabView from '../components/account/StoryTabView';
import Avatar from '../components/base/Avatar';
import TabItem from '../components/base/TabItem';
import layout from '../styles/layout';
import spacing from '../styles/spacing';
import { SIZING } from '../theme/theme';
import { AuthContext } from '../utils/context/AuthContext';
import useStyles from '../utils/hooks/useStyles';
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

  const styles = useStyles();
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <View
        style={[
          layout.flex_dir_row,
          layout.justify_between,
          layout.align_center,
          layout.container_gutter,
          layout.section_md,
        ]}
      >
        <View style={[layout.flex_dir_row, layout.align_center]}>
          <Avatar
            size={SIZING['8xl']}
            containerStyle={spacing.mr_xl}
            avatarUrl={user?.photoURL}
          />
          <View>
            <Text h4>{user?.displayName}</Text>
            <Text style={styles.textGrey}>{user?.email}</Text>
          </View>
        </View>
        <Icon
          name="exit-outline"
          type="ionicon"
          color={theme.colors.error}
          onPress={handleLogout}
        />
      </View>
      <View style={[layout.container_gutter, layout.section_md]}>
        <Tab
          containerStyle={styles.secondaryBackground}
          value={index}
          onChange={(e) => setIndex(e)}
        >
          <TabItem title="My Story" />
          <TabItem title="Liked" />
          <TabItem title="Saved" />
        </Tab>
      </View>
      <TabView value={index} onChange={setIndex}>
        <StoryTabView type="user" />
        <StoryTabView type="liked" />
        <StoryTabView type="saved" />
      </TabView>
    </>
  );
}

export default AccountScreen;
