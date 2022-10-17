import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Icon, Text, useTheme } from '@rneui/themed';
import { Timestamp } from 'firebase/firestore';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import Chip from '../../components/base/Chip';
import ButtonLink from '../../components/base/Link';
import SwitchToggle from '../../components/base/Switch';
import TextInput from '../../components/base/TextInput';
import CreateCategoryBottomSheet from '../../components/story/CreateCategoryBottomSheet';
import SelectCategoryBottomSheet from '../../components/story/SelectCategoryBottomSheet';
import { AddStoryScreenNavigationProps } from '../../navigation/navigation.types';
import { CreateStoryDto } from '../../services/api/story/story.api';
import { useCreateStory } from '../../services/api/story/story.hooks';
import border from '../../styles/border';
import layout from '../../styles/layout';
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
    formState: { errors },
  } = useForm<CreateStoryDto>({
    defaultValues: {
      content: '',
      title: '',
      anonymous: false,
      categoryId: '',
    },
    resolver: yupResolver(createStorySchema),
  });

  const storyMutation = useCreateStory();

  const handlePostStory = ({ content, title, anonymous, categoryId }: CreateStoryDto) => {
    if (!user) {
      somethingWentWrongToast();
      return;
    }

    storyMutation.mutate(
      {
        anonymous,
        content,
        title,
        categoryId,
        creatorId: user.uid,
        createdAt: Timestamp.fromDate(new Date()),
        likedUsersIds: [],
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

  const selectCategoryBottomSheetRef = React.useRef<Modalize>(null);
  const addCategoryBottomSheetRef = React.useRef<Modalize>(null);

  const showSelectCategoryBottomSheet = () =>
    selectCategoryBottomSheetRef.current?.open();
  const hideSelectCategoryBottomSheet = () =>
    selectCategoryBottomSheetRef.current?.close();

  return (
    <>
      <ScrollView contentContainerStyle={[layout.container]}>
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
        <View style={[spacing.mt_lg, layout.flex_dir_row]}>
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
            name="anonymous"
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
    </>
  );
}

export default AddStoryScreen;
