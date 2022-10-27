import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

import { StoryScreenNavigationProps } from '../../navigation/navigation.types';
import { useDeleteStory } from '../../services/api/stories/stories.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Story } from '../../types/types';
import BottomSheet, { BottomSheetProps } from '../base/BottomSheet';
import Dialog from '../base/Dialog';
import ItemPressable from '../base/ItemPressable';

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
  imageUri,
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
        imageUri,
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
          <ItemPressable
            onPress={navigateToEditScreen}
            iconProps={{
              name: 'note-edit-outline',
              type: 'material-community',
              size: SIZING['4xl'],
              color: theme.colors.blue,
            }}
            title="Edit Story"
          />
          <ItemPressable
            onPress={handleOpenDialog}
            iconProps={{
              name: 'note-remove-outline',
              type: 'material-community',
              size: SIZING['4xl'],
              color: theme.colors.error,
            }}
            title="Delete Story"
          />
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
