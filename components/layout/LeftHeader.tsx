import { Text } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { View } from 'react-native';

import { AuthContext } from '../../utils/context/AuthContext';

function LeftHeader() {
  const { user } = useContext(AuthContext);
  const currentHour = dayjs().hour();
  let greeting = 'Hello,';

  if (currentHour >= 5 && currentHour <= 11) greeting = 'Good morning';
  else if (currentHour >= 12 && currentHour <= 16) greeting = 'Good afternoon';
  else greeting = 'Good evening';

  return (
    <View>
      <Text small>{greeting}</Text>
      <Text h4>{user?.displayName}</Text>
    </View>
  );
}

export default LeftHeader;
