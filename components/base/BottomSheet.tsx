import { Icon, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { IHandles } from 'react-native-modalize/lib/options';
import { Portal } from 'react-native-portalize';

import border from '../../styles/border';
import layout from '../../styles/layout';
import useStyles from '../../utils/hooks/useStyles';
import ButtonLink, { ButtonLinkProps } from './Link';

export interface BottomSheetProps extends ModalizeProps {
  bottomSheetRef: React.RefObject<IHandles>;
  showHeader?: boolean;
  headerTitle?: string;
  headerActionTitle?: string;
  headerActionType?: 'icon' | 'button';
  headerActionOnPress?: ButtonLinkProps['onPress'];
}

function BottomSheet({
  children,
  bottomSheetRef,
  modalStyle,
  showHeader,
  headerTitle,
  headerActionTitle,
  headerActionOnPress,
  headerActionType,
  ...props
}: BottomSheetProps) {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <Portal>
      <Modalize
        closeOnOverlayTap
        ref={bottomSheetRef}
        handleStyle={styles.defaultBackground}
        modalStyle={[styles.defaultBackground, modalStyle]}
        HeaderComponent={
          showHeader ? (
            <View
              style={[
                layout.flex_dir_row,
                layout.align_center,
                layout.justify_between,
                layout.section_lg,
              ]}
            >
              <Text h4>{headerTitle}</Text>
              {headerActionType === 'icon' ? (
                <Icon
                  name="close"
                  containerStyle={border.rounded}
                  color={theme.colors.grey3}
                  onPress={headerActionOnPress}
                />
              ) : (
                <ButtonLink color="primary" onPress={headerActionOnPress}>
                  {headerActionTitle}
                </ButtonLink>
              )}
            </View>
          ) : undefined
        }
        {...props}
      >
        {children}
      </Modalize>
    </Portal>
  );
}

BottomSheet.defaultProps = {
  showHeader: true,
  headerTitle: 'Title',
  headerActionTitle: 'Cancel',
  headerActionOnPress: () => {},
  headerActionType: 'button',
};

export default BottomSheet;
