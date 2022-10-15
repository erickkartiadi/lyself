import * as React from 'react';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { IHandles } from 'react-native-modalize/lib/options';
import { Portal } from 'react-native-portalize';

import useStyles from '../../utils/hooks/useStyles';

export interface BottomSheetProps extends ModalizeProps {
  bottomSheetRef: React.RefObject<IHandles>;
}

function BottomSheet({
  children,
  bottomSheetRef,
  modalStyle,
  ...props
}: BottomSheetProps) {
  const styles = useStyles();

  return (
    <Portal>
      <Modalize
        ref={bottomSheetRef}
        closeOnOverlayTap
        handleStyle={styles.defaultBackground}
        modalStyle={[styles.defaultBackground, modalStyle]}
        {...props}
      >
        {children}
      </Modalize>
    </Portal>
  );
}

export default BottomSheet;
