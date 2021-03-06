import { Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import dayjs from 'dayjs';

function LeftHeaderComponent() {
  const currentHour = dayjs().hour();
  let greeting = 'Howdy';

  if (currentHour >= 5 && currentHour <= 11) greeting = 'Good morning';
  else if (currentHour >= 12 && currentHour <= 16) greeting = 'Good afternoon';
  else greeting = 'Good night';

  return (
    <View>
      <Text>{greeting}</Text>
      <Text h1>Erick Kartiadi</Text>
    </View>
  );
}

export default LeftHeaderComponent;
