import { useTheme } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import * as React from 'react';
import { Platform, View } from 'react-native';
import Toast from 'react-native-toast-message';

import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import BottomSheet, { BottomSheetProps } from './BottomSheet';
import ItemPressable from './ItemPressable';

interface ImagePickerBottomSheetProps extends React.PropsWithChildren<BottomSheetProps> {
  handleImagePicked: (pickerResult: ImagePicker.ImagePickerResult) => Promise<void>;
  aspectRatio: [number, number];
}

function ImagePickerBottomSheet({
  bottomSheetRef,
  handleImagePicked,
  children,
  aspectRatio,
  ...props
}: ImagePickerBottomSheetProps) {
  const { theme } = useTheme();

  const handleTakePhoto = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'info',
          text1: 'Info',
          text2: 'Sorry we need camera permission to use picture',
        });
      } else {
        const pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: aspectRatio,
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
          text2: 'Sorry we need storage permission to select picture',
        });
      } else {
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: aspectRatio,
        });

        handleImagePicked(pickerResult);
      }
    }
  };
  return (
    <BottomSheet
      modalStyle={layout.container_gutter}
      childrenStyle={layout.no_container_gutter}
      adjustToContentHeight
      bottomSheetRef={bottomSheetRef}
      {...props}
    >
      <View style={spacing.mb_xl}>
        <ItemPressable
          iconProps={{
            name: 'image-multiple-outline',
            size: SIZING['4xl'],
            type: 'material-community',
            color: theme.colors.blue,
          }}
          onPress={handlePickImage}
          title="Open Gallery"
        />
        <ItemPressable
          iconProps={{
            name: 'camera-outline',
            size: SIZING['4xl'],
            type: 'material-community',
            color: theme.colors.blue,
          }}
          onPress={handleTakePhoto}
          title="Take Picture"
        />
        {children}
      </View>
    </BottomSheet>
  );
}

export default ImagePickerBottomSheet;
