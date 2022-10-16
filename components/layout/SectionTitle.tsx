import { Text, ThemeSpacing, useTheme } from '@rneui/themed';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import layout from '../../styles/layout';
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
        layout.flex,
        layout.flex_dir_row,
        layout.justify_between,
        layout.align_center,
        {
          marginBottom: theme.spacing[marginBottom],
        },
        containerStyle,
      ]}
    >
      <>
        <Text h4 style={layout.flex}>
          {title}
        </Text>
        {showRightComponent && !rightComponent ? (
          <NavLink
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
