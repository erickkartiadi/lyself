import { SearchBar, SearchBarProps, useTheme } from '@rneui/themed';
import React, { useState } from 'react';

import { BORDER_RADIUS, styles } from '../../theme/styles';
import normalize from '../../utils/normalize';

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
          backgroundColor: theme.colors.cardBackground,
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
        size: normalize(22),
        color: theme.colors.grey2,
      }}
      clearIcon={{
        name: 'clear',
        type: 'material',
        size: normalize(22),
        color: theme.colors.grey2,
      }}
    />
  );
}

export default BaseSearchBar;
