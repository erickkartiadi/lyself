import { SearchBar, useTheme } from '@rneui/themed';

import React, { useState } from 'react';
import { styles } from '../theme';

interface BaseSearchBarProps {
  placeholder: string;
}

function BaseSearchBar({ placeholder }: BaseSearchBarProps) {
  const [searchText, setSearchText] = useState('');
  const { theme } = useTheme();

  const updateSearch = (text: string) => {
    setSearchText(text);
  };

  return (
    <SearchBar
      selectionColor={theme.colors.primary}
      placeholder={placeholder}
      onChangeText={updateSearch}
      containerStyle={[
        styles.container,
        {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderWidth: 0,
          elevation: 0,
          marginBottom: theme.spacing.md,
        },
      ]}
      inputContainerStyle={{
        backgroundColor: theme.colors.cardBackground,
        elevation: 1,
        borderRadius: 100,
        paddingHorizontal: theme.spacing.md,
      }}
      inputStyle={{
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
