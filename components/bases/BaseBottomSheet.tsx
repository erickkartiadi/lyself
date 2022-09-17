import { BottomSheet, BottomSheetProps, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { styles } from '../../theme/styles';

export interface BaseBottomSheetProps extends BottomSheetProps, React.PropsWithChildren {
  headerTitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
  toggleBottomSheetVisible: (state?: boolean) => void;
}

function BaseBottomSheet({
  headerTitle,
  children,
  containerStyle,
  toggleBottomSheetVisible,
  ...rest
}: BaseBottomSheetProps) {
  const { theme } = useTheme();

  return (
    <BottomSheet {...rest}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background,
            paddingTop: theme.spacing.md,
            paddingBottom: theme.spacing.xl,
          },
          containerStyle,
        ]}
      >
        {headerTitle !== '' && (
          <Text
            subtitle
            style={{
              marginTop: theme.spacing.md,
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
  headerTitle: '',
  containerStyle: {},
};

export default BaseBottomSheet;
