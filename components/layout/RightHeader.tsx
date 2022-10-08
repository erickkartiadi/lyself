import { Badge, Icon, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';
import { View } from 'react-native';

import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import { BORDER_RADIUS } from '../../theme/theme';
import { ThemeModeContext } from '../../utils/context/ThemeModeContext';
import { comingSoonToast } from '../../utils/toast';

function RightHeader() {
  const { theme } = useTheme();
  const { isDarkMode, setThemeMode } = useContext(ThemeModeContext);

  const toggleThemeMode = () => {
    setThemeMode(isDarkMode ? 'light' : 'dark');
  };

  return (
    <View style={[appStyles.flexDirRow, appStyles.alignCenter]}>
      <View>
        <Icon
          name={isDarkMode ? 'moon-outline' : 'sunny-outline'}
          type="ionicon"
          onPress={toggleThemeMode}
          containerStyle={[
            spacing.mr_lg,
            {
              borderRadius: BORDER_RADIUS.rounded,
              aspectRatio: 1,
            },
          ]}
          color={theme.colors.black}
          underlayColor={theme.colors.primary}
        />
      </View>
      <View>
        <Badge
          status="error"
          badgeStyle={{ borderColor: 'transparent' }}
          containerStyle={{ position: 'absolute', right: theme.spacing.sm }}
        />
        <Icon
          name="notifications-outline"
          type="ionicon"
          onPress={comingSoonToast}
          containerStyle={{
            borderRadius: BORDER_RADIUS.rounded,
            aspectRatio: 1,
          }}
          color={theme.colors.black}
          underlayColor={theme.colors.primary}
        />
      </View>
    </View>
  );
}

export default RightHeader;
