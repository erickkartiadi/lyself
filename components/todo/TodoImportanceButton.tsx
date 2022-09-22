import { Button, ButtonProps, useTheme } from '@rneui/themed';
import * as React from 'react';

import { TodoImportance } from '../../types/types';
import { TODO_IMPORTANCE_COLORS } from '../../utils/constant/constant';

interface TodoImportanceButtonProps {
  onPress: ButtonProps['onPress'];
  importanceLevel: TodoImportance;
  currentImportanceLevel: TodoImportance;
}

function TodoImportanceButton({
  onPress,
  importanceLevel,
  currentImportanceLevel,
}: TodoImportanceButtonProps) {
  const { theme } = useTheme();

  const isSelected = currentImportanceLevel === importanceLevel;

  const importanceColor = theme.colors[TODO_IMPORTANCE_COLORS[importanceLevel]] as string;
  const backgroundColor = isSelected ? importanceColor : theme.colors.cardBackground;

  const textColor = isSelected ? theme.colors.white : theme.colors.black;

  return (
    <Button
      buttonStyle={{
        backgroundColor,
      }}
      containerStyle={{ marginRight: theme.spacing.md }}
      titleStyle={{
        color: textColor,
      }}
      radius="sm"
      onPress={onPress}
    >
      {importanceLevel}
    </Button>
  );
}

export default TodoImportanceButton;
