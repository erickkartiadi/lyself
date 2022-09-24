import { useTheme } from '@rneui/themed';
import * as React from 'react';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { IHandles } from 'react-native-modalize/lib/options';
import { Portal } from 'react-native-portalize';

import colorAlpha from '../../utils/colorAlpha';

export interface BaseBottomSheetProps extends ModalizeProps {
  bottomSheetRef: React.RefObject<IHandles>;
}

function BaseBottomSheet({
  children,
  bottomSheetRef,
  modalStyle,
  ...rest
}: BaseBottomSheetProps) {
  const { theme } = useTheme();

  return (
    <Portal>
      <Modalize
        ref={bottomSheetRef}
        closeOnOverlayTap
        adjustToContentHeight
        overlayStyle={{ backgroundColor: colorAlpha(theme.colors.grey3, 0.5) }}
        handleStyle={{ backgroundColor: theme.colors.background }}
        modalStyle={[{ backgroundColor: theme.colors.background }, modalStyle]}
        {...rest}
      >
        {children}
      </Modalize>
    </Portal>
  );
}

export default BaseBottomSheet;
