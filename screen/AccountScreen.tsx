import 'react-native-get-random-values';

import { Avatar as RNEAvatar, Icon, Tab, TabView, Text, useTheme } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Toast from 'react-native-toast-message';

import StoryTabView from '../components/account/StoryTabView';
import Avatar from '../components/base/Avatar';
import BottomSheet from '../components/base/BottomSheet';
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

  const handleTakePhoto = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'info',
          text1: 'Info',
          text2: 'Sorry we need camera permission to change your profile picture',
        });
      } else {
        const pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });

        handleImagePicked(pickerResult);
      }
    }
  };

  const handlePickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'info',
          text1: 'Info',
          text2: 'Sorry we need camera permission to change your profile picture',
        });
      } else {
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
        });

        handleImagePicked(pickerResult);
      }
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
      <BottomSheet
        adjustToContentHeight
        modalStyle={layout.container_gutter}
        childrenStyle={layout.no_container_gutter}
        headerTitle="Change Profile Picture"
        bottomSheetRef={bottomSheetRef}
        headerActionOnPress={closeBottomSheet}
      >
        <View style={spacing.mb_xl}>
          <Pressable
            android_ripple={{ color: theme.colors.secondary }}
            onPress={handlePickImage}
            style={[layout.container_gutter, spacing.py_lg]}
          >
            <View style={[layout.flex_dir_row, layout.align_center]}>
              <Icon
                name="image-multiple-outline"
                size={SIZING['4xl']}
                type="material-community"
                color={theme.colors.blue}
                containerStyle={spacing.mr_lg}
              />
              <Text subtitle>Open Gallery</Text>
            </View>
          </Pressable>
          <Pressable
            android_ripple={{ color: theme.colors.secondary }}
            onPress={handleTakePhoto}
            style={[layout.container_gutter, spacing.py_lg]}
          >
            <View style={[layout.flex_dir_row, layout.align_center]}>
              <Icon
                name="camera-outline"
                size={SIZING['4xl']}
                type="material-community"
                color={theme.colors.blue}
                containerStyle={spacing.mr_lg}
              />
              <Text subtitle>Take Picture</Text>
            </View>
          </Pressable>
          <Pressable
            android_ripple={{ color: theme.colors.secondary }}
            onPress={handleRemoveProfile}
            style={[layout.container_gutter, spacing.py_lg]}
          >
            <View style={[layout.flex_dir_row, layout.align_center]}>
              <Icon
                name="image-off-outline"
                size={SIZING['4xl']}
                type="material-community"
                color={theme.colors.error}
                containerStyle={spacing.mr_lg}
              />
              <Text subtitle>Remove Profile Picture</Text>
            </View>
          </Pressable>
        </View>
      </BottomSheet>
    </>
  );
}

export default AccountScreen;
