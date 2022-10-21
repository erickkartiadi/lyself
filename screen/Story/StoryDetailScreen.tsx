import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FAB, Icon, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import disableIllustration from '../../assets/images/disable.png';
import ActivityIndicator from '../../components/base/ActivityIndicator';
import BottomSheet from '../../components/base/BottomSheet';
import EmptyState from '../../components/base/EmptyState';
import TextInput from '../../components/base/TextInput';
import { VerticalSeparatorSmall } from '../../components/layout/ItemSeparator';
import RefreshControl from '../../components/layout/RefreshControl';
import SectionTitle from '../../components/layout/SectionTitle';
import ReplyCard from '../../components/story/ReplyCard';
import StoryCard from '../../components/story/StoryCard';
import { StoryDetailScreenNavigationProps } from '../../navigation/navigation.types';
import { CreateReplyDto } from '../../services/api/stories/replies/replies.api';
import {
  useCreateReply,
  useGetReplies,
} from '../../services/api/stories/replies/replies.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { createReplySchema } from '../../utils/constant/validation/story.schema';
import { AuthContext } from '../../utils/context/AuthContext';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';
import useStyles from '../../utils/hooks/useStyles';
import { somethingWentWrongToast } from '../../utils/toast';

function StoryDetailScreen({
  navigation,
  route: { params },
}: StoryDetailScreenNavigationProps) {
  useApplyHeaderWorkaround(navigation.setOptions);

  const { id: storyId, isCommentDisabled, creatorId, isAnonymous } = params;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateReplyDto>({
    defaultValues: {
      reply: '',
      userId: '',
      storyId,
    },
    resolver: yupResolver(createReplySchema),
  });

  const styles = useStyles();

  const { theme } = useTheme();

  const replyBottomSheet = React.useRef<Modalize>(null);

  const showReplyBottomSheet = () => {
    replyBottomSheet.current?.open();
  };
  const closeReplyBottomSheet = () => {
    replyBottomSheet.current?.close();
  };

  const createReplyMutation = useCreateReply(storyId);

  const { user } = React.useContext(AuthContext);

  const handleAddReply = (createReplyDto: CreateReplyDto) => {
    if (!user) {
      somethingWentWrongToast();
      return;
    }

    createReplyMutation.mutate(
      {
        reply: createReplyDto.reply,
        userId: user?.uid ?? null,
        storyId,
      },
      {
        onSettled: () => {
          closeReplyBottomSheet();
          reset();
        },
      }
    );
  };

  const { data: repliesData, isRefetching, refetch, isLoading } = useGetReplies(storyId);

  const handleOnRefresh = () => {
    refetch();
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={spacing.mb_md}>
              <StoryCard isOnDetailScreen {...params} />
            </View>

            {!isCommentDisabled && !isLoading && (
              <SectionTitle
                title={`Replies (${repliesData?.length})`}
                containerStyle={spacing.mt_lg}
              />
            )}
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={[layout.section_lg, spacing.mt_2xl]}>
              <EmptyState
                source={isCommentDisabled ? disableIllustration : undefined}
                title={isCommentDisabled ? 'Comment is disabled' : 'No reply here'}
                text={
                  isCommentDisabled
                    ? 'You cannot reply on this story'
                    : 'Be the first to reply on this story.'
                }
              />
            </View>
          )
        }
        ItemSeparatorComponent={VerticalSeparatorSmall}
        refreshControl={
          <RefreshControl onRefresh={handleOnRefresh} refreshing={isRefetching} />
        }
        data={isCommentDisabled ? [] : repliesData}
        renderItem={({ item }) => (
          <ReplyCard
            isStoryAnonymous={isAnonymous}
            storyCreatorId={creatorId}
            {...item}
          />
        )}
        contentContainerStyle={[layout.container_gutter, layout.section_lg]}
      />

      {!isCommentDisabled && (
        <>
          <BottomSheet
            modalStyle={layout.container_gutter}
            adjustToContentHeight
            bottomSheetRef={replyBottomSheet}
            headerTitle="Reply"
            headerActionType="icon"
            headerActionOnPress={closeReplyBottomSheet}
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
          <FAB
            placement="right"
            onPress={showReplyBottomSheet}
            color={theme.colors.primary}
            icon={
              <Icon
                name="add"
                type="ionicon"
                size={SIZING['4xl']}
                color={theme.colors.white}
              />
            }
          />
        </>
      )}
    </>
  );
}

export default StoryDetailScreen;
