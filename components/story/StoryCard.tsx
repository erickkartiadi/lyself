import { useNavigation } from '@react-navigation/native';
import { Icon, Text, useTheme } from '@rneui/themed';
import React, { memo, useContext } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { StoryScreenNavigationProps } from '../../navigation/navigation.types';
import { useFindCategory } from '../../services/api/stories/categories/categories.hooks';
import useGetUser from '../../services/api/user/users.hooks';
import layout from '../../styles/layout';
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
import UpvoteButton from './UpvoteButton';

interface StoryCardProps extends Story {
  isOnDetailScreen?: boolean;
}

function StoryCard({ isOnDetailScreen, ...props }: StoryCardProps) {
  const { isAnonymous, content, createdAt, title, creatorId, categoryId, id } = props;
  const { theme } = useTheme();
  const styles = useStyles();
  const navigation = useNavigation<StoryScreenNavigationProps['navigation']>();
  const { user } = useContext(AuthContext);

  const { data: creatorData } = useGetUser(creatorId);
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

  const borderStyle =
    !isOnDetailScreen && isCurrentUserStory && !isAnonymous
      ? styles.borderPrimary
      : styles.borderGrey5;

  return (
    <Card cardStyle={[borderStyle]}>
      <TouchableOpacity disabled={isOnDetailScreen} onPress={handleNavigateToDetail}>
        {/* TODO go to user profile */}
        <View style={[layout.flex_dir_row, layout.justify_between, layout.align_center]}>
          <View style={[layout.flex_dir_row, layout.align_center]}>
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
          </View>
        </View>
        <View style={spacing.my_xl}>
          <Text numberOfLines={3} subtitle style={spacing.mb_xs}>
            {title}
          </Text>
          {content && (
            <Text small numberOfLines={isOnDetailScreen ? undefined : 3}>
              {content}
            </Text>
          )}
        </View>
        <View style={[layout.flex_dir_row, layout.justify_start]}>
          <UpvoteButton type="story" id={id} />
          <HorizontalSeparator />
          {!isOnDetailScreen && (
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
          )}
        </View>
      </TouchableOpacity>
    </Card>
  );
}

StoryCard.defaultProps = {
  isOnDetailScreen: false,
};

export default memo(StoryCard);
