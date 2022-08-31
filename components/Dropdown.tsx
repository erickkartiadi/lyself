import { Icon, useTheme } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import { ThemeModeContext } from '../theme/ThemeModeContext';

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
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ]);
  const { theme } = useTheme();
  const { isDarkMode } = useContext(ThemeModeContext);

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
        backgroundColor: isDarkMode ? theme.colors.grey2 : theme.colors.grey5,
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
        color: theme.colors.grey2,
        textAlign: 'right',
        fontWeight: 'normal',
      }}
      listItemLabelStyle={{
        textAlign: 'left',
        color: isDarkMode ? theme.colors.grey5 : theme.colors.grey1,
        fontWeight: 'normal',
      }}
      dropDownContainerStyle={{
        width: 110,
        alignSelf: 'flex-end',
        borderWidth: isDarkMode ? 0 : 0.5,
        backgroundColor: isDarkMode ? theme.colors.grey1 : theme.colors.white,
        borderColor: theme.colors.greyOutline,
        marginTop: theme.spacing.lg * -1,
        borderTopLeftRadius: theme.spacing.md,
        borderTopRightRadius: theme.spacing.md,
        borderBottomLeftRadius: theme.spacing.md,
        borderBottomRightRadius: theme.spacing.md,
      }}
    />
  );
}

export default Dropdown;
