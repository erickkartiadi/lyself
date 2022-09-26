import { Chip, ChipProps, Colors, useTheme } from '@rneui/themed';
import * as React from 'react';

import colorAlpha from '../../utils/colorAlpha';

interface BaseChoiceChipProps extends ChipProps {
  isSelected: boolean;
  chipColor?: keyof Colors;
}

function BaseChoiceChip({
  buttonStyle,
  isSelected,
  titleStyle,
  chipColor = 'primary',
  ...props
}: BaseChoiceChipProps) {
  const { theme } = useTheme();

  const selectedColor = theme.colors[chipColor] as string;

  return (
    <Chip
      buttonStyle={[
        {
          borderWidth: 0.5,
          borderColor: isSelected ? selectedColor : theme.colors.greyOutline,
        },
        buttonStyle,
      ]}
      titleStyle={[
        {
          color: isSelected ? selectedColor : theme.colors.black,
          paddingHorizontal: 0,
        },
        titleStyle,
      ]}
      color={colorAlpha(selectedColor, 0.25)}
      type={isSelected ? 'solid' : 'outline'}
      {...props}
    />
  );
}

BaseChoiceChip.defaultProps = {
  chipColor: 'primary',
};

export default BaseChoiceChip;
