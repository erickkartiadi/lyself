import { Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import {
  Dimensions,
  NativeSyntheticEvent,
  TextLayoutEventData,
  View,
} from 'react-native';

import { Review } from '../../types/types';
import useToggle from '../../utils/hooks/useToggle';
import BaseAvatar from '../bases/BaseAvatar';
import BaseCard from '../bases/BaseCard';

const NUMBER_OF_LINES = 3;

function ReviewCard({ uri, name, review, time }: Review) {
  const { theme } = useTheme();
  const [isShowMore, toggleIsShowMore] = useToggle(false);
  const [isLengthMore, toggleIsLengthMore] = useToggle(false);

  const onTextLayout = React.useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      toggleIsLengthMore(e.nativeEvent.lines.length > NUMBER_OF_LINES);
    },
    []
  );

  return (
    <BaseCard
      enablePressAnimation={isLengthMore}
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
          <BaseAvatar
            rounded
            containerStyle={{ marginRight: theme.spacing.lg }}
            size={2}
            source={{ uri }}
          />
          <View style={{ flex: 1 }}>
            <Text small style={{ fontFamily: 'Inter-Medium' }}>
              {name}
            </Text>
            <Text caption style={{ color: theme.colors.grey3 }}>
              {time}
            </Text>
          </View>
        </View>
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={isShowMore ? undefined : NUMBER_OF_LINES}
          small
        >
          {review}
        </Text>
      </View>
    </BaseCard>
  );
}

export default ReviewCard;