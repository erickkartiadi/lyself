import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export interface AnimatedPressableProps
  extends React.PropsWithChildren<Pick<PressableProps, 'onPress' | 'style'>> {
  enablePressAnimation?: boolean;
}

function AnimatedPressable({
  onPress,
  children,
  style,
  enablePressAnimation = true,
}: AnimatedPressableProps) {
  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
    opacity: opacityValue.value,
  }));

  const onPressInAnimation = () => {
    if (!enablePressAnimation) return;
    if (!onPress) return;
    scaleValue.value = withSpring(0.95);
    opacityValue.value = withSpring(0.9);
  };

  const onPressOutAnimation = () => {
    if (!enablePressAnimation) return;
    if (!onPress) return;
    scaleValue.value = withSpring(1);
    opacityValue.value = withSpring(1);
  };

  return (
    <Pressable
      style={style}
      onPressIn={onPressInAnimation}
      onPressOut={onPressOutAnimation}
      onPress={onPress}
    >
      <Animated.View style={[animatedStyles]}>{children}</Animated.View>
    </Pressable>
  );
}

AnimatedPressable.defaultProps = {
  enablePressAnimation: true,
};

export default AnimatedPressable;
