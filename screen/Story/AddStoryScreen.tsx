import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Icon, Image, Text, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import * as ImagePicker from 'expo-image-picker';
import { Timestamp } from 'firebase/firestore';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import ButtonLink from '../../components/base/ButtonLink';
import Chip from '../../components/base/Chip';
import ImagePickerBottomSheet from '../../components/base/ImagePickerBottomSheet';
import SwitchToggle from '../../components/base/Switch';
import TextInput from '../../components/base/TextInput';
import { VerticalSeparator } from '../../components/layout/ItemSeparator';
import CreateCategoryBottomSheet from '../../components/story/CreateCategoryBottomSheet';
import SelectCategoryBottomSheet from '../../components/story/SelectCategoryBottomSheet';
import { AddStoryScreenNavigationProps } from '../../navigation/navigation.types';
import { CreateStoryDto } from '../../services/api/stories/stories.api';
import { useCreateStory } from '../../services/api/stories/stories.hooks';
import border from '../../styles/border';
import layout from '../../styles/layout';
import { width } from '../../styles/size';
import spacing from '../../styles/spacing';
import { heading2 } from '../../styles/typhography';
import { SIZING } from '../../theme/theme';
import { createStorySchema } from '../../utils/constant/validation/story.schema';
import { AuthContext } from '../../utils/context/AuthContext';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';
import useStyles from '../../utils/hooks/useStyles';
import { somethingWentWrongToast } from '../../utils/toast';

