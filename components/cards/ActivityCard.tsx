import { Button, ButtonProps, Icon, IconProps, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

import layout from '../../styles/layout';
import { width } from '../../styles/size';
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
    <Card cardStyle={{ backgroundColor: colorDark }}>
      <View style={[layout.flex, layout.flex_dir_row, layout.align_center]}>
        <View style={[layout.flex]}>
          <View>
            <Text h3 h3Style={styles.textWhite}>
              {title}
            </Text>
            <Text style={styles.textWhite}>{text}</Text>
          </View>
          <View style={[layout.flex_dir_row, layout.align_center, spacing.mt_lg]}>
            <Button
              color={colorLight}
              onPress={onPress}
              uppercase
              titleStyle={styles.textWhite}
              buttonStyle={[layout.flex_dir_row, layout.align_center, spacing.pr_lg]}
              size="md"
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
            layout.align_center,
            layout.justify_center,
            layout.ratio_square,
            width.w_10xl,
          ]}
        >
          <Image source={image} style={[layout.flex, width.w_100]} />
        </View>
      </View>
    </Card>
  );
}

export default ActivityCard;
