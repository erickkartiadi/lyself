import * as React from 'react';
import {
  Dimensions,
  NativeSyntheticEvent,
  TextLayoutEventData,
  View,
} from 'react-native';
import { Avatar, Text, useTheme } from '@rneui/themed';
import BaseCard from '../atoms/BaseCard';
import useToggle from '../../utils/hooks/useToggle';

export interface ReviewCardProps {
  uri: string;
  name: string;
  review: string;
  time: string;
}

function ReviewCard({ uri, name, review, time }: ReviewCardProps) {
  const numberOfLines = 3;

  const { theme } = useTheme();
  const [isShowMore, toggleIsShowMore] = useToggle(false);
  const [isLengthMore, toggleIsLengthMore] = useToggle(false);

  const onTextLayout = React.useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      toggleIsLengthMore(e.nativeEvent.lines.length > numberOfLines);
    },
    []
  );

  return (
    <BaseCard
      disablePressAnimation={!isLengthMore}
      onPress={() => toggleIsShowMore()}
      width={Dimensions.get('screen').width / 1.25}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.lg,
          }}
        >
          <Avatar
            rounded
            containerStyle={{ marginRight: theme.spacing.lg }}
            size={36}
            source={{ uri }}
          />
          <View style={{ flex: 1 }}>
            <Text subtitle2 style={{ fontFamily: 'Inter-Medium' }}>
              {name}
            </Text>
            <Text caption style={{ color: theme.colors.grey3 }}>
              {time}
            </Text>
          </View>
        </View>
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={isShowMore ? undefined : numberOfLines}
          small
        >
          {review}
        </Text>
      </View>
    </BaseCard>
  );
}

export default ReviewCard;
