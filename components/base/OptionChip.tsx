import { Chip, ChipProps, Colors, useTheme } from '@rneui/themed';
import * as React from 'react';

import border from '../../styles/border';
import spacing from '../../styles/spacing';

interface OptionChipProps extends ChipProps {
  isSelected: boolean;
  chipColor?: keyof Colors;
}

function OptionChip({
  buttonStyle,
  isSelected,
  titleStyle,
  chipColor = 'primary',
  ...props
}: OptionChipProps) {
  const { theme } = useTheme();

  const selectedColor = theme.colors[chipColor] as string;

  return (
    <Chip
      buttonStyle={[border.width_0, buttonStyle]}
      titleStyle={[
        spacing.px_0,
        {
          color: isSelected ? theme.colors.white : theme.colors.black,
        },
        titleStyle,
      ]}
      color={isSelected ? selectedColor : theme.colors.secondary}
      {...props}
    />
  );
}

OptionChip.defaultProps = {
  chipColor: 'primary',
};

export default OptionChip;
