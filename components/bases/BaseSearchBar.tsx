import { SearchBar, SearchBarProps, useTheme } from '@rneui/themed';
import React, { useState } from 'react';

import { BORDER_RADIUS, styles } from '../../theme/styles';

interface BaseSearchBarProps {
  placeholder: SearchBarProps['placeholder'];
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
        {
          paddingHorizontal: 0,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderWidth: 0,
          elevation: 0,
          marginBottom: theme.spacing.xl,
        },
      ]}
      inputContainerStyle={[
        styles.shadowSmall,
        {
          backgroundColor: theme.colors.secondary,
          borderRadius: BORDER_RADIUS.rounded,
          paddingHorizontal: theme.spacing.md,
        },
      ]}
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
