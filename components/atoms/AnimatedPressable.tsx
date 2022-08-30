import React, { ReactNode } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface AnimatedPressableProps {
  onPress: PressableProps['onPress'];
  style?: PressableProps['style'];
  children: ReactNode;
  disablePressAnimation?: boolean;
}

function AnimatedPressable({
  onPress,
  children,
  style,
  disablePressAnimation = false,
}: AnimatedPressableProps) {
  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
    opacity: opacityValue.value,
  }));

  const onPressInAnimation = () => {
    if (disablePressAnimation) return;
    if (!onPress) return;
    scaleValue.value = withSpring(0.95);
    opacityValue.value = withSpring(0.9);
  };

  const onPressOutAnimation = () => {
    if (disablePressAnimation) return;
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
  style: null,
  disablePressAnimation: false,
};

export default AnimatedPressable;
