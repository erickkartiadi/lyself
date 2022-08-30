import * as React from 'react';
import { Text, useTheme } from '@rneui/themed';
import { useCallback, useState } from 'react';
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';
import BaseLink from '../atoms/BaseLink';

interface ViewMoreTextProps {
  numberOfLines?: number;
  children: React.ReactNode;
}

function ViewMoreText({ numberOfLines = 4, children }: ViewMoreTextProps) {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const { theme } = useTheme();

  const toggleNumberOfLines = () => {
    setTextShown((prev) => !prev);
  };

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      setLengthMore(e.nativeEvent.lines.length > numberOfLines);
    },
    []
  );

  return (
    <>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : numberOfLines}
      >
        {children}
      </Text>

      {lengthMore ? (
        <BaseLink
          color="primary"
          style={{ marginTop: theme.spacing.md }}
          onPress={() => toggleNumberOfLines()}
        >
          {textShown ? 'View less' : 'View more'}
        </BaseLink>
      ) : null}
    </>
  );
}

ViewMoreText.defaultProps = {
  numberOfLines: 4,
};

export default ViewMoreText;
