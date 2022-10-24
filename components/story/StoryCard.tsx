import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Text, useTheme } from '@rneui/themed';
import React, { memo, useContext, useRef } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

import { StoryScreenNavigationProps } from '../../navigation/navigation.types';
import { useFindCategory } from '../../services/api/stories/categories/categories.hooks';
import { useFindUser } from '../../services/api/user/users.hooks';
import border from '../../styles/border';
import layout from '../../styles/layout';
import { width } from '../../styles/size';
import spacing from '../../styles/spacing';
import { text } from '../../styles/typhography';
import { SIZING } from '../../theme/theme';
import { Story } from '../../types/types';
import { AuthContext } from '../../utils/context/AuthContext';
import { formatTimeAgo } from '../../utils/formatTime';
import useStyles from '../../utils/hooks/useStyles';
import Avatar from '../base/Avatar';
import Card from '../base/Card';
import { HorizontalSeparator } from '../layout/ItemSeparator';
import SaveButton from './SaveButton';
import StoryActionBottomSheet from './StoryActionBottomSheet';
import UpvoteButton from './UpvoteButton';

interface StoryCardProps extends Story {
  isOnDetailScreen?: boolean;
}

// TODO press image to zoom
function StoryCard({ isOnDetailScreen, ...props }: StoryCardProps) {
  const { isAnonymous, imageUri, content, createdAt, title, creatorId, categoryId, id } =
    props;
  const { theme } = useTheme();
  const styles = useStyles();
  const navigation = useNavigation<StoryScreenNavigationProps['navigation']>();
  const { user } = useContext(AuthContext);

  const { data: creatorData } = useFindUser(creatorId);
  const { data: categoryData } = useFindCategory(categoryId);

  const handleNavigateToDetail = () => {
    navigation.navigate('StoryStack', {
      screen: 'StoryDetail',
      params: props,
    });
  };

  const isCurrentUserStory = creatorId === user?.uid;

  const textStyle =
    isCurrentUserStory && !isAnonymous ? styles.textPrimary : styles.textBlack;

  let displayName = isCurrentUserStory ? 'You' : creatorData?.displayName;
  displayName = isAnonymous ? 'Anonymous' : displayName;

  const bottomSheetRef = useRef<Modalize>(null);
  const showBottomSheet = () => bottomSheetRef.current?.open();

  return (
    <>
      <Card>
        {/* TODO go to user profile */}

        <View style={[layout.flex_dir_row, layout.align_center, spacing.mb_sm]}>
          <Avatar
            size={SIZING['5xl']}
            containerStyle={[spacing.mr_lg]}
            rounded
            avatarUrl={isAnonymous ? null : creatorData?.photoURL}
          />
          <View>
            <Text subtitle3 style={textStyle}>
              {displayName}
            </Text>
            <View style={[layout.flex_dir_row, layout.align_center]}>
              <Text caption style={styles.textGrey}>
                {formatTimeAgo(createdAt.toDate())}
              </Text>
              <Icon
                type="entypo"
                size={SIZING.xl}
                name="dot-single"
                color={theme.colors.grey3}
              />
              <Text
                caption
                style={[
                  styles.textGrey,
                  categoryData?.name !== categoryData?.nameShort
                    ? text.uppercase
                    : text.capitalize,
                ]}
              >
                {categoryData?.nameShort}
              </Text>
            </View>
          </View>
          <View style={layout.flex} />
          {isCurrentUserStory && (
            <View style={[layout.flex_dir_row]}>
              <Icon
                onPress={showBottomSheet}
                color={theme.colors.grey3}
                name="dots-vertical"
                type="material-community"
                size={SIZING['3xl']}
                containerStyle={border.rounded}
              />
            </View>
          )}
        </View>
        {imageUri && (
          <View style={layout.section_sm}>
            <Image
              style={[
                layout.ratio_wide,
                width.w_100,
                layout.flex,
                border.radius_xl,
                border.width_sm,
                styles.borderGrey5,
              ]}
              source={{ uri: imageUri }}
            />
          </View>
        )}
        <TouchableOpacity
          disabled={isOnDetailScreen}
          onPress={handleNavigateToDetail}
          style={layout.section_sm}
        >
          <Text numberOfLines={2} subtitle style={spacing.mb_xs}>
            {title}
          </Text>
          {content && (
            <Text small numberOfLines={isOnDetailScreen ? undefined : 3}>
              {content}
            </Text>
          )}
        </TouchableOpacity>

        <View
          style={[
            layout.flex_dir_row,
            layout.justify_between,
            layout.align_center,
            spacing.mt_sm,
          ]}
        >
          <View style={[layout.flex_dir_row]}>
            <UpvoteButton type="story" id={id} />
            <HorizontalSeparator />
            <SaveButton id={id} />
            {!isOnDetailScreen && (
              <>
                <HorizontalSeparator />
                <TouchableOpacity
                  onPress={handleNavigateToDetail}
                  style={[layout.flex_dir_row, layout.align_center]}
                >
                  <Icon
                    color={theme.colors.grey3}
                    name="chatbubble-ellipses-outline"
                    type="ionicon"
                    size={SIZING['3xl']}
                    containerStyle={spacing.mr_sm}
                  />
                  <Text small style={styles.textGrey}>
                    Reply
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Card>

      <StoryActionBottomSheet {...props} bottomSheetRef={bottomSheetRef} />
    </>
  );
}

StoryCard.defaultProps = {
  isOnDetailScreen: false,
};

export default memo(StoryCard);
