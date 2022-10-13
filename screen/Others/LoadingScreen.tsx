import LottieView from 'lottie-react-native';
import * as React from 'react';
import { View } from 'react-native';

import loadingAnimation from '../../assets/lottie/loading.json';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';

function LoadingScreen() {
  return (
    <View style={layout.flex}>
      <LottieView autoPlay source={loadingAnimation} style={spacing.mb_2xl} />
    </View>
  );
}

export default LoadingScreen;
