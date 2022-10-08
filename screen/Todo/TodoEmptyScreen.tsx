import { Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Image, View } from 'react-native';

import noDataImageDark from '../../assets/images/no-data-image-dark.png';
import noDataImageLight from '../../assets/images/no-data-image-light.png';
import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import { ThemeModeContext } from '../../utils/context/ThemeModeContext';
import normalize from '../../utils/normalize';

function TodoEmptyScreen() {
  const { isDarkMode } = React.useContext(ThemeModeContext);
  const { theme } = useTheme();

  return (
    <View style={[appStyles.justifyCenter, appStyles.alignCenter, appStyles.flexGrow]}>
      <View
        style={[
          spacing.mb_xl,
          {
            aspectRatio: 1,
            width: 160,
          },
        ]}
      >
        <Image
          style={[appStyles.flex, appStyles.w100]}
          source={isDarkMode ? noDataImageDark : noDataImageLight}
        />
      </View>
      <Text h4 style={spacing.mb_sm}>
        Your list is empty
      </Text>
      <Text
        small
        style={{ marginBottom: normalize(96, 'height') }}
        color={theme.colors.grey3}
      >
        Tap &quot; + &quot; button to add new list
      </Text>
    </View>
  );
}

export default TodoEmptyScreen;
