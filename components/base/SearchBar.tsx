import {
  Icon,
  SearchBar as RNESearchBar,
  SearchBarDefaultProps,
  useTheme,
} from '@rneui/themed';
import * as React from 'react';

import useStyles from '../../utils/hooks/useStyles';

function SearchBar({ ...props }: SearchBarDefaultProps) {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <RNESearchBar
      loadingProps={{
        color: theme.colors.primary,
      }}
      searchIcon={
        <Icon color={theme.colors.grey3} name="search-outline" type="ionicon" />
      }
      inputStyle={styles.textBlack}
      round
      {...props}
    />
  );
}

export default SearchBar;
