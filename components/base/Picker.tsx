import { Icon, IconProps, useTheme } from '@rneui/themed';
import * as React from 'react';
import { FlexStyle, View } from 'react-native';
import DropDownPicker, {
  DropDownPickerProps,
  ValueType,
} from 'react-native-dropdown-picker';

import appStyles from '../../theme/appStyles';
import { BORDER_RADIUS, FONT } from '../../theme/theme';
import { ThemeModeContext } from '../../utils/context/ThemeModeContext';

type PickerProps = {
  upIconName: IconProps['name'];
  downIconName: IconProps['name'];
  iconSize: IconProps['size'];
  iconType: IconProps['type'];
  dropdownWidth: FlexStyle['width'];
};

function Picker({
  upIconName,
  downIconName,
  iconType,
  iconSize,
  dropdownWidth,
  ...props
}: PickerProps & DropDownPickerProps<ValueType>) {
  const { isDarkMode } = React.useContext(ThemeModeContext);
  const { theme } = useTheme();

  // update theme color if theme mode changed
  const backgroundColor = theme.colors.background;
  const borderColor = isDarkMode ? theme.colors.greyOutline : theme.colors.greyOutline;
  const textColor = isDarkMode ? theme.colors.black : theme.colors.black;

  const upIcon = () => (
    <Icon name={upIconName} size={iconSize} type={iconType} color={textColor} />
  );
  const downIcon = () => (
    <Icon name={downIconName} size={iconSize} type={iconType} color={textColor} />
  );

  return (
    <View style={appStyles.flex}>
      <DropDownPicker
        listMode="SCROLLVIEW"
        dropDownContainerStyle={[
          appStyles.shadowMedium,
          appStyles.alignSelfEnd,
          {
            borderWidth: 0.25,
            borderColor,
            backgroundColor,

            marginTop: theme.spacing.md * -1,

            borderTopEndRadius: BORDER_RADIUS.sm,
            borderTopStartRadius: BORDER_RADIUS.sm,
            borderBottomEndRadius: BORDER_RADIUS.sm,
            borderBottomStartRadius: BORDER_RADIUS.sm,

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
        {...props}
      />
    </View>
  );
}

export default Picker;