import { Badge, Icon, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';
import { View } from 'react-native';

import { PreferencesContext } from '../theme/PreferencesContext';
import ViewSeparator from './ViewSeparator';
import { comingSoonToast } from '../utils/comingSoonToast';

function RightHeaderComponent() {
  const { theme } = useTheme();
  const { theme: preferences, setPreferences } = useContext(PreferencesContext);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View>
        <Icon
          name={preferences === 'light' ? 'sunny-outline' : 'moon-outline'}
          type="ionicon"
          onPress={() =>
            setPreferences(preferences === 'light' ? 'dark' : 'light')
          }
          containerStyle={{ borderRadius: 100, aspectRatio: 1 }}
          color={theme.colors.black}
          underlayColor={theme.colors.primary}
        />
      </View>
      <ViewSeparator />
      <View>
        <Badge
          status="error"
          badgeStyle={{ borderColor: 'transparent' }}
          containerStyle={{ position: 'absolute', right: 3 }}
        />
        <Icon
          name="notifications-outline"
          type="ionicon"
          onPress={comingSoonToast}
          containerStyle={{ borderRadius: 100, aspectRatio: 1 }}
          color={theme.colors.black}
          underlayColor={theme.colors.primary}
        />
      </View>
    </View>
  );
}

export default RightHeaderComponent;
