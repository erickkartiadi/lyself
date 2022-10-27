import { Button, Icon, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { UpdateReplyDto } from '../../services/api/stories/replies/replies.api';
import {
  useDeleteReply,
  useGetReplies,
  useUpdateReply,
} from '../../services/api/stories/replies/replies.hooks';
import { useFindUser } from '../../services/api/user/users.hooks';
import border from '../../styles/border';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Reply, Story } from '../../types/types';
import { AuthContext } from '../../utils/context/AuthContext';
import { formatTimeAgo } from '../../utils/formatTime';
import useStyles from '../../utils/hooks/useStyles';
import useToggle from '../../utils/hooks/useToggle';
import AnimatedPressable from '../base/AnimatedPressable';
import Avatar from '../base/Avatar';
import BottomSheet from '../base/BottomSheet';
import Card from '../base/Card';
import Dialog from '../base/Dialog';
import ItemPressable from '../base/ItemPressable';
import TextInput from '../base/TextInput';
import { HorizontalSeparator, VerticalSeparatorSmall } from '../layout/ItemSeparator';
import ReplyBottomSheet from './ReplyBottomSheet';
import UpvoteButton from './UpvoteButton';

interface ReplyCardProps extends Reply {
  storyCreatorId: Story['creatorId'];
  isStoryAnonymous: Story['isAnonymous'];
}

