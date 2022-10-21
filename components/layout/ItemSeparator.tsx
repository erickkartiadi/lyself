import * as React from 'react';
import { View } from 'react-native';

import spacing from '../../styles/spacing';

function HorizontalSeparator() {
  return <View style={spacing.mx_md} />;
}

function VerticalSeparator() {
  return <View style={spacing.my_md} />;
}

function VerticalSeparatorSmall() {
  return <View style={spacing.my_xs} />;
}

export { HorizontalSeparator, VerticalSeparator, VerticalSeparatorSmall };
