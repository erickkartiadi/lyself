import { BottomSheet, BottomSheetProps, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { styles } from '../theme';

interface BaseBottomSheetProps {
  headerTitle?: string;
}

function BaseBottomSheet({
  headerTitle,
  children,
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
