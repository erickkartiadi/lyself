import { Text } from '@rneui/themed';
import * as React from 'react';
import { Image, View } from 'react-native';

import noDataImageDark from '../../assets/images/no-data-image-dark.png';
import noDataImageLight from '../../assets/images/no-data-image-light.png';
import layout from '../../styles/layout';
import { width } from '../../styles/size';
import spacing from '../../styles/spacing';
import { ThemeModeContext } from '../../utils/context/ThemeModeContext';
import useStyles from '../../utils/hooks/useStyles';
import normalize from '../../utils/normalize';

function TodoEmptyScreen() {
  const { isDarkMode } = React.useContext(ThemeModeContext);
  const styles = useStyles();

  return (
    <View style={[layout.justify_center, layout.align_center, layout.flex_grow]}>
      <View style={[spacing.mb_xl, layout.ratio_square, width.w_10xl]}>
        <Image
          style={[layout.flex, width.w_100]}
          source={isDarkMode ? noDataImageDark : noDataImageLight}
        />
      </View>
      <Text h4 style={spacing.mb_sm}>
        Your list is empty
      </Text>
      <Text small style={[styles.textGrey, { marginBottom: normalize(96, 'height') }]}>
        Tap &quot; + &quot; button to add new list
      </Text>
    </View>
  );
}

export default TodoEmptyScreen;
