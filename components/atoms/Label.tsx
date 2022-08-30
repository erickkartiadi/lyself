import * as React from 'react';
import { View } from 'react-native';
import { Icon, IconProps, Text, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import { BORDER_RADIUS } from '../../theme/styles';

interface LabelProps {
  showIcon?: boolean;
  color?: string;
  name?: IconProps['name'];
  type?: IconProps['type'];
  size?: IconProps['size'];
  children?: React.ReactNode;
  labelSize?: 'sm' | 'md';
}
function Label({
  showIcon,
  name,
  type,
  color,
  children,
  size,
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
          name={name || 'help'}
          type={type || 'ionicon'}
          size={size}
          color={labelColor}
          style={{ marginRight: theme.spacing.sm, marginTop: theme.spacing.xs }}
        />
      )}
      <Text subtitle2>{children}</Text>
    </View>
  );
}

Label.defaultProps = {
  showIcon: false,
  color: null,
  children: null,
  name: null,
  type: null,
  size: 16,
  labelSize: 'md',
};

export default Label;
