import {
  Button,
  Chip,
  Divider,
  Icon,
  makeStyles,
  Switch,
  Text,
  useTheme,
} from '@rneui/themed';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import TextInput from '../../components/base/TextInput';
import { AddStoryScreenNavigationProps } from '../../navigation/navigation.types';
import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import { FONT } from '../../theme/theme';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';
import normalize from '../../utils/normalize';

export type StoryFormData = {
  title: string;
  content: string;
};

const useStyles = makeStyles((theme) => ({
  colorGrey3: {
    color: theme.colors.grey3,
  },
}));

function AddStoryScreen({ navigation }: AddStoryScreenNavigationProps) {
  const { theme } = useTheme();
  const { control, handleSubmit, reset, watch } = useForm<StoryFormData>({
    defaultValues: {
      content: '',
      title: '',
    },
  });

  const styles = useStyles();

  useApplyHeaderWorkaround(navigation.setOptions);

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
              containerStyle={spacing.mt_md}
              enableErrorMessage={false}
              showBorder={false}
              placeholder="Type your text"
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
        <Switch />
      </View>
    </ScrollView>
  );
}

export default AddStoryScreen;