function AddStoryScreen({ navigation }: AddStoryScreenNavigationProps) {
  useApplyHeaderWorkaround(navigation.setOptions);

  const { theme } = useTheme();
  const styles = useStyles();
  const { user } = React.useContext(AuthContext);

  const [selectedCategory, setSelectedCategory] = React.useState('');

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateStoryDto>({
    defaultValues: {
      content: '',
      title: '',
      categoryId: '',
      isAnonymous: false,
      isCommentDisabled: false,
      imageUri: undefined,
    },
    resolver: yupResolver(createStorySchema),
  });

  const storyMutation = useCreateStory();

  const handlePostStory = ({
    content,
    title,
    isAnonymous,
    categoryId,
    isCommentDisabled,
    imageUri,
  }: CreateStoryDto) => {
    if (!user) {
      somethingWentWrongToast();
      return;
    }

    storyMutation.mutate(
      {
        isAnonymous,
        content,
        title,
        categoryId,
        creatorId: user.uid,
        createdAt: Timestamp.fromDate(new Date()),
        isCommentDisabled,
        imageUri,
      },
      {
        onSuccess: () => {
          reset();
          navigation.goBack();
        },
      }
    );
  };

  const postButton = React.useCallback(
    () => (
      <ButtonLink
        loading={storyMutation.isLoading}
        color="primary"
        onPress={handleSubmit(handlePostStory)}
      >
        POST
      </ButtonLink>
    ),
    [storyMutation.isLoading]
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: postButton,
    });
  }, [storyMutation.isLoading]);

  const selectCategoryBottomSheetRef = React.useRef<Modalize>(null);
  const addCategoryBottomSheetRef = React.useRef<Modalize>(null);
  const imagePickerBottomSheetRef = React.useRef<Modalize>(null);

  const showSelectCategoryBottomSheet = () =>
    selectCategoryBottomSheetRef.current?.open();
  const hideSelectCategoryBottomSheet = () =>
    selectCategoryBottomSheetRef.current?.close();

  const showImagePickerBottomSheet = () => imagePickerBottomSheetRef.current?.open();
  const hideImagePickerBottomSheet = () => imagePickerBottomSheetRef.current?.close();

  const handleImagePicked = async (pickerResult: ImagePicker.ImagePickerResult) => {
    hideImagePickerBottomSheet();

    if (!pickerResult.cancelled) {
      setValue('imageUri', pickerResult.uri);
    }
  };

  const watchImage = watch('imageUri');

  const handleRemoveImage = () => {
    setValue('imageUri', '');
    hideImagePickerBottomSheet();
  };

  return (
    <>
      <ScrollView contentContainerStyle={[layout.container_gutter]}>
        <View style={layout.section_sm}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                renderErrorMessage={errors.title !== undefined}
                errorMessage={errors.title && errors.title.message}
                inputContainerStyle={[
                  spacing.px_0,
                  spacing.py_0,
                  layout.backgroundTransparent,
                  border.colorTransparent,
                ]}
                errorStyle={[spacing.mt_0, spacing.mb_0]}
                inputStyle={heading2}
                placeholder="Your Story Title"
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
                renderErrorMessage={errors.content !== undefined}
                errorMessage={errors.content && errors.content.message}
                errorStyle={[spacing.mt_0, spacing.mb_0]}
                inputContainerStyle={[
                  spacing.px_0,
                  spacing.py_0,
                  layout.backgroundTransparent,
                  border.colorTransparent,
                ]}
                containerStyle={spacing.mt_xs}
                placeholder="Type your story here."
                multiline
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        {watchImage && (
          <View style={layout.section_sm}>
            <View>
              <Image
                style={[layout.ratio_wide, width.w_100, layout.flex, border.radius_xl]}
                source={{ uri: watchImage }}
              />
              <Icon
                onPress={handleRemoveImage}
                containerStyle={{
                  position: 'absolute',
                  right: 0,
                  margin: 8,
                }}
                iconStyle={{
                  padding: theme.spacing.xs,
                  borderRadius: 999,
                }}
                size={SIZING['2xl']}
                backgroundColor={colorAlpha(theme.colors.grey4, 0.75)}
                color={theme.colors.grey0}
                name="close"
              />
            </View>
          </View>
        )}
        <View style={[layout.section_sm, layout.flex_dir_row]}>
          <View>
            <Button
              type="outline"
              size="md"
              uppercase={false}
              onPress={showImagePickerBottomSheet}
            >
              <Icon
                containerStyle={spacing.mr_sm}
                size={SIZING['2xl']}
                name="image-outline"
                color={theme.colors.primary}
                type="material-community"
              />
              {watchImage ? 'Change Picture' : 'Select Picture'}
            </Button>
          </View>
        </View>
        <View style={[layout.section_sm, layout.flex_dir_row]}>
          {selectedCategory !== '' && (
            <Chip containerStyle={[spacing.mr_md]}>{selectedCategory}</Chip>
          )}
          <View>
            <Button
              type="outline"
              size="md"
              uppercase={false}
              onPress={showSelectCategoryBottomSheet}
            >
              <Icon
                containerStyle={spacing.mr_sm}
                size={SIZING['2xl']}
                name="tag-plus-outline"
                color={theme.colors.primary}
                type="material-community"
              />
              {selectedCategory !== '' ? 'Change Category' : 'Select Category'}
            </Button>
          </View>
        </View>

        {errors.categoryId && (
          <Text caption style={[styles.textError, spacing.mt_sm]}>
            {errors.categoryId.message}
          </Text>
        )}
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
            name="isAnonymous"
            render={({ field: { onChange, value } }) => (
              <SwitchToggle value={value} onValueChange={onChange} />
            )}
          />
        </View>
        <VerticalSeparator />
        <View style={[layout.flex_dir_row, layout.justify_between, layout.align_center]}>
          <View>
            <Text subtitle2>Disable comment</Text>
            <Text small style={styles.textGrey}>
              People cannot reply to this story
            </Text>
          </View>
          <Controller
            control={control}
            name="isCommentDisabled"
            render={({ field: { onChange, value } }) => (
              <SwitchToggle value={value} onValueChange={onChange} />
            )}
          />
        </View>
      </ScrollView>

      <SelectCategoryBottomSheet
        control={control}
        headerActionOnPress={() => {
          hideSelectCategoryBottomSheet();
          addCategoryBottomSheetRef.current?.open();
        }}
        bottomSheetRef={selectCategoryBottomSheetRef}
        setSelectedCategory={setSelectedCategory}
      />
      <CreateCategoryBottomSheet bottomSheetRef={addCategoryBottomSheetRef} />
      <ImagePickerBottomSheet
        aspectRatio={[16, 9]}
        headerTitle="Choose picture"
        handleImagePicked={handleImagePicked}
        bottomSheetRef={imagePickerBottomSheetRef}
        headerActionOnPress={hideImagePickerBottomSheet}
      />
    </>
  );
}

export default AddStoryScreen;
