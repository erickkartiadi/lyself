import {
  Chip as RNEChip,
  ChipProps as RNEChipProps,
  Colors,
  useTheme,
} from '@rneui/themed';
import colorAlpha from 'color-alpha';
import * as React from 'react';

interface ChipProps extends RNEChipProps {
  chipColor?: keyof Colors;
  isActive?: boolean;
}

function Chip({ isActive, chipColor = 'grey3', ...props }: ChipProps) {
  const { theme } = useTheme();

  const selectedColor = theme.colors[chipColor] as string;
  const titleColor = isActive ? theme.colors.white : selectedColor;
  const alphaColor = isActive ? selectedColor : colorAlpha(selectedColor, 0.15);

  return (
    <RNEChip
      color={alphaColor}
      titleStyle={{
        color: titleColor,
      }}
      radius="xs"
      {...props}
    />
  );
}

Chip.defaultProps = {
  chipColor: 'grey3',
  isActive: false,
};

export default Chip;
