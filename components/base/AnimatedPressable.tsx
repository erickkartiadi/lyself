import React from 'react';
import { Pressable, PressableProps, ViewProps } from 'react-native';
import Animated, {
  AnimateProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export interface AnimatedPressableProps extends AnimateProps<ViewProps> {
  onPress?: PressableProps['onPress'];
  enablePressAnimation?: boolean;
  children?: React.ReactNode;
}

function AnimatedPressable({
  onPress,
  style,
  children,
  enablePressAnimation = true,
  ...props
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
    <Animated.View style={[animatedStyles, style]} {...props}>
      <Pressable
        onPressIn={onPressInAnimation}
        onPressOut={onPressOutAnimation}
        onPress={onPress}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

AnimatedPressable.defaultProps = {
  enablePressAnimation: true,
  onPress: null,
  children: undefined,
};

export default AnimatedPressable;
