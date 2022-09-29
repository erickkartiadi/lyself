import { Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import {
  Dimensions,
  NativeSyntheticEvent,
  TextLayoutEventData,
  View,
} from 'react-native';

import { Review } from '../../types/types';
import Avatar from '../base/Avatar';
import Card from '../base/Card';

const NUMBER_OF_LINES = 3;

function ReviewCard({ uri, name, review, time }: Review) {
  const { theme } = useTheme();
  const [isShowMore, setIsShowMore] = React.useState(false);
  const [isLengthMore, setIsLengthMore] = React.useState(false);

  const onTextLayout = React.useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      setIsLengthMore(e.nativeEvent.lines.length > NUMBER_OF_LINES);
    },
    []
  );

  const toggleShowMore = () => {
    setIsShowMore((prev) => !prev);
  };

  return (
    <Card
      enablePressAnimation={isLengthMore}
      onPress={toggleShowMore}
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
            source={{ uri }}
          />
          <View style={{ flex: 1 }}>
            <Text subtitle3>{name}</Text>
            <Text small color={theme.colors.grey3}>
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
    </Card>
  );
}

export default ReviewCard;
