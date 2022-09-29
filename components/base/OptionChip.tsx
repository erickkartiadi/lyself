import { Chip, ChipProps, Colors, useTheme } from '@rneui/themed';
import * as React from 'react';

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
      buttonStyle={[
        {
          borderWidth: 0,
        },
        buttonStyle,
      ]}
      titleStyle={[
        {
          color: isSelected ? theme.colors.white : theme.colors.black,
          paddingHorizontal: 0,
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
