import { Icon } from '@rneui/themed';
import {
  themeSpacing,
  useTheme,
  useThemeMode,
} from '@rneui/themed/dist/config/ThemeProvider';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

function ArrowDownIcon() {
  const { theme } = useTheme();
  return (
    <Icon name="chevron-small-down" type="entypo" color={theme.colors.grey1} />
  );
}
function ArrowUpIcon() {
  const { theme } = useTheme();
  return (
    <Icon name="chevron-small-up" type="entypo" color={theme.colors.grey1} />
  );
}

function Dropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('weekly');
  const [items, setItems] = useState([
    { label: 'Monthly', value: 'monthly' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Daily', value: 'daily' },
  ]);
  const { mode } = useThemeMode();
  const { theme } = useTheme();

  return (
    <DropDownPicker
      mode="SIMPLE"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      listMode="SCROLLVIEW"
      hideSelectedItemIcon
      showTickIcon={false}
      disableBorderRadius={false}
      ArrowDownIconComponent={ArrowDownIcon}
      ArrowUpIconComponent={ArrowUpIcon}
      selectedItemContainerStyle={{
        backgroundColor:
          mode === 'light' ? theme.colors.grey5 : theme.colors.grey2,
      }}
      selectedItemLabelStyle={{
        fontWeight: 'bold',
      }}
      style={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        alignItems: 'flex-start',
        width: 120,
        height: 30,
      }}
      textStyle={{
        fontFamily: 'Inter-Medium',
        color: theme.colors.grey2,
        textAlign: 'right',
        fontWeight: 'normal',
      }}
      listItemLabelStyle={{
        textAlign: 'left',
        color: mode === 'light' ? theme.colors.grey1 : theme.colors.grey5,
        fontWeight: 'normal',
      }}
      dropDownContainerStyle={{
        width: 110,
        alignSelf: 'flex-end',
        borderWidth: mode === 'light' ? 0.5 : 0,
        backgroundColor:
          mode === 'light' ? theme.colors.white : theme.colors.grey1,
        borderColor: theme.colors.greyOutline,
        marginTop: themeSpacing.lg * -1,
        borderTopLeftRadius: themeSpacing.md,
        borderTopRightRadius: themeSpacing.md,
        borderBottomLeftRadius: themeSpacing.md,
        borderBottomRightRadius: themeSpacing.md,
      }}
    />
  );
}

export default Dropdown;
