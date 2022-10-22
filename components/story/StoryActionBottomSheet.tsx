import { Icon, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Pressable, View } from 'react-native';

import { useDeleteStory } from '../../services/api/stories/stories.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Story } from '../../types/types';
import BottomSheet, { BottomSheetProps } from '../base/BottomSheet';

interface StoryActionBottomSheetProps
  extends BottomSheetProps,
    Pick<Story, 'id' | 'categoryId'> {}

function StoryActionBottomSheet({
  id,
  categoryId,
  bottomSheetRef,
}: StoryActionBottomSheetProps) {
  const closeBottomSheet = () => bottomSheetRef.current?.close();
  const { theme } = useTheme();

  const deleteStoryMutation = useDeleteStory();

  const handleDeleteStory = () => {
    deleteStoryMutation.mutate(
      {
        categoryId,
        id,
      },
      {
        onSettled: () => {
          closeBottomSheet();
        },
      }
    );
  };

  return (
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
          onPress={() => console.log('edit')}
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
          onPress={handleDeleteStory}
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
  );
}

export default StoryActionBottomSheet;
