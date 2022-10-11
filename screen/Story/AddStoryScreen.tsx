import { Button, Chip, Divider, Icon, makeStyles, Text, useTheme } from '@rneui/themed';
import { Timestamp } from 'firebase/firestore';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';

import ButtonLink from '../../components/base/Link';
import SwitchToggle from '../../components/base/Switch';
import TextInput from '../../components/base/TextInput';
import { AddStoryScreenNavigationProps } from '../../navigation/navigation.types';
import { CreateStoryDto } from '../../services/api/story/story.api';
import { useCreateStory } from '../../services/api/story/story.hooks';
import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import { FONT } from '../../theme/theme';
import { AuthContext } from '../../utils/context/AuthContext';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';
import normalize from '../../utils/normalize';
import { somethingWentWrongToast } from '../../utils/toast';

const useStyles = makeStyles((theme) => ({
  colorGrey3: {
    color: theme.colors.grey3,
  },
}));

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

  // TODO anonymous post
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

  return (
    <ScrollView contentContainerStyle={[appStyles.container]}>
      <View style={appStyles.sectionSmall}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              enableErrorMessage={false}
              showBorder={false}
              inputStyle={FONT.heading2}
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
      <View style={[spacing.mt_md, appStyles.flexDirRow, appStyles.flexWrap]}>
        <Chip
          radius="sm"
          color="secondary"
          titleStyle={styles.colorGrey3}
          containerStyle={[spacing.mr_md, spacing.mb_md]}
        >
          Mental Health
        </Chip>
        <Chip
          radius="sm"
          color="secondary"
          titleStyle={styles.colorGrey3}
          containerStyle={spacing.mr_md}
        >
          War
        </Chip>
        <Chip
          radius="sm"
          color="secondary"
          titleStyle={styles.colorGrey3}
          containerStyle={spacing.mr_md}
        >
          Addiction
        </Chip>
        <Chip
          radius="sm"
          color="secondary"
          titleStyle={styles.colorGrey3}
          containerStyle={spacing.mr_md}
        >
          PTSD
        </Chip>
        <Chip
          radius="sm"
          color="secondary"
          titleStyle={styles.colorGrey3}
          containerStyle={spacing.mr_md}
        >
          Insomnia
        </Chip>
        <Chip
          radius="sm"
          color="secondary"
          titleStyle={styles.colorGrey3}
          containerStyle={spacing.mr_md}
        >
          Work
        </Chip>

        <Button
          type="outline"
          size="md"
          buttonStyle={{ borderColor: theme.colors.grey3 }}
          titleStyle={styles.colorGrey3}
          uppercase={false}
        >
          <Icon
            containerStyle={spacing.mr_sm}
            size={normalize(18)}
            name="tag-plus-outline"
            color={theme.colors.grey3}
            type="material-community"
          />
          Add Category
        </Button>
      </View>
      <Divider style={spacing.my_xl} />
      <View
        style={[appStyles.flexDirRow, appStyles.justifyBetween, appStyles.alignCenter]}
      >
        <View>
          <Text subtitle2>Anonymous post</Text>
          <Text small color={theme.colors.grey3}>
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
  );
}

export default AddStoryScreen;
