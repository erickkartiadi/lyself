import { Text, ThemeSpacing, useTheme } from '@rneui/themed';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import NavLink from '../base/NavLink';

interface SectionTitleProps {
  title: string;
  screen?: string;
  showRightComponent?: boolean;
  rightComponent?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  marginBottom?: keyof ThemeSpacing;
}

function SectionTitle({
  title,
  showRightComponent,
  rightComponent,
  screen = 'InDevelopment',
  containerStyle,
  marginBottom = 'xl',
}: SectionTitleProps) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing[marginBottom],
        },
        containerStyle,
      ]}
    >
      <>
        <Text h4 style={{ flex: 1 }}>
          {title}
        </Text>
        {showRightComponent && !rightComponent ? (
          <NavLink
            style={{ flexShrink: 1, alignItems: 'flex-end' }}
            to={{
              screen: showRightComponent && screen && screen,
            }}
            color="primary"
          >
            See All
          </NavLink>
        ) : (
          rightComponent && rightComponent
        )}
      </>
    </View>
  );
}

SectionTitle.defaultProps = {
  showRightComponent: false,
  rightComponent: null,
  marginBottom: 'xl',
  screen: 'InDevelopment',
  containerStyle: {},
};

export default SectionTitle;
