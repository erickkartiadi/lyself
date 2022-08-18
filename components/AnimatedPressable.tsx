import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import * as Animatable from 'react-native-animatable';
import useToggle from '../utils/hooks/useToggle';

const AnimatablePressable = Animatable.createAnimatableComponent(Pressable);

function AnimatedPressable({ onPress, children, style }: PressableProps) {
  const pressableRef = React.useRef(null);
  const [isPressed, toggleIsPressed] = useToggle(false);

  const handleAnimation = () => {
    if (!onPress) return;
    toggleIsPressed();

    if (pressableRef) {
      pressableRef.current?.animate({
        0: {
          transform: [{ scale: isPressed ? 0.925 : 1 }],
          opacity: isPressed ? 0.85 : 1,
        },
        1: {
          transform: [{ scale: isPressed ? 1 : 0.925 }],
          opacity: isPressed ? 1 : 0.85,
        },
      });
    }
  };

  return (
    <AnimatablePressable
      style={style}
      duration={100}
      easing="ease-in-out"
      ref={pressableRef}
      onPressIn={handleAnimation}
      onPressOut={handleAnimation}
      onPress={onPress}
    >
      {children}
    </AnimatablePressable>
  );
}

export default AnimatedPressable;
