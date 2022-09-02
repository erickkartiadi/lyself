import { BottomSheet, BottomSheetProps, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { styles } from '../../theme/styles';

interface BaseBottomSheetProps extends BottomSheetProps {
  headerTitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

function BaseBottomSheet({
  headerTitle,
  children,
  containerStyle,
  ...rest
}: React.PropsWithChildren<BaseBottomSheetProps>) {
  const { theme } = useTheme();

  return (
    <BottomSheet {...rest}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.cardBackground,
            paddingTop: theme.spacing.md,
            paddingBottom: theme.spacing.xl,
          },
          containerStyle,
        ]}
      >
        {headerTitle !== '' && (
          <Text
            subtitle1
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
