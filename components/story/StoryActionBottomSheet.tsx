import { useNavigation } from '@react-navigation/native';
import { Icon, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Pressable, View } from 'react-native';

import { StoryScreenNavigationProps } from '../../navigation/navigation.types';
import { useDeleteStory } from '../../services/api/stories/stories.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Story } from '../../types/types';
import BottomSheet, { BottomSheetProps } from '../base/BottomSheet';
import Dialog from '../base/Dialog';

interface StoryActionBottomSheetProps
  extends BottomSheetProps,
    Omit<Story, 'createdAt' | 'creatorId'> {}

function StoryActionBottomSheet({
  id,
  categoryId,
  content,
  isAnonymous,
  isCommentDisabled,
  title,
  bottomSheetRef,
}: StoryActionBottomSheetProps) {
  const closeBottomSheet = () => bottomSheetRef.current?.close();
  const { theme } = useTheme();
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const navigation = useNavigation<StoryScreenNavigationProps['navigation']>();

  const deleteStoryMutation = useDeleteStory();
  const handleOpenDialog = () => {
    setIsDialogVisible(true);
    closeBottomSheet();
  };

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
  };
  // TODO add confirmation dialog
  const handleDeleteStory = () => {
    deleteStoryMutation.mutate(
      {
        categoryId,
        id,
      },
      {
        onSettled: () => {
          handleCloseDialog();
        },
      }
    );
  };

  const navigateToEditScreen = () => {
    navigation.navigate('StoryStack', {
      screen: 'EditStory',
      params: {
        categoryId,
        content,
        id,
        isAnonymous,
        isCommentDisabled,
        title,
      },
    });

    closeBottomSheet();
  };

  return (
    <>
      <BottomSheet
        modalStyle={layout.container_gutter}
        adjustToContentHeight
        bottomSheetRef={bottomSheetRef}
        childrenStyle={layout.no_container_gutter}
        headerTitle="Action"
        headerActionOnPress={closeBottomSheet}
      >
        <View style={spacing.mb_xl}>
          <Pressable
            android_ripple={{ color: theme.colors.secondary }}
            onPress={navigateToEditScreen}
            style={[layout.container_gutter, spacing.py_lg]}
          >
            <View style={[layout.flex_dir_row, layout.align_center]}>
              <Icon
                name="note-edit-outline"
                size={SIZING['4xl']}
                type="material-community"
                color={theme.colors.blue}
                containerStyle={spacing.mr_lg}
              />
              <Text subtitle>Edit Story</Text>
            </View>
          </Pressable>
          <Pressable
            android_ripple={{ color: theme.colors.secondary }}
            onPress={handleOpenDialog}
            style={[layout.container_gutter, spacing.py_lg]}
          >
            <View style={[layout.flex_dir_row, layout.align_center]}>
              <Icon
                name="note-remove-outline"
                size={SIZING['4xl']}
                type="material-community"
                color={theme.colors.error}
                containerStyle={spacing.mr_lg}
              />
              <Text subtitle>Delete Story</Text>
            </View>
          </Pressable>
        </View>
      </BottomSheet>
      <Dialog
        onBackdropPress={handleCloseDialog}
        isVisible={isDialogVisible}
        title="Delete story?"
        content="You cannot undo this action"
        buttonOnPress1={handleDeleteStory}
        buttonOnPress2={handleCloseDialog}
        buttonTitle1="Ok"
        buttonTitle2="Cancel"
        isLoading={deleteStoryMutation.isLoading}
      />
    </>
  );
}

export default StoryActionBottomSheet;
