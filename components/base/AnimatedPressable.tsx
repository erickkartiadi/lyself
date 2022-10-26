import React from 'react';
import { Pressable, PressableProps, ViewProps } from 'react-native';
import Animated, {
  AnimateProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export interface AnimatedPressableProps extends PressableProps {
  containerStyle?: AnimateProps<ViewProps>['style'];
}

function AnimatedPressable({
  onPress,
  containerStyle,
  children,
  ...props
}: AnimatedPressableProps) {
  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);

  const pressableStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
    opacity: opacityValue.value,
  }));

  const onPressInAnimation = () => {
    if (!onPress) return;
    scaleValue.value = withSpring(0.95);
    opacityValue.value = withSpring(0.9);
  };

  const onPressOutAnimation = () => {
    if (!onPress) return;
    scaleValue.value = withSpring(1);
    opacityValue.value = withSpring(1);
  };

  return (
    <Animated.View style={[pressableStyle, containerStyle]}>
      <Pressable
        onPressIn={onPressInAnimation}
        onPressOut={onPressOutAnimation}
        onPress={onPress}
        {...props}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

AnimatedPressable.defaultProps = {
  containerStyle: {},
};

export default AnimatedPressable;
