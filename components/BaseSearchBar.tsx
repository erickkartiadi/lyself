import { SearchBar } from '@rneui/themed';
import {
  themeSpacing,
  useTheme,
} from '@rneui/themed/dist/config/ThemeProvider';
import React, { useState } from 'react';
import styles from '../theme/styles';

function BaseSearchBar() {
  const [searchText, setSearchText] = useState('');
  const { theme } = useTheme();

  const updateSearch = (text: string) => {
    setSearchText(text);
  };

  return (
    <SearchBar
      placeholder="Search tools, news or forum"
      onChangeText={updateSearch}
      containerStyle={{
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderWidth: 0,
        elevation: 0,
        ...styles.container,
      }}
      inputContainerStyle={{
        backgroundColor: theme.colors.grey5,
        borderRadius: 100,
        paddingHorizontal: themeSpacing.md,
      }}
      inputStyle={{
        fontFamily: 'Inter',
        fontSize: 14,
        color: theme.colors.black,
      }}
      value={searchText}
      searchIcon={{
        name: 'search1',
        type: 'antdesign',
        size: 20,
        color: theme.colors.grey2,
      }}
      clearIcon={{
        name: 'clear',
        type: 'material',
        size: 20,
        color: theme.colors.grey2,
      }}
    />
  );
}

export default BaseSearchBar;
