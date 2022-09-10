import { Icon, IconProps, useTheme } from '@rneui/themed';
import * as React from 'react';
import { FlexStyle, View } from 'react-native';
import DropDownPicker, {
  DropDownPickerProps,
  ValueType,
} from 'react-native-dropdown-picker';

import { BORDER_RADIUS, FONT, styles } from '../../theme/styles';
import { ThemeModeContext } from '../../theme/ThemeModeContext';

type BasePickerProps = {
  upIconName: IconProps['name'];
  downIconName: IconProps['name'];
  iconSize: IconProps['size'];
  iconType: IconProps['type'];
  dropdownWidth: FlexStyle['width'];
};

function BasePicker({
  upIconName,
  downIconName,
  iconType,
  iconSize,
  dropdownWidth,
  ...rest
}: BasePickerProps & DropDownPickerProps<ValueType>) {
  const { isDarkMode } = React.useContext(ThemeModeContext);
  const { theme } = useTheme();

  // update theme color if theme mode changed
  const backgroundColor = isDarkMode
    ? theme.colors.cardBackground
    : theme.colors.cardBackground;
  const borderColor = isDarkMode ? theme.colors.greyOutline : theme.colors.greyOutline;
  const textColor = isDarkMode ? theme.colors.black : theme.colors.black;

  const upIcon = () => (
    <Icon name={upIconName} size={iconSize} type={iconType} color={textColor} />
  );
  const downIcon = () => (
    <Icon name={downIconName} size={iconSize} type={iconType} color={textColor} />
  );

  return (
    <View style={{ flex: 1 }}>
      <DropDownPicker
        {...rest}
        listMode="SCROLLVIEW"
        dropDownContainerStyle={[
          styles.shadowMedium,
          {
            borderWidth: 0.25,
            borderColor,
            backgroundColor,

            marginTop: theme.spacing.md * -1,

            borderTopEndRadius: BORDER_RADIUS.sm,
            borderTopStartRadius: BORDER_RADIUS.sm,
            borderBottomEndRadius: BORDER_RADIUS.sm,
            borderBottomStartRadius: BORDER_RADIUS.sm,

            alignSelf: 'flex-end',
            width: dropdownWidth,
          },
        ]}
        style={{
          backgroundColor: 'transparent',
          borderWidth: 0,
          marginVertical: theme.spacing.md * -1,
        }}
        textStyle={[
          FONT.small,
          {
            color: textColor,
          },
        ]}
        labelStyle={{
          textAlign: 'right',
          textTransform: 'capitalize',
          margin: 0,
        }}
        ArrowUpIconComponent={upIcon}
        ArrowDownIconComponent={downIcon}
        iconContainerStyle={{ display: 'none' }}
        listItemLabelStyle={{ textTransform: 'capitalize' }}
        selectedItemLabelStyle={{ color: theme.colors.primary }}
        showTickIcon={false}
      />
    </View>
  );
}

export default BasePicker;
