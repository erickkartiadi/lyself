import { yupResolver } from '@hookform/resolvers/yup';
import { Button, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { CreateReplyDto } from '../../services/api/stories/replies/replies.api';
import { useCreateReply } from '../../services/api/stories/replies/replies.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Reply } from '../../types/types';
import { createReplySchema } from '../../utils/constant/validation/story.schema';
import { AuthContext } from '../../utils/context/AuthContext';
import useStyles from '../../utils/hooks/useStyles';
import { somethingWentWrongToast } from '../../utils/toast';
import BottomSheet, { BottomSheetProps } from '../base/BottomSheet';
import TextInput from '../base/TextInput';

interface ReplyBottomSheetProps extends BottomSheetProps {
  repliedId: Reply['repliedId'];
}

function ReplyBottomSheet({
  repliedId,
  bottomSheetRef,
  ...props
}: ReplyBottomSheetProps) {
  const styles = useStyles();
  const { theme } = useTheme();
  const { user } = React.useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateReplyDto>({
    defaultValues: {
      reply: '',
      userId: '',
      repliedId,
    },
    resolver: yupResolver(createReplySchema),
  });

  const closeReplyBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const createReplyMutation = useCreateReply(repliedId);

  const handleAddReply = (createReplyDto: CreateReplyDto) => {
    if (!user) {
      somethingWentWrongToast();
      return;
    }

    createReplyMutation.mutate(
      {
        reply: createReplyDto.reply,
        userId: user?.uid ?? null,
        repliedId,
      },
      {
        onSettled: () => {
          closeReplyBottomSheet();
          reset();
        },
      }
    );
  };

  return (
    <BottomSheet
      modalStyle={layout.container_gutter}
      adjustToContentHeight
      bottomSheetRef={bottomSheetRef}
      headerTitle="Reply"
      headerActionType="icon"
      headerActionOnPress={closeReplyBottomSheet}
      scrollViewProps={{
        keyboardShouldPersistTaps: 'handled',
      }}
      {...props}
    >
      <Controller
        control={control}
        name="reply"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            renderErrorMessage={errors.reply !== undefined}
            errorMessage={errors.reply && errors.reply.message}
            multiline
            placeholder="Type your reply here."
          />
        )}
      />
      <View style={spacing.mb_2xl}>
        <Button
          titleStyle={styles.textWhite}
          loading={createReplyMutation.isLoading}
          onPress={handleSubmit(handleAddReply)}
          iconRight
          icon={{
            color: theme.colors.white,
            size: SIZING.xl,
            name: 'send',
            type: 'ionicon',
          }}
        >
          send
        </Button>
      </View>
    </BottomSheet>
  );
}

export default ReplyBottomSheet;
