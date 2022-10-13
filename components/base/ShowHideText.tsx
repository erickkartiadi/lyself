import { Text, TextProps } from '@rneui/themed';
import * as React from 'react';
import { useCallback } from 'react';
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';

import spacing from '../../styles/spacing';
import ButtonLink from './Link';

type ShowHideTextProps = Pick<TextProps, 'numberOfLines'>;

function ShowHideText({
  numberOfLines = 4,
  children,
}: React.PropsWithChildren<ShowHideTextProps>) {
  const [isShowMore, setIsShowMore] = React.useState(false);
  const [isLengthMore, setIsLengthMore] = React.useState(false);

  const onTextLayout = useCallback((e: NativeSyntheticEvent<TextLayoutEventData>) => {
    setIsLengthMore(e.nativeEvent.lines.length > numberOfLines);
  }, []);

  const toggleIsShowMore = () => {
    setIsShowMore((prev) => !prev);
  };

  return (
    <>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={isShowMore ? undefined : numberOfLines}
      >
        {children}
      </Text>

      {isLengthMore && (
        <ButtonLink color="primary" style={spacing.mt_md} onPress={toggleIsShowMore}>
          {isShowMore ? 'View less' : 'View more'}
        </ButtonLink>
      )}
    </>
  );
}

export default ShowHideText;
