import * as React from 'react';
import { View } from 'react-native';

import spacing from '../../styles/spacing';

function HorizontalSeparator() {
  return <View style={spacing.mx_md} />;
}

function VerticalSeparator() {
  return <View style={spacing.my_md} />;
}

export { HorizontalSeparator, VerticalSeparator };
