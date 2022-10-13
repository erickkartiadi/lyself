import { Button, ButtonProps, Icon, IconProps, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import useStyles from '../../utils/hooks/useStyles';
import Card from '../base/Card';

interface ActivityCardProps {
  title: string;
  text: string;
  colorLight: string;
  colorDark: string;
  image: ImageSourcePropType;
  onPress: ButtonProps['onPress'];
  iconName: IconProps['name'];
  buttonTitle: string;
}

function ActivityCard({
  colorDark,
  onPress,
  colorLight,
  image,
  text,
  title,
  buttonTitle,
  iconName,
}: ActivityCardProps) {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <Card cardStyle={{ backgroundColor: colorLight }}>
      <View style={[layout.flex, layout.flexDirRow, layout.alignCenter]}>
        <View style={[layout.flex]}>
          <View>
            <Text h4>{title}</Text>
            <Text small>{text}</Text>
          </View>
          <View style={[layout.flexDirRow, layout.alignCenter, spacing.mt_lg]}>
            <Button
              color={colorDark}
              onPress={onPress}
              uppercase
              titleStyle={styles.textWhite}
              buttonStyle={[layout.flexDirRow, layout.alignCenter, spacing.pr_lg]}
              size="sm"
            >
              <Icon
                name={iconName}
                type="ionicon"
                color={theme.colors.white}
                size={SIZING['2xl']}
                containerStyle={spacing.mx_xs}
              />
              {buttonTitle}
            </Button>
          </View>
        </View>
        <View
          style={[
            layout.alignCenter,
            layout.justifyCenter,
            layout.w25,
            layout.aspectRatioSquare,
          ]}
        >
          <Image source={image} style={[layout.flex, layout.w100]} />
        </View>
      </View>
    </Card>
  );
}

export default ActivityCard;
