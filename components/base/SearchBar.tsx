import {
  SearchBar as RNESearchBar,
  SearchBarProps as RNESearchBarProps,
  useTheme,
} from '@rneui/themed';
import React, { useState } from 'react';

import spacing from '../../theme/spacing';
import { BORDER_RADIUS } from '../../theme/theme';
import normalize from '../../utils/normalize';

interface SearchBarProps {
  placeholder: RNESearchBarProps['placeholder'];
}

function SearchBar({ placeholder }: SearchBarProps) {
  const [searchText, setSearchText] = useState('');
  const { theme } = useTheme();

  const updateSearch = (text: string) => {
    setSearchText(text);
  };

  return (
    <RNESearchBar
      selectionColor={theme.colors.primary}
      placeholder={placeholder}
      onChangeText={updateSearch}
      containerStyle={[
        spacing.mb_xl,
        {
          paddingHorizontal: 0,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderWidth: 0,
          elevation: 0,
        },
      ]}
      inputContainerStyle={[
        spacing.px_md,
        {
          backgroundColor: theme.colors.searchBg,
          borderRadius: BORDER_RADIUS.rounded,
        },
      ]}
      inputStyle={{
        color: theme.colors.black,
      }}
      value={searchText}
      searchIcon={{
        name: 'search-outline',
        type: 'ionicon',
        size: normalize(24),
        color: theme.colors.grey3,
      }}
      clearIcon={{
        name: 'close-outline',
        type: 'ionicon',
        size: normalize(24),
        color: theme.colors.grey3,
        containerStyle: { borderRadius: BORDER_RADIUS.rounded },
      }}
    />
  );
}

export default SearchBar;
