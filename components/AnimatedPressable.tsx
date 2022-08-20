import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

function AnimatedPressable({ onPress, children, style }: PressableProps) {
  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
    opacity: opacityValue.value,
  }));

  const onPressInAnimation = () => {
    if (!onPress) return;
    scaleValue.value = withSpring(0.9);
    opacityValue.value = withSpring(0.9);
  };

  const onPressOutAnimation = () => {
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

export default AnimatedPressable;
