import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import LinkButton from '../atoms/LinkButton';

interface SectionTitleProps {
  title: string;
  showRightButton?: boolean;
  rightButtonComponent?: JSX.Element;
  screen?: string;
}

function SectionTitle({
  title,
  showRightButton,
  rightButtonComponent,
  screen,
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
        {showRightButton && !rightButtonComponent && (
          <LinkButton
            to={{
              screen: showRightButton && screen ? screen : 'InDevelopment',
            }}
            color="primary"
          >
            See More{' '}
          </LinkButton>
        )}
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
  screen: 'InDevelopment',
};

export default SectionTitle;
