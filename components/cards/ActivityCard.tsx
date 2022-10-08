import {
  Button,
  ButtonProps,
  Icon,
  IconProps,
  makeStyles,
  Text,
  useTheme,
} from '@rneui/themed';
import * as React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import normalize from '../../utils/normalize';
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

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: '30%',
    aspectRatio: 1,
  },
  buttonTitle: {
    color: theme.colors.white,
  },
}));

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
      <View style={[appStyles.flex, appStyles.flexDirRow, appStyles.alignCenter]}>
        <View style={[appStyles.flex]}>
          <View>
            <Text h4>{title}</Text>
            <Text small>{text}</Text>
          </View>
          <View style={[appStyles.flexDirRow, appStyles.alignCenter, spacing.mt_lg]}>
            <Button
              color={colorDark}
              onPress={onPress}
              uppercase
              titleStyle={styles.buttonTitle}
              buttonStyle={[appStyles.flexDirRow, appStyles.alignCenter, spacing.pr_lg]}
              size="sm"
            >
              <Icon
                name={iconName}
                type="ionicon"
                color={theme.colors.white}
                size={normalize(18)}
                containerStyle={spacing.mx_xs}
              />
              {buttonTitle}
            </Button>
          </View>
        </View>
        <View
          style={[styles.imageContainer, appStyles.alignCenter, appStyles.justifyCenter]}
        >
          <Image source={image} style={[appStyles.flex, appStyles.w100]} />
        </View>
      </View>
    </Card>
  );
}

export default ActivityCard;
