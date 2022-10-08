import LottieView from 'lottie-react-native';
import * as React from 'react';
import { View } from 'react-native';

import loadingAnimation from '../../assets/lottie/loading.json';
import appStyles from '../../theme/appStyles';
import normalize from '../../utils/normalize';

function LoadingScreen() {
  return (
    <View style={appStyles.flex}>
      <LottieView
        autoPlay
        source={loadingAnimation}
        style={{ marginBottom: normalize(32, 'height') }}
      />
    </View>
  );
}

export default LoadingScreen;
