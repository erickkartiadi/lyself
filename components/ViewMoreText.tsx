import { Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { useCallback } from 'react';
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';

import useToggle from '../utils/hooks/useToggle';
import BaseLink from './bases/BaseLink';

interface ViewMoreTextProps {
  numberOfLines?: number;
  children: React.ReactNode;
}

function ViewMoreText({ numberOfLines = 4, children }: ViewMoreTextProps) {
  const [isShowMore, toggleIsShowMore] = useToggle(false);
  const [isLengthMore, toggleIsLengthMore] = useToggle(false);
  const { theme } = useTheme();

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      toggleIsLengthMore(e.nativeEvent.lines.length > numberOfLines);
    },
    []
  );

  return (
    <>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={isShowMore ? undefined : numberOfLines}
      >
        {children}
      </Text>

      {isLengthMore ? (
        <BaseLink
          color="primary"
          style={{ marginTop: theme.spacing.md }}
          onPress={() => toggleIsShowMore()}
        >
          {isShowMore ? 'View less' : 'View more'}
        </BaseLink>
      ) : null}
    </>
  );
}

ViewMoreText.defaultProps = {
  numberOfLines: 4,
};

export default ViewMoreText;
