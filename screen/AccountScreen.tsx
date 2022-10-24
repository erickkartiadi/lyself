import { Avatar as RNEAvatar, Icon, Tab, TabView, Text, useTheme } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import * as React from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import StoryTabView from '../components/account/StoryTabView';
import Avatar from '../components/base/Avatar';
import ImagePickerBottomSheet from '../components/base/ImagePickerBottomSheet';
import ItemPressable from '../components/base/ItemPressable';
import TabItem from '../components/base/TabItem';
import {
  useChangeProfile,
  useFindUser,
  useRemoveProfile,
} from '../services/api/user/users.hooks';
import layout from '../styles/layout';
import spacing from '../styles/spacing';
import { SIZING } from '../theme/theme';
import { AuthContext } from '../utils/context/AuthContext';
import useStyles from '../utils/hooks/useStyles';
import { somethingWentWrongToast } from '../utils/toast';

function AccountScreen() {
  const { theme } = useTheme();
  const { user, logout } = React.useContext(AuthContext);
  const { data: currentUserData } = useFindUser(user?.uid);

  const changeProfileMutation = useChangeProfile();
  const removeProfileMutation = useRemoveProfile();

  const bottomSheetRef = React.useRef<Modalize>(null);
  const showBottomSheet = () => {
    bottomSheetRef.current?.open();
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      somethingWentWrongToast();
    }
  };

  const styles = useStyles();
  const [index, setIndex] = React.useState(0);

  const handleImagePicked = async (pickerResult: ImagePicker.ImagePickerResult) => {
    closeBottomSheet();

    if (!pickerResult.cancelled) {
      changeProfileMutation.mutate(pickerResult.uri);
    }
  };

  const handleRemoveProfile = async () => {
    removeProfileMutation.mutate();
    closeBottomSheet();
  };

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
            avatarUrl={currentUserData?.photoURL}
          >
            <RNEAvatar.Accessory
              size={SIZING['3xl']}
              color={theme.colors.black}
              name="pencil"
              type="material-community"
              onPress={showBottomSheet}
              style={styles.defaultBackground}
            />
          </Avatar>
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
      <ImagePickerBottomSheet
        handleImagePicked={handleImagePicked}
        headerTitle="Change Profile Picture"
        bottomSheetRef={bottomSheetRef}
        headerActionOnPress={closeBottomSheet}
      >
        {currentUserData?.photoURL && (
          <ItemPressable
            onPress={handleRemoveProfile}
            iconProps={{
              color: theme.colors.error,
              name: 'image-off-outline',
              size: SIZING['4xl'],
              type: 'material-community',
            }}
            title="Remove Profile Picture"
          />
        )}
      </ImagePickerBottomSheet>
    </>
  );
}

export default AccountScreen;
