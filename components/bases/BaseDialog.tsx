import { DialogButtonProps, DialogProps } from '@rneui/base';
import { Dialog, Text, useTheme } from '@rneui/themed';
import * as React from 'react';

interface BaseDialogProps extends DialogProps {
  isDialogLoading?: boolean;
  isDialogVisible: boolean;
  toggleIsDialogVisible: (state?: boolean) => void;

  title: string;
  text: string | React.ReactNode;

  onConfirm: DialogButtonProps['onPress'];
}

function BaseDialog({
  isDialogLoading,
  isDialogVisible,
  toggleIsDialogVisible,
  title,
  onConfirm,
  text,
}: BaseDialogProps) {
  const { theme } = useTheme();

  return (
    <Dialog
      overlayStyle={{ backgroundColor: theme.colors.secondary }}
      isVisible={isDialogVisible}
      onBackdropPress={() => toggleIsDialogVisible(false)}
    >
      {isDialogLoading ? (
        <Dialog.Loading />
      ) : (
        <>
          <Dialog.Title
            title={title}
            titleProps={{
              style: {
                color: theme.colors.black,
              },
            }}
          />
          <Text small style={{ marginBottom: theme.spacing.md }}>
            {text}
          </Text>
          <Dialog.Actions>
            <Dialog.Button type="solid" title="CONFIRM" onPress={onConfirm} />
            <Dialog.Button
              title="CANCEL"
              containerStyle={{ marginRight: theme.spacing.md }}
              onPress={() => toggleIsDialogVisible(false)}
            />
          </Dialog.Actions>
        </>
      )}
    </Dialog>
  );
}

BaseDialog.defaultProps = {
  isDialogLoading: false,
};

export default BaseDialog;
