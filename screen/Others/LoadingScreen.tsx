import LottieView from 'lottie-react-native';
import * as React from 'react';
import { View } from 'react-native';

import loadingAnimation from '../../assets/lottie/loading.json';

function LoadingScreen() {
  return (
    <View style={{ flex: 1 }}>
      <LottieView autoPlay source={loadingAnimation} style={{ marginBottom: 32 }} />
    </View>
  );
}

export default LoadingScreen;
