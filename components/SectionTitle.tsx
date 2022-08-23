import { Icon, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { comingSoonToast } from '../utils/comingSoonToast';

interface SectionTitleProps {
  title: string;
  showRightButton?: boolean;
  rightButtonComponent?: JSX.Element;
}

function SeeMoreButton() {
  const { theme } = useTheme();

  const iconOffset = useSharedValue(48);
  const textOffset = useSharedValue(20);
  const iconOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(1);

  const iconAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: iconOffset.value }],
    opacity: iconOpacity.value,
  }));

  const textAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: textOffset.value }],
    opacity: textOpacity.value,
  }));

  const onPressInAnimation = () => {
    iconOffset.value = withSpring(4);
    textOffset.value = withSpring(6);
    textOpacity.value = 0.9;
    iconOpacity.value = 0.9;
  };

  const onPressOutAnimation = () => {
    iconOffset.value = withSpring(48);
    textOffset.value = withSpring(20);
    iconOpacity.value = 0;
    textOpacity.value = 1;
  };

  return (
    <Pressable
      onPressIn={onPressInAnimation}
      onPressOut={onPressOutAnimation}
      onPress={comingSoonToast}
    >
      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <Animated.View style={textAnimatedStyles}>
          <Text
            subtitle2
            bold
            style={{ color: theme.colors.primary, marginBottom: 0 }}
          >
            See More
          </Text>
        </Animated.View>
        <Animated.View style={iconAnimatedStyles}>
          <Icon
            color={theme.colors.primary}
            type="ionicon"
            name="chevron-forward-outline"
          />
        </Animated.View>
      </View>
    </Pressable>
  );
}

function SectionTitle({
  title,
  showRightButton,
  rightButtonComponent,
}: SectionTitleProps) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
      }}
    >
      <>
        <Text
          subtitle1
          bold
          h4Style={{ marginBottom: 0, textTransform: 'capitalize' }}
        >
          {title}
        </Text>
        {showRightButton && !rightButtonComponent && <SeeMoreButton />}
        {showRightButton && rightButtonComponent && (
          <View>{rightButtonComponent}</View>
        )}
      </>
    </View>
  );
}

SectionTitle.defaultProps = {
  showRightButton: false,
  rightButtonComponent: null,
};

export default SectionTitle;
