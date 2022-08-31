import { Icon, IconProps, Text, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import * as React from 'react';
import { View } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';

interface LabelProps {
  showIcon?: boolean;
  color?: string;
  iconName?: IconProps['name'];
  iconType?: IconProps['type'];
  iconSize?: IconProps['size'];
  children: React.ReactNode;
  labelSize?: 'sm' | 'md';
}
function BaseLabel({
  showIcon,
  iconName = 'help',
  iconType = 'ionicon',
  color,
  children,
  iconSize,
  labelSize = 'md',
}: LabelProps) {
  const { theme } = useTheme();

  const labelColor = color || theme.colors.grey4;
  const labelBackgroundColor = colorAlpha(labelColor, 0.25);

  return (
    <View
      style={{
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
          style={{ marginRight: theme.spacing.sm, marginTop: theme.spacing.xs }}
        />
      )}
      <Text subtitle2>{children}</Text>
    </View>
  );
}

BaseLabel.defaultProps = {
  showIcon: false,
  color: null,
  iconName: 'help',
  iconType: 'ionicon',
  iconSize: 16,
  labelSize: 'md',
};

export default BaseLabel;
