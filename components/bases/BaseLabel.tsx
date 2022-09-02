import {
  Icon,
  IconProps,
  lightColors,
  Text,
  ThemeSpacing,
  useTheme,
} from '@rneui/themed';
import colorAlpha from 'color-alpha';
import * as React from 'react';
import { View } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';

interface LabelProps {
  showIcon?: boolean;
  color?: string;
  labelSize?: keyof ThemeSpacing;
  iconName?: IconProps['name'];
  iconType?: IconProps['type'];
  iconSize?: IconProps['size'];
}

function BaseLabel({
  children,
  showIcon,
  iconType,
  iconSize,
  color,
  labelSize = 'md',
  iconName = 'help',
}: React.PropsWithChildren<LabelProps>) {
  const { theme } = useTheme();

  const labelColor = color || theme.colors.cardBackground;
  const labelBackgroundColor = color
    ? colorAlpha(labelColor, 0.25)
    : theme.colors.cardBackground;

  return (
    <View
      style={{
        ...(!color && {
          shadowColor: colorAlpha(lightColors.black, 0.25),
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,

          elevation: 1,
        }),

        backgroundColor: labelBackgroundColor,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing[labelSize],
        borderRadius: BORDER_RADIUS.rounded,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: theme.spacing.md,
        marginTop: theme.spacing.md,
      }}
    >
      {showIcon && (
        <Icon
          name={iconName}
          type={iconType}
          size={iconSize}
          color={labelColor}
          style={{ marginRight: theme.spacing.sm }}
        />
      )}
      <Text subtitle2>{children}</Text>
    </View>
  );
}

BaseLabel.defaultProps = {
  color: null,
  showIcon: false,
  iconSize: 16,
  iconName: 'help',
  iconType: 'ionicon',
  labelSize: 'md',
};

export default BaseLabel;
