import { Text } from '@rneui/themed';
import * as React from 'react';
import { Image, View } from 'react-native';

import noDataImageDark from '../../assets/images/no-data-image-dark.png';
import noDataImageLight from '../../assets/images/no-data-image-light.png';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { ThemeModeContext } from '../../utils/context/ThemeModeContext';
import useStyles from '../../utils/hooks/useStyles';
import normalize from '../../utils/normalize';

function TodoEmptyScreen() {
  const { isDarkMode } = React.useContext(ThemeModeContext);
  const styles = useStyles();

  return (
    <View style={[layout.justifyCenter, layout.alignCenter, layout.flexGrow]}>
      <View
        style={[
          spacing.mb_xl,
          layout.aspectRatioSquare,
          {
            width: SIZING['10xl'],
          },
        ]}
      >
        <Image
          style={[layout.flex, layout.w100]}
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
