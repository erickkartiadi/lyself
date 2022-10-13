import { Button, Icon, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import getStartedIllustration from '../../assets/images/get-started-illustration.png';
import NavLink from '../../components/base/NavLink';
import { GetStartedScreenNavigationProps } from '../../navigation/navigation.types';
import layout from '../../styles/layout';
import { width } from '../../styles/size';
import spacing from '../../styles/spacing';
import { text } from '../../styles/typhography';
import { SIZING } from '../../theme/theme';
import useStyles from '../../utils/hooks/useStyles';

function GetStartedScreen({ navigation }: GetStartedScreenNavigationProps) {
  const { theme } = useTheme();

  const styles = useStyles();

  return (
    <ScrollView style={layout.flex}>
      <SafeAreaView>
        <View
          style={[
            layout.sectionLarge,
            layout.flex,
            {
              minHeight: Dimensions.get('window').height,
            },
          ]}
        >
          <View style={[layout.noContainerGutter, layout.aspectRatioFourThree]}>
            <Image source={getStartedIllustration} style={[layout.flex, width.w_100]} />
          </View>
          <View style={[layout.container]}>
            <Text style={[layout.sectionLarge, text.center]}>
              <Text h1>Start your mental health journey with</Text>
              <Text h1 h1Style={styles.textPrimary}>
                {' '}
                Lyself
              </Text>
            </Text>
            <View style={[layout.sectionLarge, layout.flex, layout.justifyCenter]}>
              <Button
                onPress={() => navigation.navigate('Login')}
                buttonStyle={spacing.py_xl}
                containerStyle={spacing.mb_xl}
                titleStyle={[spacing.ml_xl, styles.textWhite]}
              >
                <Icon
                  containerStyle={[
                    layout.positionAbsolute,
                    {
                      left: SIZING['4xl'],
                    },
                  ]}
                  type="ionicon"
                  name="mail"
                  color={theme.colors.white}
                />
                CONTINUE WITH EMAIL
              </Button>
              <Button
                type="outline"
                buttonStyle={[spacing.py_xl, styles.borderGrey3]}
                containerStyle={spacing.mb_xl}
                titleStyle={[spacing.ml_xl, styles.textBlack]}
              >
                <Icon
                  containerStyle={[
                    layout.positionAbsolute,
                    {
                      left: SIZING['4xl'],
                    },
                  ]}
                  type="ionicon"
                  name="logo-apple"
                  color={theme.colors.apple}
                />
                CONTINUE WITH APPLE
              </Button>
              <Button
                type="outline"
                buttonStyle={[spacing.py_xl, styles.borderGrey3]}
                containerStyle={spacing.mb_xl}
                titleStyle={[spacing.ml_xl, styles.textBlack]}
              >
                <Icon
                  containerStyle={[
                    layout.positionAbsolute,
                    {
                      left: SIZING['4xl'],
                    },
                  ]}
                  type="ionicon"
                  name="logo-google"
                  color={theme.colors.google}
                />
                CONTINUE WITH GOOGLE
              </Button>

              <Button
                type="outline"
                buttonStyle={[spacing.py_xl, styles.borderGrey3]}
                containerStyle={spacing.mb_xl}
                titleStyle={[spacing.ml_xl, styles.textBlack]}
              >
                <Icon
                  containerStyle={[
                    layout.positionAbsolute,
                    {
                      left: SIZING['4xl'],
                    },
                  ]}
                  type="ionicon"
                  name="logo-facebook"
                  color={theme.colors.facebook}
                />
                CONTINUE WITH FACEBOOK
              </Button>
            </View>
          </View>
          <View
            style={[
              layout.sectionLarge,
              layout.flexDirRow,
              layout.alignCenter,
              layout.justifyCenter,
            ]}
          >
            <Text>Didn&apos;t have an account? </Text>
            <NavLink to={{ screen: 'Register' }} color="primary">
              Sign Up
            </NavLink>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default GetStartedScreen;
