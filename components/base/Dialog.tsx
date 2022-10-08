import {
  DialogButtonProps as RNEDialogButtonProps,
  DialogProps as RNEDialogProps,
} from '@rneui/base';
import { Dialog as RNEDialog, Text, useTheme } from '@rneui/themed';
import * as React from 'react';

import spacing from '../../theme/spacing';

interface DialogProps extends RNEDialogProps {
  isDialogLoading?: boolean;
  isDialogVisible: boolean;
  toggleIsDialogVisible: (state?: boolean) => void;
  title: string;
  text: string | React.ReactNode;
  onConfirm: RNEDialogButtonProps['onPress'];
}
// TODO redesign dialog
function Dialog({
  isDialogLoading,
  isDialogVisible,
  toggleIsDialogVisible,
  title,
  onConfirm,
  text,
}: DialogProps) {
  const { theme } = useTheme();

  const hideDialog = () => {
    toggleIsDialogVisible(false);
  };

  return (
    <RNEDialog
      overlayStyle={{ backgroundColor: theme.colors.cardBackground }}
      isVisible={isDialogVisible}
      onBackdropPress={hideDialog}
    >
      {isDialogLoading ? (
        <RNEDialog.Loading />
      ) : (
        <>
          <RNEDialog.Title
            title={title}
            titleProps={{
              style: {
                color: theme.colors.black,
              },
            }}
          />
          <Text style={spacing.mb_md}>{text}</Text>
          <RNEDialog.Actions>
            <RNEDialog.Button type="solid" title="CONFIRM" onPress={onConfirm} />
            <RNEDialog.Button
              title="CANCEL"
              containerStyle={spacing.mr_md}
              onPress={hideDialog}
            />
          </RNEDialog.Actions>
        </>
      )}
    </RNEDialog>
  );
}

Dialog.defaultProps = {
  isDialogLoading: false,
};

export default Dialog;
