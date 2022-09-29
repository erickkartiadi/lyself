import { useTheme } from '@rneui/themed';
import * as React from 'react';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { IHandles } from 'react-native-modalize/lib/options';
import { Portal } from 'react-native-portalize';

export interface BottomSheetProps extends ModalizeProps {
  bottomSheetRef: React.RefObject<IHandles>;
}

function BottomSheet({
  children,
  bottomSheetRef,
  modalStyle,
  ...props
}: BottomSheetProps) {
  const { theme } = useTheme();

  return (
    <Portal>
      <Modalize
        ref={bottomSheetRef}
        closeOnOverlayTap
        adjustToContentHeight
        handleStyle={{ backgroundColor: theme.colors.background }}
        modalStyle={[{ backgroundColor: theme.colors.background }, modalStyle]}
        {...props}
      >
        {children}
      </Modalize>
    </Portal>
  );
}

export default BottomSheet;
