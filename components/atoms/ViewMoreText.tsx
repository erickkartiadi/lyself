import * as React from 'react';
import { Text, useTheme } from '@rneui/themed';
import { useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  TextLayoutEventData,
} from 'react-native';
import colorAlpha from 'color-alpha';

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
      setLengthMore(e.nativeEvent.lines.length >= numberOfLines);
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
        <Pressable onPress={toggleNumberOfLines}>
          {({ pressed }) => (
            <Text
              style={{
                marginTop: theme.spacing.md,
                color: pressed
                  ? colorAlpha(theme.colors.primary, 0.25)
                  : theme.colors.primary,
              }}
            >
              {textShown ? 'View less' : 'View more'}
            </Text>
          )}
        </Pressable>
      ) : null}
    </>
  );
}

ViewMoreText.defaultProps = {
  numberOfLines: 4,
};

export default ViewMoreText;
