import { DialogButtonProps, DialogProps as RNEDialogProps } from '@rneui/base';
import { Dialog as RNEDialog, Text } from '@rneui/themed';
import * as React from 'react';

import useStyles from '../../utils/hooks/useStyles';

interface DialogProps extends RNEDialogProps {
  isLoading?: boolean;
  buttonTitle1: DialogButtonProps['title'];
  buttonTitle2: DialogButtonProps['title'];
  buttonOnPress1: DialogButtonProps['onPress'];
  buttonOnPress2: DialogButtonProps['onPress'];
  title: string;
  content: string;
}
function Dialog({
  isLoading,
  buttonTitle1,
  buttonTitle2,
  buttonOnPress1,
  buttonOnPress2,
  title,
  content,
  ...props
}: DialogProps) {
  const styles = useStyles();

  return (
    <RNEDialog overlayStyle={styles.cardBackground} {...props}>
      {isLoading ? (
        <RNEDialog.Loading />
      ) : (
        <>
          <RNEDialog.Title title={title} titleStyle={styles.textBlack} />
          <Text style={styles.textGreyDarker}>{content}</Text>
          <RNEDialog.Actions>
            <RNEDialog.Button onPress={buttonOnPress1} title={buttonTitle1} />
            <RNEDialog.Button onPress={buttonOnPress2} title={buttonTitle2} />
          </RNEDialog.Actions>
        </>
      )}
    </RNEDialog>
  );
}

Dialog.defaultProps = {
  isLoading: false,
};

export default Dialog;
