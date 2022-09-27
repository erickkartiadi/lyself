import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const widthBaseScale = SCREEN_WIDTH / 440;
const heightBaseScale = SCREEN_HEIGHT / 977;

export default function normalize(size: number, based: 'width' | 'height' = 'width') {
  const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
