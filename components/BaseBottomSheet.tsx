import { BottomSheet, BottomSheetProps, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styles } from '../theme';

interface BaseBottomSheetProps {
  headerTitle?: string;
  children: React.ReactNode;
  wrapperStyle: StyleProp<ViewStyle>;
}

function BaseBottomSheet({
  headerTitle,
  children,
  wrapperStyle,
  ...props
}: BaseBottomSheetProps & BottomSheetProps) {
  const { theme } = useTheme();

  return (
    <BottomSheet {...props}>
      <View
        style={[
          styles.container,
          {
            borderTopStartRadius: theme.spacing.xl,
            borderTopEndRadius: theme.spacing.xl,
            backgroundColor: theme.colors.cardBackground,
            paddingVertical: theme.spacing.xl,
          },
          wrapperStyle,
        ]}
      >
        {headerTitle && (
          <Text
            subtitle1
            bold
            style={{
              marginVertical: theme.spacing.xs,
            }}
          >
            {headerTitle}
          </Text>
        )}

        {children}
      </View>
    </BottomSheet>
  );
}

BaseBottomSheet.defaultProps = {
  headerTitle: null,
};

export default BaseBottomSheet;
