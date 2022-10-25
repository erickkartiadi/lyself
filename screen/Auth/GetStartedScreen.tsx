import { Button, Icon, Text, useTheme } from '@rneui/themed';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import getStartedIllustration from '../../assets/images/get-started-illustration.png';
import GoogleSignInButton from '../../components/base/GoogleSignInButton';
import NavLink from '../../components/base/NavLink';
import { GetStartedScreenNavigationProps } from '../../navigation/navigation.types';
import layout from '../../styles/layout';
import { width } from '../../styles/size';
import spacing from '../../styles/spacing';
import { text } from '../../styles/typhography';
import { SIZING } from '../../theme/theme';
import useStyles from '../../utils/hooks/useStyles';

WebBrowser.maybeCompleteAuthSession();

function GetStartedScreen({ navigation }: GetStartedScreenNavigationProps) {
  const { theme } = useTheme();

  const styles = useStyles();

  return (
    <ScrollView style={layout.flex}>
      <SafeAreaView>
        <View
          style={[
            layout.section_lg,
            layout.flex,
            {
              minHeight: Dimensions.get('window').height,
            },
          ]}
        >
          <View style={[layout.flex, layout.justify_center]}>
            <View style={[layout.no_container_gutter, layout.ratio_fourThree]}>
              <Image source={getStartedIllustration} style={[layout.flex, width.w_100]} />
            </View>
            <View style={layout.container_gutter}>
              <Text style={[layout.section_lg, text.center]}>
                <Text h1>Start your mental health journey with</Text>
                <Text h1 h1Style={styles.textPrimary}>
                  {' '}
                  LYSelf
                </Text>
              </Text>
              <View style={[layout.section_lg, layout.flex, layout.justify_center]}>
                <Button
                  onPress={() => navigation.navigate('Login')}
                  buttonStyle={spacing.py_xl}
                  containerStyle={spacing.mb_xl}
                  titleStyle={[spacing.ml_xl, styles.textWhite]}
                >
                  <Icon
                    containerStyle={[
                      layout.position_absolute,
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
                <GoogleSignInButton />
              </View>
            </View>
            <View
              style={[
                layout.section_lg,
                layout.flex_dir_row,
                layout.align_center,
                layout.justify_center,
              ]}
            >
              <Text>Didn&apos;t have an account? </Text>
              <NavLink to={{ screen: 'Register' }} color="primary">
                Sign Up
              </NavLink>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default GetStartedScreen;
