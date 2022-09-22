import { Text } from '@rneui/themed';
import dayjs from 'dayjs';
import React from 'react';
import { View } from 'react-native';

import { user } from '../utils/constant/seed';

function LeftHeader() {
  const currentHour = dayjs().hour();
  const { name } = user;
  let greeting = 'Howdy';

  if (currentHour >= 5 && currentHour <= 11) greeting = 'Good morning';
  else if (currentHour >= 12 && currentHour <= 16) greeting = 'Good afternoon';
  else greeting = 'Good night';

  return (
    <View>
      <Text caption>{greeting}</Text>
      <Text h4>{name}</Text>
    </View>
  );
}

export default LeftHeader;
