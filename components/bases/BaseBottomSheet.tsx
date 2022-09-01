import { BottomSheet, BottomSheetProps, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { styles } from '../../theme/styles';

interface BaseBottomSheetProps extends BottomSheetProps {
  headerTitle: string;
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
            borderTopStartRadius: theme.spacing.xl,
            borderTopEndRadius: theme.spacing.xl,
            backgroundColor: theme.colors.cardBackground,
            paddingVertical: theme.spacing.xl,
          },
          containerStyle,
        ]}
      >
        {headerTitle && (
          <Text
            h4
            h4Style={{
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
  containerStyle: {},
};

export default BaseBottomSheet;
