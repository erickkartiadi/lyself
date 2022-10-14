import { Button, Divider, Icon, Text, useTheme } from '@rneui/themed';
import { Timestamp } from 'firebase/firestore';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Toast from 'react-native-toast-message';

import BottomSheet from '../../components/base/BottomSheet';
import Chip from '../../components/base/Chip';
import ButtonLink from '../../components/base/Link';
import SwitchToggle from '../../components/base/Switch';
import TextInput from '../../components/base/TextInput';
import { AddStoryScreenNavigationProps } from '../../navigation/navigation.types';
import { CreateStoryDto } from '../../services/api/story/story.api';
import { useCreateStory } from '../../services/api/story/story.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { heading2 } from '../../styles/typhography';
import { SIZING } from '../../theme/theme';
import { AuthContext } from '../../utils/context/AuthContext';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';
import useStyles from '../../utils/hooks/useStyles';
import { somethingWentWrongToast } from '../../utils/toast';

function AddStoryScreen({ navigation }: AddStoryScreenNavigationProps) {
  const { theme } = useTheme();
  const { control, handleSubmit, reset } = useForm<CreateStoryDto>({
    defaultValues: {
      content: '',
      title: '',
      anonymous: false,
    },
  });
  const { user } = React.useContext(AuthContext);

  const storyMutation = useCreateStory();

  const styles = useStyles();

  useApplyHeaderWorkaround(navigation.setOptions);

  const handlePostStory = ({ content, title, anonymous }: CreateStoryDto) => {
    if (!user) {
      somethingWentWrongToast();
      return;
    }

    if (title === '') {
      Toast.show({
        type: 'error',
        text1: 'Title is empty',
        text2: 'You must add title to your story',
      });
      return;
    }

    storyMutation.mutate(
      {
        anonymous,
        content,
        title,
        userId: user.uid,
        createdAt: Timestamp.fromDate(new Date()),
      },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Your story has been created',
          });
          reset();
          navigation.goBack();
        },
        onError: () => {
          somethingWentWrongToast();
        },
      }
    );
  };

  const postButton = React.useCallback(
    () => (
      <ButtonLink color="primary" onPress={handleSubmit(handlePostStory)}>
        POST
      </ButtonLink>
    ),
    []
  );
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: postButton,
    });
  }, []);

  const categoryBottomSheetRef = React.useRef<Modalize>(null);
  const handleShowBottomSheet = () => categoryBottomSheetRef.current?.open();

  return (
    <>
      <ScrollView contentContainerStyle={[layout.container]}>
        <View style={layout.section_sm}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                enableErrorMessage={false}
                showBorder={false}
                inputStyle={heading2}
                placeholder="Title"
                multiline
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                containerStyle={spacing.mt_sm}
                enableErrorMessage={false}
                showBorder={false}
                placeholder="Type your story here."
                multiline
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View style={[spacing.mt_md, layout.flex_dir_row]}>
          <Chip containerStyle={[spacing.mr_md]}>Mental Health</Chip>
          <Chip containerStyle={spacing.mr_md}>War</Chip>
          <View>
            <Button
              type="outline"
              size="md"
              uppercase={false}
              onPress={handleShowBottomSheet}
            >
              <Icon
                containerStyle={spacing.mr_sm}
                size={SIZING['2xl']}
                name="tag-plus-outline"
                color={theme.colors.primary}
                type="material-community"
              />
              Add Category
            </Button>
          </View>
        </View>
        <Divider style={spacing.my_xl} />
        <View style={[layout.flex_dir_row, layout.justify_between, layout.align_center]}>
          <View>
            <Text subtitle2>Anonymous post</Text>
            <Text small style={styles.textGrey}>
              People cannot see your profile on this story
            </Text>
          </View>
          <Controller
            control={control}
            name="anonymous"
            render={({ field: { onChange, value } }) => (
              <SwitchToggle value={value} onValueChange={onChange} />
            )}
          />
        </View>
      </ScrollView>
      <BottomSheet bottomSheetRef={categoryBottomSheetRef}>
        <View style={[layout.container, layout.section_lg]}>
          <Text subtitle>Select Category</Text>
        </View>
      </BottomSheet>
    </>
  );
}

export default AddStoryScreen;