function ReplyCard({
  createdAt,
  id,
  isStoryAnonymous,
  reply,
  storyCreatorId,
  userId,
  repliedId,
}: ReplyCardProps) {
  const styles = useStyles();
  const { user } = React.useContext(AuthContext);
  const { theme } = useTheme();

  const replyBottomSheetRef = React.useRef<Modalize>(null);
  const replyEditBottomSheetRef = React.useRef<Modalize>(null);
  const replyActionBottomSheetRef = React.useRef<Modalize>(null);

  const { data: replierData } = useFindUser(userId);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateReplyDto>({
    defaultValues: {
      reply,
    },
  });
  const updateReplyMutation = useUpdateReply(repliedId);
  const deleteReplyMutation = useDeleteReply(repliedId);

  const isCurrentUserReply = userId === user?.uid;
  const isCreatorReply = storyCreatorId === userId;

  let textStyle = !isStoryAnonymous && isCreatorReply ? styles.textBlue : styles.textGrey;
  textStyle = isCurrentUserReply ? styles.textPrimary : textStyle;

  let displayName = !isStoryAnonymous && isCreatorReply ? 'OP' : replierData?.displayName;
  displayName = isCurrentUserReply ? 'You' : displayName;

  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [isReplyActionVisible, toggleIsReplyActionVisible] = useToggle(false);

  const showReplyBottomSheet = () => replyBottomSheetRef.current?.open();
  const showReplyActionBottomSheet = () => replyActionBottomSheetRef.current?.open();
  const closeReplyActionBottomSheet = () => replyActionBottomSheetRef.current?.close();
  const showReplyEditBottomSheet = () => {
    closeReplyActionBottomSheet();
    replyEditBottomSheetRef.current?.open();
  };
  const closeReplyEditBottomSheet = () => replyEditBottomSheetRef.current?.close();

  const handleUpdateReply = (updateReplyDto: UpdateReplyDto) => {
    updateReplyMutation.mutate({
      id,
      repliedId,
      reply: updateReplyDto.reply,
    });
    closeReplyEditBottomSheet();
  };

  const handleOpenDialog = () => {
    setIsDialogVisible(true);
    closeReplyActionBottomSheet();
  };
  const handleCloseDialog = () => setIsDialogVisible(false);

  const handleDeleteReply = () => {
    deleteReplyMutation.mutate(
      {
        id,
        repliedId,
      },
      {
        onSettled: () => {
          handleCloseDialog();
        },
      }
    );
  };

  return (
    <>
      <AnimatedPressable onPress={() => toggleIsReplyActionVisible()}>
        <Card containerStyle={[layout.flex]}>
          <View style={[layout.flex_dir_row, layout.justify_between]}>
            <View style={[layout.flex, layout.flex_dir_row, layout.align_center]}>
              <Avatar
                size={SIZING.xl}
                avatarUrl={replierData?.photoURL}
                containerStyle={spacing.mr_xs}
              />
              <Text caption style={textStyle}>
                {displayName}
              </Text>
              <Icon
                type="entypo"
                size={SIZING.xl}
                name="dot-single"
                color={theme.colors.grey3}
              />
              <Text caption style={styles.textGrey}>
                {formatTimeAgo(createdAt.toDate())}
              </Text>
            </View>
          </View>
          <Text style={spacing.mt_sm} small>
            {reply}
          </Text>
          <View
            style={[
              layout.flex_dir_row,
              layout.align_center,
              !isReplyActionVisible ? layout.display_none : layout.flex,
              spacing.mt_md,
            ]}
          >
            <UpvoteButton
              iconSize={SIZING['2xl']}
              type="reply"
              buttonStyle="row"
              id={id}
              showText={false}
            />
            <HorizontalSeparator />
            <TouchableOpacity
              onPress={showReplyBottomSheet}
              style={[layout.flex_dir_row, layout.align_center]}
            >
              <Icon
                color={theme.colors.grey3}
                name="arrow-undo-outline"
                type="ionicon"
                size={SIZING['2xl']}
                containerStyle={spacing.mr_sm}
              />
              <Text small style={styles.textGrey}>
                Replies
              </Text>
            </TouchableOpacity>
            <View style={layout.flex} />

            {isCurrentUserReply && (
              <Icon
                hitSlop={{
                  top: 30,
                  bottom: 30,
                  left: 30,
                  right: 30,
                }}
                onPress={showReplyActionBottomSheet}
                color={theme.colors.grey3}
                name="ellipsis-horizontal"
                type="ionicon"
                size={SIZING['2xl']}
                containerStyle={border.rounded}
              />
            )}
          </View>
        </Card>
      </AnimatedPressable>
      <BottomSheet
        modalStyle={layout.container_gutter}
        adjustToContentHeight
        bottomSheetRef={replyActionBottomSheetRef}
        childrenStyle={layout.no_container_gutter}
        headerTitle="Reply Action"
        headerActionOnPress={closeReplyActionBottomSheet}
      >
        <View style={spacing.mb_xl}>
          <ItemPressable
            onPress={showReplyEditBottomSheet}
            iconProps={{
              name: 'square-edit-outline',
              type: 'material-community',
              size: SIZING['4xl'],
              color: theme.colors.blue,
            }}
            title="Edit Reply"
          />
          <ItemPressable
            onPress={handleOpenDialog}
            iconProps={{
              name: 'delete-outline',
              type: 'material-community',
              size: SIZING['4xl'],
              color: theme.colors.error,
            }}
            title="Delete Reply"
          />
        </View>
      </BottomSheet>
      <BottomSheet
        modalStyle={layout.container_gutter}
        adjustToContentHeight
        bottomSheetRef={replyEditBottomSheetRef}
        headerTitle="Update Reply"
        headerActionType="icon"
        headerActionOnPress={closeReplyEditBottomSheet}
        scrollViewProps={{
          keyboardShouldPersistTaps: 'handled',
        }}
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
            loading={updateReplyMutation.isLoading}
            onPress={handleSubmit(handleUpdateReply)}
            iconRight
            icon={{
              color: theme.colors.white,
              size: SIZING.xl,
              name: 'send',
              type: 'ionicon',
            }}
          >
            Update
          </Button>
        </View>
      </BottomSheet>
      <Dialog
        onBackdropPress={handleCloseDialog}
        isVisible={isDialogVisible}
        title="Delete reply?"
        content="You cannot undo this action"
        buttonOnPress1={handleDeleteReply}
        buttonOnPress2={handleCloseDialog}
        buttonTitle1="Ok"
        buttonTitle2="Cancel"
        isLoading={deleteReplyMutation.isLoading}
      />
      <ReplyBottomSheet
        headerTitle={`Reply to ${replierData?.displayName}`}
        bottomSheetRef={replyBottomSheetRef}
        repliedId={id}
      />
    </>
  );
}

export function ReplyList({
  id,
  isStoryAnonymous,
  storyCreatorId,
}: Pick<ReplyCardProps, 'isStoryAnonymous' | 'storyCreatorId' | 'id'>) {
  const { data: repliesData } = useGetReplies(id);

  const renderReplies = ({ item }: { item: Reply }) => (
    <View key={item.id} style={[spacing.pl_xl]}>
      <ReplyCard
        isStoryAnonymous={isStoryAnonymous}
        storyCreatorId={storyCreatorId}
        {...item}
      />
      <VerticalSeparatorSmall />

      <ReplyList
        id={item.id}
        isStoryAnonymous={isStoryAnonymous}
        storyCreatorId={storyCreatorId}
      />
    </View>
  );

  return <FlatList data={repliesData} renderItem={renderReplies} />;
}

export default React.memo(ReplyCard);
